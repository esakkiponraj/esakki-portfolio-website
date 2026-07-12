import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
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
      await submitContactForm(form);
      toast.success("Message sent! I'll get back to you shortly.");
      setForm(initialState);
    } catch (err) {
      // Backend not connected yet, or a network/server error occurred.
      toast.error('Could not send message right now — the backend may not be connected yet. Please email me directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-container">
      <SectionHeading eyebrow="Get In Touch" title="Contact Me" />

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <GlassCard className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">{personalInfo.status}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-fg/80">
                <FiMail className="text-accent shrink-0" />
                <a href={personalInfo.socials.email} className="hover:text-accent transition-colors">{personalInfo.email}</a>
              </div>
              <div className="flex items-center gap-3 text-fg/80">
                <FiPhone className="text-accent shrink-0" />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-accent transition-colors">{personalInfo.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-fg/80">
                <FiMapPin className="text-accent shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 space-y-5"
          noValidate
        >
          <div>
            <label className="text-sm text-fg/70 mb-1.5 block">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-fg/5 border border-fg/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm text-fg/70 mb-1.5 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-fg/5 border border-fg/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm text-fg/70 mb-1.5 block">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-fg/5 border border-fg/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors"
              placeholder="What's this about?"
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="text-sm text-fg/70 mb-1.5 block">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full bg-fg/5 border border-fg/10 focus:border-accent rounded-lg px-4 py-2.5 outline-none transition-colors resize-none"
              placeholder="Your message..."
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? 'Sending...' : <>Send Message <FiSend /></>}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
