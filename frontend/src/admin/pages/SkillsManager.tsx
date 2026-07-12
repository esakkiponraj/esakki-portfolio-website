import GenericResourceManager from '../components/GenericResourceManager';

export default function SkillsManager() {
  return (
    <GenericResourceManager
      resource="skills"
      title="Skills"
      description="Manage your skill list and proficiency levels."
      columns={[
        { key: 'name', label: 'Skill' },
        { key: 'category', label: 'Category' },
        { key: 'level', label: 'Level', render: (item) => `${item.level}%` },
      ]}
      fields={[
        { name: 'name', label: 'Skill Name', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'select', required: true, options: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Cloud', 'Languages'] },
        { name: 'level', label: 'Proficiency (0-100)', type: 'number', required: true },
      ]}
    />
  );
}
