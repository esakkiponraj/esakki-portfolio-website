import GenericResourceManager from '../components/GenericResourceManager';

export default function SocialLinksManager() {
  return (
    <GenericResourceManager
      resource="social-links"
      title="Social Links"
      description="GitHub, LinkedIn, email — shown in the navbar, footer, and Hire Me modal."
      columns={[
        { key: 'platform', label: 'Platform' },
        { key: 'url', label: 'URL' },
      ]}
      fields={[
        { name: 'platform', label: 'Platform', type: 'select', required: true, options: ['github', 'linkedin', 'email', 'portfolio', 'twitter', 'other'] },
        { name: 'url', label: 'URL', type: 'text', required: true, placeholder: 'https://github.com/yourusername' },
      ]}
    />
  );
}
