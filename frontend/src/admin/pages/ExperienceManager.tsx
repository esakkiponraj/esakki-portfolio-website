import GenericResourceManager from '../components/GenericResourceManager';

export default function ExperienceManager() {
  return (
    <GenericResourceManager
      resource="experience"
      title="Experience"
      columns={[
        { key: 'role', label: 'Role' },
        { key: 'company', label: 'Company' },
        { key: 'duration', label: 'Duration' },
      ]}
      fields={[
        { name: 'role', label: 'Role', type: 'text', required: true },
        { name: 'company', label: 'Company', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'duration', label: 'Duration', type: 'text', required: true },
        { name: 'responsibilities', label: 'Responsibilities', type: 'lines', placeholder: 'One responsibility per line' },
      ]}
    />
  );
}
