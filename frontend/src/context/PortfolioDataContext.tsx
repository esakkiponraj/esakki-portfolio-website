import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
  fetchProfile, fetchContactInfo, fetchProjects, fetchSkills,
  fetchEducation, fetchExperience, fetchAchievements, fetchCertificates, fetchSocialLinks,
} from '../services/publicApi';
<<<<<<< HEAD
import { resolveMediaUrl } from '../services/api';
=======
<<<<<<< HEAD
import { resolveMediaUrl } from '../services/api';
=======
>>>>>>> b88448106517b65e870144745704448afacf9667
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
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

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState(staticPersonalInfo);
  const [stats, setStats] = useState(staticStats);
  const [education, setEducation] = useState(staticEducation);
  const [experience, setExperience] = useState(staticExperience);
  const [projects, setProjects] = useState(staticProjects);
  const [skillCategories, setSkillCategories] = useState(staticSkillCategories);
  const [certificates, setCertificates] = useState<(typeof staticCertificates[number] & { fileUrl?: string })[]>(staticCertificates);
  const [achievements, setAchievements] = useState(staticAchievements);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
    // Fired together so every request starts immediately, but awaited in two
    // groups: the profile-critical group (drives the hero photo/name/etc.)
    // is applied the moment it resolves, instead of being held back until
    // every other CMS collection below also finishes loading.
    const profileGroup = Promise.allSettled([fetchProfile(), fetchContactInfo(), fetchSocialLinks()]);
    const restGroup = Promise.allSettled([
      fetchProjects(), fetchSkills(), fetchEducation(), fetchExperience(), fetchAchievements(), fetchCertificates(),
<<<<<<< HEAD
    ]);

    const [profileRes, contactInfoRes, socialLinksRes] = await profileGroup;

=======
    ]);

    const [profileRes, contactInfoRes, socialLinksRes] = await profileGroup;

=======
    const [
      profileRes, contactInfoRes, projectsRes, skillsRes,
      educationRes, experienceRes, achievementsRes, certificatesRes, socialLinksRes,
    ] = await Promise.allSettled([
      fetchProfile(), fetchContactInfo(), fetchProjects(), fetchSkills(),
      fetchEducation(), fetchExperience(), fetchAchievements(), fetchCertificates(), fetchSocialLinks(),
    ]);

>>>>>>> b88448106517b65e870144745704448afacf9667
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
    // Social links (needed to build personalInfo.socials below)
    let socials = staticPersonalInfo.socials;
    if (socialLinksRes.status === 'fulfilled' && socialLinksRes.value.length > 0) {
      const links = socialLinksRes.value;
      const find = (platform: string) => links.find((l: any) => l.platform === platform)?.url;
      socials = {
        github: find('github') || staticPersonalInfo.socials.github,
        linkedin: find('linkedin') || staticPersonalInfo.socials.linkedin,
        email: find('email') || staticPersonalInfo.socials.email,
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
<<<<<<< HEAD
        photo: resolveMediaUrl(p.photoUrl) || staticPersonalInfo.photo,
=======
<<<<<<< HEAD
        photo: resolveMediaUrl(p.photoUrl) || staticPersonalInfo.photo,
=======
        photo: p.photoUrl || staticPersonalInfo.photo,
>>>>>>> b88448106517b65e870144745704448afacf9667
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
    const [
      projectsRes, skillsRes, educationRes, experienceRes, achievementsRes, certificatesRes,
    ] = await restGroup;

<<<<<<< HEAD
=======
=======
>>>>>>> b88448106517b65e870144745704448afacf9667
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
    if (projectsRes.status === 'fulfilled' && projectsRes.value.length > 0) {
      setProjects(
        projectsRes.value.map((p: any) => ({
          name: p.name,
          description: p.description,
          technologies: p.technologies || [],
          features: p.features || [],
<<<<<<< HEAD
          image: resolveMediaUrl(p.imageUrl),
          link: p.liveLink || undefined,
          githubLink: p.githubLink || undefined,
=======
<<<<<<< HEAD
          image: resolveMediaUrl(p.imageUrl),
          link: p.liveLink || undefined,
          githubLink: p.githubLink || undefined,
=======
          link: p.liveLink || undefined,
>>>>>>> b88448106517b65e870144745704448afacf9667
>>>>>>> d465a6a159ba0fe478be52a34138d893b4e6d2cc
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

    // Stats derived from live counts where available, falling back per-field otherwise
    setStats([
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
    ]);

    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
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
