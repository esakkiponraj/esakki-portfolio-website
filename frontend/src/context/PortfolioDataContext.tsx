import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
  fetchProfile, fetchContactInfo, fetchProjects, fetchSkills,
  fetchEducation, fetchExperience, fetchAchievements, fetchCertificates, fetchSocialLinks,
} from '../services/publicApi';
import { resolveMediaUrl } from '../services/api';
import {
  personalInfo as staticPersonalInfo,
  stats as staticStats,
  education as staticEducation,
  experience as staticExperience,
  projects as staticProjects,
  skillCategories as staticSkillCategories,
  certificates as staticCertificates,
  achievements as staticAchievements,
  ProjectCategory,
} from '../data/profile';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Cloud', 'Languages'];

interface PortfolioData {
  personalInfo: typeof staticPersonalInfo;
  stats: typeof staticStats;
  education: typeof staticEducation;
  experience: typeof staticExperience;
  projects: typeof staticProjects;
  skillCategories: typeof staticSkillCategories;
  certificates: (typeof staticCertificates[number] & { fileUrl?: string })[];
  achievements: typeof staticAchievements;
  loading: boolean;
  isLive: boolean; // true once at least the profile loaded from the backend
  refetch: () => void;
}

const PortfolioDataContext = createContext<PortfolioData | undefined>(undefined);

function groupSkills(flatSkills: any[]): typeof staticSkillCategories {
  const byCategory: Record<string, { name: string; level: number }[]> = {};
  for (const s of flatSkills) {
    if (!byCategory[s.category]) byCategory[s.category] = [];
    byCategory[s.category].push({ name: s.name, level: s.level });
  }
  return CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => ({
    category: cat,
    skills: byCategory[cat],
  }));
}

const CACHE_KEY = 'portfolio_cms_cache_v2';

function readCache(): any {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const cached = readCache();
  const [personalInfo, setPersonalInfo] = useState(cached?.personalInfo || staticPersonalInfo);
  const [stats, setStats] = useState(cached?.stats || staticStats);
  const [education, setEducation] = useState(cached?.education || staticEducation);
  const [experience, setExperience] = useState(cached?.experience || staticExperience);
  const [projects, setProjects] = useState(cached?.projects || staticProjects);
  const [skillCategories, setSkillCategories] = useState(cached?.skillCategories || staticSkillCategories);
  const [certificates, setCertificates] = useState<(typeof staticCertificates[number] & { fileUrl?: string })[]>(cached?.certificates || staticCertificates);
  const [achievements, setAchievements] = useState(cached?.achievements || staticAchievements);
  const [loading, setLoading] = useState(!cached);
  const [isLive, setIsLive] = useState(!!cached?.isLive);

  const loadAll = useCallback(async () => {

    // Fired together so every request starts immediately, but awaited in two
    // groups: the profile-critical group (drives the hero photo/name/etc.)
    // is applied the moment it resolves, instead of being held back until
    // every other CMS collection below also finishes loading.
    const profileGroup = Promise.allSettled([fetchProfile(), fetchContactInfo(), fetchSocialLinks()]);
    const restGroup = Promise.allSettled([
      fetchProjects(), fetchSkills(), fetchEducation(), fetchExperience(), fetchAchievements(), fetchCertificates(),
    ]);

    const [profileRes, contactInfoRes, socialLinksRes] = await profileGroup;

    // Social links (needed to build personalInfo.socials below)
    let socials = staticPersonalInfo.socials;
    if (socialLinksRes.status === 'fulfilled' && socialLinksRes.value.length > 0) {
      const links = socialLinksRes.value;
      const find = (platform: string) => links.find((l: any) => l.platform === platform)?.url;
      socials = {
        github: find('github') || '',
        linkedin: find('linkedin') || '',
        email: find('email') || '',
      };
    }

    // Profile + Contact Info together drive personalInfo
    if (profileRes.status === 'fulfilled') {
      const p = profileRes.value;
      const contact = contactInfoRes.status === 'fulfilled' ? contactInfoRes.value : null;
      setPersonalInfo({
        name: p.name || staticPersonalInfo.name,
        title: p.title || staticPersonalInfo.title,
        taglines: p.taglines?.length ? p.taglines : staticPersonalInfo.taglines,
        summary: p.summary || staticPersonalInfo.summary,
        email: contact?.email || p.email || staticPersonalInfo.email,
        phone: contact?.phone || p.phone || staticPersonalInfo.phone,
        location: contact?.address || p.location || staticPersonalInfo.location,
        status: p.status || staticPersonalInfo.status,
        photo: resolveMediaUrl(p.photoUrl) || staticPersonalInfo.photo,
        resumeUrl: p.resumeUrl || staticPersonalInfo.resumeUrl,
        socials,
      });
      setIsLive(true);
    } else if (contactInfoRes.status === 'fulfilled') {
      // Backend reachable but no profile yet — still apply contact info + social links
      const contact = contactInfoRes.value;
      setPersonalInfo({
        ...staticPersonalInfo,
        email: contact.email || staticPersonalInfo.email,
        phone: contact.phone || staticPersonalInfo.phone,
        location: contact.address || staticPersonalInfo.location,
        socials,
      });
    }

    const [
      projectsRes, skillsRes, educationRes, experienceRes, achievementsRes, certificatesRes,
    ] = await restGroup;

    if (projectsRes.status === 'fulfilled' && projectsRes.value.length > 0) {
      setProjects(
        projectsRes.value.map((p: any) => ({
          name: p.name,
          description: p.description,
          technologies: p.technologies || [],
          features: p.features || [],
          image: resolveMediaUrl(p.imageUrl),
          link: p.liveLink || undefined,
          githubLink: p.githubLink || undefined,
          category: (p.category?.length ? p.category : ['fullstack']) as ProjectCategory[],
        }))
      );
    }

    if (skillsRes.status === 'fulfilled' && skillsRes.value.length > 0) {
      setSkillCategories(groupSkills(skillsRes.value));
    }

    if (educationRes.status === 'fulfilled' && educationRes.value.length > 0) {
      setEducation(educationRes.value);
    }

    if (experienceRes.status === 'fulfilled' && experienceRes.value.length > 0) {
      setExperience(experienceRes.value);
    }

    if (achievementsRes.status === 'fulfilled' && achievementsRes.value.length > 0) {
      setAchievements(achievementsRes.value);
    }

    if (certificatesRes.status === 'fulfilled' && certificatesRes.value.length > 0) {
      setCertificates(certificatesRes.value);
    }

    const finalStats = [
      {
        label: 'Internships Completed',
        value: experienceRes.status === 'fulfilled' && experienceRes.value.length > 0 ? experienceRes.value.length : staticStats[0].value,
        suffix: '',
      },
      {
        label: 'Live Projects',
        value: projectsRes.status === 'fulfilled' && projectsRes.value.length > 0 ? projectsRes.value.length : staticStats[1].value,
        suffix: '+',
      },
      {
        label: 'Certifications',
        value: certificatesRes.status === 'fulfilled' && certificatesRes.value.length > 0 ? certificatesRes.value.length : staticStats[2].value,
        suffix: '',
      },
      staticStats[3], // "Years Coding" isn't derivable from CMS content — left as-is
    ];
    setStats(finalStats);

    setLoading(false);

    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          personalInfo: profileRes.status === 'fulfilled' ? {
            name: profileRes.value.name || staticPersonalInfo.name,
            title: profileRes.value.title || staticPersonalInfo.title,
            taglines: profileRes.value.taglines?.length ? profileRes.value.taglines : staticPersonalInfo.taglines,
            summary: profileRes.value.summary || staticPersonalInfo.summary,
            email: (contactInfoRes.status === 'fulfilled' ? contactInfoRes.value.email : null) || profileRes.value.email || staticPersonalInfo.email,
            phone: (contactInfoRes.status === 'fulfilled' ? contactInfoRes.value.phone : null) || profileRes.value.phone || staticPersonalInfo.phone,
            location: (contactInfoRes.status === 'fulfilled' ? contactInfoRes.value.address : null) || profileRes.value.location || staticPersonalInfo.location,
            status: profileRes.value.status || staticPersonalInfo.status,
            photo: resolveMediaUrl(profileRes.value.photoUrl) || staticPersonalInfo.photo,
            resumeUrl: profileRes.value.resumeUrl || staticPersonalInfo.resumeUrl,
            socials,
          } : staticPersonalInfo,
          stats: finalStats,
          education: educationRes.status === 'fulfilled' && educationRes.value.length > 0 ? educationRes.value : staticEducation,
          experience: experienceRes.status === 'fulfilled' && experienceRes.value.length > 0 ? experienceRes.value : staticExperience,
          projects: projectsRes.status === 'fulfilled' && projectsRes.value.length > 0
            ? projectsRes.value.map((p: any) => ({
                name: p.name,
                description: p.description,
                technologies: p.technologies || [],
                features: p.features || [],
                image: resolveMediaUrl(p.imageUrl),
                link: p.liveLink || undefined,
                githubLink: p.githubLink || undefined,
                category: (p.category?.length ? p.category : ['fullstack']) as ProjectCategory[],
              }))
            : staticProjects,
          skillCategories: skillsRes.status === 'fulfilled' && skillsRes.value.length > 0 ? groupSkills(skillsRes.value) : staticSkillCategories,
          certificates: certificatesRes.status === 'fulfilled' && certificatesRes.value.length > 0 ? certificatesRes.value : staticCertificates,
          achievements: achievementsRes.status === 'fulfilled' && achievementsRes.value.length > 0 ? achievementsRes.value : staticAchievements,
          isLive: true,
        })
      );
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    loadAll();

    const handleCmsUpdate = () => {
      loadAll();
    };
    window.addEventListener('cms_content_updated', handleCmsUpdate);
    window.addEventListener('storage', handleCmsUpdate);
    return () => {
      window.removeEventListener('cms_content_updated', handleCmsUpdate);
      window.removeEventListener('storage', handleCmsUpdate);
    };
  }, [loadAll]);

  return (
    <PortfolioDataContext.Provider
      value={{
        personalInfo, stats, education, experience, projects,
        skillCategories, certificates, achievements, loading, isLive, refetch: loadAll,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error('usePortfolioData must be used within PortfolioDataProvider');
  return ctx;
}
