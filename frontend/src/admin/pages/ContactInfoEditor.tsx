import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import { adminApi } from '../services/adminApi';

export default function ContactInfoEditor() {
  const [form, setForm] = useState({ phone: '', email: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await adminApi.get('/contact-info');
        setForm({ phone: data.data.phone || '', email: data.data.email || '', address: data.data.address || '' });
      } catch {
        toast.error('Could not load contact info');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.put('/contact-info', form);
      toast.success('Contact info updated');
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
      <h1 className="text-2xl font-display font-bold mb-6">Contact Info</h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5 max-w-lg">
        <div>
          <label className={labelClass}>Phone</label>
          <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        </div>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
