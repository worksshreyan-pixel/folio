'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Reveal, SectionIndex, Stamp, Annotation, Highlight, Magnetic, CornerMarks, PencilArrow } from '@/components/paper-kit';
import { Mail, Phone, MessageCircle, Send, Check, Loader2, Linkedin, Github } from 'lucide-react';

const EMAIL = 'shreyanyemul.works@gmail.com';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.message) {
        setForm((f) => ({ ...f, message: customEvent.detail.message }));
      }
    };
    window.addEventListener('prefill-contact', handlePrefill);
    return () => window.removeEventListener('prefill-contact', handlePrefill);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setToast({
        show: true,
        message: 'Please fill in all fields.',
        type: 'error',
      });
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
      return;
    }

    setStatus('loading');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS integration credentials missing.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey }
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setToast({
        show: true,
        message: 'Thank you. Your inquiry has been sent.',
        type: 'success',
      });
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 5000);
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setToast({
        show: true,
        message: 'Something went wrong. Please try again.',
        type: 'error',
      });
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 5000);
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <CornerMarks className="opacity-30" />

      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <SectionIndex n="05" label="Get in Touch" className="mb-12" />
        </Reveal>

        <Reveal>
          <h2 className="display max-w-5xl text-[10vw] leading-[0.9] text-ink sm:text-[7.5vw] lg:text-[6.5rem]">
            Let&rsquo;s <Highlight>Connect</Highlight> &<br />
            <span className="text-stone italic font-light">Collaborate</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* left: contact details */}
          <div>
            <Reveal>
              <p className="max-w-md text-pretty font-sans text-[1.02rem] leading-relaxed text-graphite">
                Open to discussing full-stack development, early-stage product engineering, AI workflows, and software roles.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-5">
              <ContactRow icon={Linkedin} label="LinkedIn Profile ↗" value="Connect on LinkedIn" href="https://www.linkedin.com/in/shreyan-yemul-b802b5417/" />
              <ContactRow icon={Github} label="GitHub Repositories ↗" value="Explore Codebases" href="https://github.com/worksshreyan-pixel" />
              <ContactRow icon={Mail} label="Direct Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            </Reveal>

            <Reveal delay={0.2} className="mt-12 flex items-center gap-4">
              <Stamp color="sage" rotate={-8}>
                open for roles · 2026
              </Stamp>
              <Annotation className="text-[0.9rem]" rotate={3} arrow>
                say hi
              </Annotation>
            </Reveal>

            <Reveal delay={0.25} className="mt-10 hidden lg:block">
              <PencilArrow direction="down-right" className="opacity-40" />
            </Reveal>
          </div>

          {/* right: the form, as a paper sheet */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="paper-sheet relative rounded-xl border border-rule/60 p-7 sm:p-9"
            >
              <div
                aria-hidden
                className="tape absolute -left-3 -top-3 h-5 w-24"
                style={{ transform: 'rotate(-10deg)' }}
              />
              <div className="editorial-label mb-1 flex items-center justify-between">
                <span>Direct Contact / Form</span>
                <span className="text-rule">F-01</span>
              </div>
              <div className="editorial-num text-ink text-lg mb-7">Let's start a conversation.</div>

              <Field label="Your name" n="01">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Jane Doe"
                  className="editorial-input"
                />
              </Field>

              <Field label="Email" n="02">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="jane@company.com"
                  className="editorial-input"
                />
              </Field>

              <Field label="What are you building?" n="03">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={4}
                  placeholder="Interested in collaborating on a product, discussing software roles, or custom MVP builds…"
                  className="editorial-input resize-none"
                />
              </Field>

              <Magnetic strength={0.35} className="mt-7">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  data-cursor={status === 'success' ? 'Sent!' : 'Send'}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-display text-[1.05rem] font-medium text-paper transition-all duration-300 hover:gap-4 disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        Send Message / Inquire
                        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>

              {/* Premium toast notification is activated on success/error */}
            </form>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.editorial-input) {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid hsl(var(--rule));
          padding: 0.6rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: hsl(var(--ink));
          outline: none;
          transition: border-color 0.3s ease;
        }
        :global(.editorial-input::placeholder) {
          color: hsl(var(--stone));
          font-weight: 300;
          font-style: italic;
        }
        :global(.editorial-input:focus) {
          border-color: hsl(var(--ink));
        }
      `}</style>

      {/* Premium Success/Failure Toast Overlay */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[100] max-w-sm rounded-xl border p-5 shadow-lg flex items-center gap-4 ${
              toast.type === 'success' 
                ? 'border-sage/40 bg-[#FAF6F0]' 
                : 'border-coral/30 bg-[#FAF6F0]'
            }`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${
              toast.type === 'success' 
                ? 'bg-sage/10 text-sage' 
                : 'bg-coral/10 text-coral'
            }`}>
              {toast.type === 'success' ? '✓' : '!'}
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-ink">
                {toast.type === 'success' ? 'Thank you' : 'Error'}
              </div>
              <p className="font-sans text-[0.78rem] text-graphite leading-normal">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, n, children }: { label: string; n: string; children: React.ReactNode }) {
  return (
    <label className="mb-6 block">
      <div className="mb-1.5 flex items-baseline gap-2">
        <span className="editorial-num text-[0.65rem] text-stone">{n}</span>
        <span className="editorial-label">{label}</span>
      </div>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      data-cursor="true"
      className="group flex items-center gap-4 border-b border-rule/60 pb-4 transition-colors"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-graphite transition-colors group-hover:bg-ink group-hover:text-paper">
        <Icon size={16} strokeWidth={1.6} />
      </span>
      <div>
        <div className="editorial-label !text-[0.5rem]">{label}</div>
        <div className="font-display text-[1rem] text-ink">{value}</div>
      </div>
    </a>
  );
}
