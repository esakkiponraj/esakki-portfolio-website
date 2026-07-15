import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import { adminApi } from '../services/adminApi';
import FileUploadField from './FileUploadField';

export type FieldType = 'text' | 'textarea' | 'number' | 'lines' | 'select' | 'multiselect' | 'image' | 'file' | 'boolean';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface ColumnConfig {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
}

interface Props {
  resource: string; // API path, e.g. "projects"
  title: string;
  description?: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
}

function emptyFormFromFields(fields: FieldConfig[]) {
  const obj: Record<string, any> = {};
  for (const f of fields) {
    if (f.type === 'multiselect') obj[f.name] = [];
    else if (f.type === 'lines') obj[f.name] = '';
    else if (f.type === 'number') obj[f.name] = 0;
    else if (f.type === 'boolean') obj[f.name] = false;
    else obj[f.name] = '';
  }
  return obj;
}

export default function GenericResourceManager({ resource, title, description, fields, columns }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyFormFromFields(fields));
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get(`/${resource}`);
      setItems(data.data || []);
    } catch (err) {
      toast.error(`Could not load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }, [resource, title]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyFormFromFields(fields));
    setModalOpen(true);
  }

  function openEditModal(item: any) {
    setEditingId(item._id);
    const next: Record<string, any> = {};
    for (const f of fields) {
      if (f.type === 'lines') {
        next[f.name] = Array.isArray(item[f.name]) ? item[f.name].join('\n') : '';
      } else if (f.type === 'boolean') {
        next[f.name] = Boolean(item[f.name]);
      } else {
        next[f.name] = item[f.name] ?? (f.type === 'multiselect' ? [] : '');
      }
    }
    setForm(next);
    setModalOpen(true);
  }

  function toggleMultiselect(fieldName: string, option: string) {
    setForm((prev) => {
      const current: string[] = prev[fieldName] || [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [fieldName]: next };
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, any> = { ...form };
      for (const f of fields) {
        if (f.type === 'lines') {
          payload[f.name] = (form[f.name] as string)
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
        }
        if (f.type === 'number') {
          payload[f.name] = Number(form[f.name]) || 0;
        }
      }

      if (editingId) {
        await adminApi.put(`/${resource}/${editingId}`, payload);
        toast.success('Updated successfully');
      } else {
        await adminApi.post(`/${resource}`, payload);
        toast.success('Added successfully');
      }
      setModalOpen(false);
      fetchItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      await adminApi.delete(`/${resource}/${id}`);
      toast.success('Deleted');
      fetchItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold">{title}</h1>
          {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
        </div>
        <button onClick={openAddModal} className="btn-primary !py-2 !px-4 text-sm">
          <FiPlus /> Add New
        </button>
      </div>

      <div className="glass rounded-2xl overflow-x-auto">
        {loading ? (
          <p className="text-white/50 p-6">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-white/50 p-6">Nothing here yet — click "Add New" to create one.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-white/50">
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-3 font-medium">{col.label}</th>
                ))}
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-white/5 hover:bg-white/5">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3 align-top max-w-xs truncate">
                      {col.render ? col.render(item) : String(item[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEditModal(item)} className="p-2 rounded-lg hover:bg-white/10 text-accent mr-1" aria-label="Edit">
                      <FiEdit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-white/10 text-red-400" aria-label="Delete">
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.form
              onSubmit={handleSave}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 md:p-8 w-full max-w-lg my-8 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-display font-bold">{editingId ? 'Edit' : 'Add New'} {title.replace(/s$/, '')}</h3>
                <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-white/10">
                  <FiX />
                </button>
              </div>

              {fields.map((f) => (
                <div key={f.name}>
                  {f.type === 'text' && (
                    <>
                      <label className="text-sm text-white/70 mb-1.5 block">{f.label}</label>
                      <input
                        type="text"
                        required={f.required}
                        placeholder={f.placeholder}
                        value={form[f.name] || ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors"
                      />
                    </>
                  )}

                  {f.type === 'number' && (
                    <>
                      <label className="text-sm text-white/70 mb-1.5 block">{f.label}</label>
                      <input
                        type="number"
                        required={f.required}
                        value={form[f.name] ?? 0}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors"
                      />
                    </>
                  )}

                  {f.type === 'textarea' && (
                    <>
                      <label className="text-sm text-white/70 mb-1.5 block">{f.label}</label>
                      <textarea
                        required={f.required}
                        placeholder={f.placeholder}
                        rows={4}
                        value={form[f.name] || ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors resize-none"
                      />
                    </>
                  )}

                  {f.type === 'lines' && (
                    <>
                      <label className="text-sm text-white/70 mb-1.5 block">{f.label} <span className="text-white/40">(one per line)</span></label>
                      <textarea
                        rows={4}
                        placeholder={f.placeholder}
                        value={form[f.name] || ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors resize-none font-mono text-sm"
                      />
                    </>
                  )}

                  {f.type === 'select' && (
                    <>
                      <label className="text-sm text-white/70 mb-1.5 block">{f.label}</label>
                      <select
                        required={f.required}
                        value={form[f.name] || ''}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors"
                      >
                        <option value="" disabled>Select {f.label.toLowerCase()}</option>
                        {f.options?.map((o) => (
                          <option key={o} value={o} className="bg-card">{o}</option>
                        ))}
                      </select>
                    </>
                  )}

                  {f.type === 'multiselect' && (
                    <>
                      <label className="text-sm text-white/70 mb-1.5 block">{f.label}</label>
                      <div className="flex flex-wrap gap-2">
                        {f.options?.map((o) => {
                          const selected = (form[f.name] || []).includes(o);
                          return (
                            <button
                              type="button"
                              key={o}
                              onClick={() => toggleMultiselect(f.name, o)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                selected ? 'bg-primary text-white' : 'bg-white/5 text-white/60 border border-white/10'
                              }`}
                            >
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {f.type === 'boolean' && (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(form[f.name])}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-white/70">{f.label}</span>
                    </label>
                  )}

                  {(f.type === 'image' || f.type === 'file') && (
                    <FileUploadField
                      label={f.label}
                      value={form[f.name]}
                      onChange={(url) => setForm({ ...form, [f.name]: url })}
                      accept={f.type === 'file' ? 'image/*,application/pdf' : 'image/*'}
                    />
                  )}
                </div>
              ))}

              <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60 mt-2">
                <FiSave /> {saving ? 'Saving...' : 'Save'}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
