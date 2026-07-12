import GenericResourceManager from '../components/GenericResourceManager';

export default function TestimonialsManager() {
  return (
    <GenericResourceManager
      resource="testimonials"
      title="Testimonials"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'company', label: 'Company' },
      ]}
      fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'message', label: 'Testimonial Message', type: 'textarea', required: true },
        { name: 'photoUrl', label: 'Photo', type: 'image' },
      ]}
    />
  );
}
