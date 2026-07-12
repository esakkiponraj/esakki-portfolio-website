import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { adminApi } from '../services/adminApi';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  notificationEmailSent: boolean;
  confirmationEmailSent: boolean;
  createdAt: string;
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get('/messages');
      setMessages(data.data || []);
    } catch {
      toast.error('Could not load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function toggleOpen(msg: Message) {
    const next = openId === msg._id ? null : msg._id;
    setOpenId(next);
    if (next && !msg.read) {
      try {
        await adminApi.patch(`/messages/${msg._id}/read`);
        setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)));
      } catch {
        // non-critical — ignore
      }
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await adminApi.delete(`/messages/${id}`);
      toast.success('Message deleted');
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Messages</h1>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-white/50">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <motion.div key={msg._id} layout className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => toggleOpen(msg)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
              >
                {msg.read ? <FiMail className="text-white/40 shrink-0" /> : <FiMail className="text-accent shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${msg.read ? 'text-white/70' : 'text-white'}`}>{msg.subject}</p>
                  <p className="text-white/50 text-sm truncate">{msg.name} · {msg.email}</p>
                </div>
                <span className="text-xs text-white/40 shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </button>

              {openId === msg._id && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4">
                  <p className="text-white/70 whitespace-pre-wrap mb-4">{msg.message}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex gap-3 text-xs">
                      <span className={`flex items-center gap-1 ${msg.notificationEmailSent ? 'text-green-400' : 'text-red-400'}`}>
                        {msg.notificationEmailSent ? <FiCheck /> : <FiX />} Notified you
                      </span>
                      <span className={`flex items-center gap-1 ${msg.confirmationEmailSent ? 'text-green-400' : 'text-red-400'}`}>
                        {msg.confirmationEmailSent ? <FiCheck /> : <FiX />} Confirmed to visitor
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <a href={`mailto:${msg.email}`} className="btn-outline !py-1.5 !px-3 text-xs">Reply by Email</a>
                      <button onClick={() => handleDelete(msg._id)} className="btn-outline !py-1.5 !px-3 text-xs !text-red-400 !border-red-400/30">
                        <FiTrash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
