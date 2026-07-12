import { useState, useRef } from 'react';
import { FiUpload, FiCheck, FiX } from 'react-icons/fi';
import { uploadFile } from '../services/adminApi';

interface Props {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
}

export default function FileUploadField({ label, value, onChange, accept = 'image/*' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <label className="text-sm text-white/70 mb-1.5 block">{label}</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-outline !py-2 !px-4 text-sm disabled:opacity-60"
        >
          <FiUpload /> {uploading ? 'Uploading...' : 'Choose File'}
        </button>
        {value && !uploading && (
          <span className="flex items-center gap-1.5 text-green-400 text-sm">
            <FiCheck /> Uploaded
          </span>
        )}
        <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
      </div>
      {value && /\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(value) && (
        <img src={value} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-lg border border-white/10" />
      )}
      {value && (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-accent underline mt-1.5 block truncate max-w-xs">
          {value}
        </a>
      )}
      {error && (
        <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><FiX /> {error}</p>
      )}
    </div>
  );
}
