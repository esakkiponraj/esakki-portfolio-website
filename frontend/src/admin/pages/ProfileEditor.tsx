import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import FileUploadField from '../components/FileUploadField';

interface ProfileForm {
  name: string;
  title: string;
  taglines: string;
  summary: string;
  about: string;
  photoUrl: string;
  resumeUrl: string;
  email: string;
  phone: string;
  location: string;
  status: string;
}

const empty: ProfileForm = {
  name: '', title: '', taglines: '', summary: '', about: '',
  photoUrl: '', resumeUrl: '', email: '', phone: '', location: '', status: 'Available For Work',
};

export default function ProfileEditor() {
  const [form, setForm] = useState<ProfileForm>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await adminApi.get('/profile');
        const p = data.data;
        setForm({
          name: p.name || '',
          title: p.title || '',
          taglines: (p.taglines || []).join('\n'),
          summary: p.summary || '',
          about: p.about || '',
          photoUrl: p.photoUrl || '',
          resumeUrl: p.resumeUrl || '',
          email: p.email || '',
          phone: p.phone || '',
          location: p.location || '',
          status: p.status || 'Available For Work',
        });
      } catch {
        toast.error('Could not load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.put('/profile', {
        ...form,
        taglines: form.taglines.split('\n').map((t) => t.trim()).filter(Boolean),
      });
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-white/50">Loading...</p>;

  const inputClass = 'w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors';
  const labelClass = 'text-sm text-white/70 mb-1.5 block';

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5 max-w-2xl">
        <div>
          <label className={labelClass}>Name</label>
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className={labelClass}>Taglines (one per line, for the typing animation)</label>
          <textarea className={`${inputClass} resize-none font-mono text-sm`} rows={4} value={form.taglines} onChange={(e) => setForm({ ...form, taglines: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Professional Summary</label>
          <textarea className={`${inputClass} resize-none`} rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>About (longer bio for the About page)</label>
          <textarea className={`${inputClass} resize-none`} rows={4} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
        </div>

        <FileUploadField label="Profile Photo" value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} />
        <FileUploadField label="Resume (PDF)" value={form.resumeUrl} onChange={(url) => setForm({ ...form, resumeUrl: url })} accept="application/pdf" />

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Availability Status</label>
          <input className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        </div>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
