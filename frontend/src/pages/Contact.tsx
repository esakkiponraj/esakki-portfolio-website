import './public.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { submitContactForm } from '../services/api';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
const initialState: FormState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { personalInfo } = usePortfolioData();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await submitContactForm(form);
      toast.success(res?.message || "Message sent! I'll get back to you shortly.");
      setForm(initialState);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      const isTimeout = err?.code === 'ECONNABORTED' || err?.message?.toLowerCase().includes('timeout');
      const msg = isTimeout
        ? 'Request timed out. The server may be starting up — please try again in a moment.'
        : err?.response?.data?.message || 'Could not send message right now. Please email me directly.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pub-page">
      <div className="pub-container">
        <motion.div
          className="pub-header center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">Get In Touch</span>
          <h1 className="pub-title">Contact Me</h1>
          <hr className="pub-rule" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', alignItems: 'start' }}
          className="pub-contact-layout">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {personalInfo.status && (
              <div className="pub-status-badge" style={{ marginBottom: '1.5rem' }}>
                <span className="pub-status-dot" /> {personalInfo.status}
              </div>
            )}

            <div className="pub-contact-info" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.975rem', fontWeight: 700, color: '#202A35', margin: '0 0 1.25rem' }}>
                Contact Details
              </h3>
              {personalInfo.email && (
                <div className="pub-contact-row">
                  <div className="pub-contact-icon"><FiMail size={15} /></div>
                  <a href={personalInfo.socials.email} className="pub-contact-link">{personalInfo.email}</a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="pub-contact-row">
                  <div className="pub-contact-icon"><FiPhone size={15} /></div>
                  <a href={`tel:${personalInfo.phone}`} className="pub-contact-link">{personalInfo.phone}</a>
                </div>
              )}
              {personalInfo.location && (
                <div className="pub-contact-row">
                  <div className="pub-contact-icon"><FiMapPin size={15} /></div>
                  <span className="pub-contact-link">{personalInfo.location}</span>
                </div>
              )}
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {personalInfo.socials.github && personalInfo.socials.github !== '#' && (
                <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: 600, color: '#345474', border: '1px solid #D6E4F0', borderRadius: 8, textDecoration: 'none', background: '#fff' }}>
                  <FiGithub size={14} /> GitHub
                </a>
              )}
              {personalInfo.socials.linkedin && personalInfo.socials.linkedin !== '#' && (
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: 600, color: '#345474', border: '1px solid #D6E4F0', borderRadius: 8, textDecoration: 'none', background: '#fff' }}>
                  <FiLinkedin size={14} /> LinkedIn
                </a>
              )}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            onSubmit={handleSubmit}
            className="pub-form"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >
            <div>
              <label className="pub-label" htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="pub-input" placeholder="Your name" />
              {errors.name && <span className="pub-error">{errors.name}</span>}
            </div>
            <div>
              <label className="pub-label" htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="pub-input" placeholder="you@example.com" />
              {errors.email && <span className="pub-error">{errors.email}</span>}
            </div>
            <div>
              <label className="pub-label" htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" type="text" value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="pub-input" placeholder="What's this about?" />
              {errors.subject && <span className="pub-error">{errors.subject}</span>}
            </div>
            <div>
              <label className="pub-label" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5} className="pub-input" placeholder="Your message..."
                style={{ resize: 'none' }} />
              {errors.message && <span className="pub-error">{errors.message}</span>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="pub-submit"
              style={sent ? { background: '#2d8f5e', borderColor: '#2d8f5e' } : {}}
            >
              {loading ? (
                'Sending…'
              ) : sent ? (
                <><FiCheck size={16} /> Message Sent!</>
              ) : (
                <><FiSend size={14} /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
