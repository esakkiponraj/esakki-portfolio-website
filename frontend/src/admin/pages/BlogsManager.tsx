import GenericResourceManager from '../components/GenericResourceManager';

export default function BlogsManager() {
  return (
    <GenericResourceManager
      resource="blogs"
      title="Blogs"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        { key: 'published', label: 'Published', render: (item) => (item.published ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'slug', label: 'Slug (URL-friendly)', type: 'text', required: true, placeholder: 'my-first-post' },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { name: 'content', label: 'Content', type: 'textarea', required: true },
        { name: 'coverImageUrl', label: 'Cover Image', type: 'image' },
        { name: 'published', label: 'Published', type: 'boolean' },
      ]}
    />
  );
}
