import GenericResourceManager from '../components/GenericResourceManager';

export default function AchievementsManager() {
  return (
    <GenericResourceManager
      resource="achievements"
      title="Achievements"
      columns={[{ key: 'title', label: 'Title' }]}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
}
