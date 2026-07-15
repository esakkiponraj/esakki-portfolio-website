import GenericResourceManager from '../components/GenericResourceManager';

export default function ProjectsManager() {
  return (
    <GenericResourceManager
      resource="projects"
      title="Projects"
      description="Manage the projects shown on your portfolio."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category', render: (item) => item.category?.join(', ') || '—' },
      ]}
      fields={[
        { name: 'name', label: 'Project Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'imageUrl', label: 'Project Image', type: 'image' },
        { name: 'technologies', label: 'Technologies', type: 'lines', placeholder: 'React.js\nNode.js\nMongoDB' },
        { name: 'features', label: 'Key Features', type: 'lines', placeholder: 'Real-time validation\nAdmin dashboard' },
        { name: 'githubLink', label: 'GitHub Link', type: 'text' },
        { name: 'liveLink', label: 'Live Demo Link', type: 'text' },
        { name: 'category', label: 'Category', type: 'multiselect', options: ['frontend', 'backend', 'fullstack', 'featured'] },
      ]}
    />
  );
}
