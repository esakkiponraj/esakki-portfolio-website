import GenericResourceManager from '../components/GenericResourceManager';

export default function EducationManager() {
  return (
    <GenericResourceManager
      resource="education"
      title="Education"
      columns={[
        { key: 'degree', label: 'Degree' },
        { key: 'institution', label: 'Institution' },
        { key: 'duration', label: 'Duration' },
      ]}
      fields={[
        { name: 'degree', label: 'Degree', type: 'text', required: true },
        { name: 'institution', label: 'Institution', type: 'text', required: true },
        { name: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g. 2023 – 2027' },
        { name: 'grade', label: 'Grade / CGPA', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
    />
  );
}
