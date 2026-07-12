import GenericResourceManager from '../components/GenericResourceManager';

export default function CertificatesManager() {
  return (
    <GenericResourceManager
      resource="certificates"
      title="Certificates"
      description="Manage internships, courses, and achievement certificates."
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type' },
        { key: 'organization', label: 'Organization' },
      ]}
      fields={[
        { name: 'type', label: 'Type', type: 'select', required: true, options: ['internship', 'course', 'achievement'] },
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'organization', label: 'Organization', type: 'text' },
        { name: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. Jan 2025 – Feb 2025' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'fileUrl', label: 'Certificate File (PDF/Image)', type: 'file' },
      ]}
    />
  );
}
