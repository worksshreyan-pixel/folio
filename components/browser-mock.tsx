import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tape, CornerMarks, Annotation, Stamp, PaperClip, Highlight } from '@/components/paper-kit';

/* Each project supplies a "site" renderer so every browser mock looks unique */
export type SiteRenderer = () => JSX.Element;

export function BrowserMock({
  url,
  renderSite,
  className = '',
  rotate = 0,
  tapeColor = 'gold',
  index = '01',
  metrics,
  inView = false,
}: {
  url: string;
  renderSite: () => JSX.Element;
  className?: string;
  rotate?: number;
  tapeColor?: 'gold' | 'coral' | 'sage' | 'lavender';
  index?: string;
  metrics?: { label: string; value: string }[];
  inView?: boolean;
}) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`relative group ${className}`}
    >
      <Tape className="absolute -top-2.5 left-8 z-30 h-5 w-24" rotate={-5} color={tapeColor} />
      <PaperClip className="absolute -right-1 -top-3 z-30" rotate={-20} />

      {/* browser chrome */}
      <div className="paper-edge overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-lg">
        <div className="flex items-center gap-2 border-b border-rule/60 bg-[hsl(38_30%_96%)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage/80" />
          <div className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-paper-2 px-3">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--stone))" strokeWidth="2">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="font-mono text-[0.65rem] text-graphite">{displayUrl}</span>
          </div>
          <span className="editorial-label hidden !text-[0.5rem] sm:block">{index}</span>
        </div>

        {/* viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper">
          <CornerMarks className="opacity-30" />
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]">
            {inView ? renderSite() : <div className="h-full w-full bg-paper" />}
          </div>
        </div>

        {/* metrics bar */}
        {metrics && metrics.length > 0 && (
          <div className="flex items-center justify-between border-t border-rule/60 bg-[hsl(38_30%_96%)] px-4 py-2">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-sm font-semibold text-ink">{m.value}</span>
                <span className="editorial-label !text-[0.5rem]">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Auto-scroll wrapper for tall site screenshots                      */
/* ---------------------------------------------------------------- */
export function AutoScroll({
  children,
  className = '',
  duration = 30,
  distance = '72%',
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: string;
}) {
  const uniqueId = useRef('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    uniqueId.current = `autoscroll-${Math.random().toString(36).substring(2, 9)}`;
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <div className="absolute inset-x-0 top-0">{children}</div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-paper to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <style>{`
        .scroll-content-${uniqueId.current} {
          transform: translateY(0);
          transition: transform 6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .group:hover .scroll-content-${uniqueId.current} {
          transform: translateY(-${distance});
          transition: transform ${duration}s linear;
        }
      `}</style>
      <div className={`absolute inset-x-0 top-0 scroll-content-${uniqueId.current}`}>
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Individual project site renderers — each visually distinct         */
/* ---------------------------------------------------------------- */
export function EliteCosmoSite() {
  return (
    <AutoScroll distance="72%" duration={30}>
      <div className="bg-white text-[#1E293B] font-sans pb-8 min-h-[900px] relative text-left">
        {/* Soft luxury radial glow background */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-45"
          style={{
            background: 'radial-gradient(circle at 100% 0%, rgba(13,148,136,0.12) 0%, transparent 80%)'
          }}
        />

        {/* Navbar */}
        <div className="bg-white/95 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 select-none">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-teal-800 flex items-center justify-center text-white text-[0.45rem] font-bold">✦</span>
            <span className="text-[0.45rem] font-bold tracking-wider text-slate-800 uppercase">Elite Cosmo Clinic</span>
          </div>
          <div className="flex gap-2.5 text-[0.32rem] font-medium text-slate-500 uppercase tracking-wider">
            <span>Treatments</span>
            <span>Doctors</span>
            <span>Reviews</span>
            <span>Contact</span>
          </div>
          <button className="bg-[#004D40] text-white px-3 py-1 rounded text-[0.32rem] font-semibold transition-all">
            Book Appointment
          </button>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-12 gap-3 px-4 pt-6 items-start">
          
          {/* Left info column */}
          <div className="col-span-5 flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded-full w-fit">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              <span className="text-[0.25rem] text-slate-500 font-semibold tracking-wide">Best Hair Transplant & Cosmetic Clinic in Solapur</span>
            </div>
            <h1 className="text-[1.1rem] font-extrabold tracking-tight text-slate-900 leading-tight">
              Transform Your <span className="text-[#0D9488]">Confidence</span>
            </h1>
            <p className="text-[0.35rem] leading-relaxed text-slate-500">
              Best Hair Transplant, Skin, Laser & Cosmetic Clinic in Solapur — where advanced technology meets personalised, natural-looking results.
            </p>
            <div className="flex gap-2 mt-1">
              <button className="bg-[#004D40] text-white px-2.5 py-1 rounded text-[0.32rem] font-bold flex items-center gap-1">
                <span>📅</span> Book Appointment
              </button>
              <button className="border border-emerald-200 text-emerald-600 px-2.5 py-1 rounded text-[0.32rem] font-bold flex items-center gap-1">
                <span>💬</span> WhatsApp
              </button>
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-[0.28rem] text-slate-500 select-none">
              <span className="text-amber-500">★★★★★</span>
              <span>Rated 5.0 by 1000+ patients</span>
              <span className="text-blue-500 text-[0.35rem]">✓</span>
            </div>
          </div>

          {/* Center visual column */}
          <div className="col-span-4 relative">
            <div className="aspect-[4/5] w-full rounded-xl bg-slate-100 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-end p-2.5">
              {/* Treatment room mockup gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-200/20 to-transparent" />
              <div className="absolute top-2.5 right-2.5 bg-white/90 px-1.5 py-0.5 rounded shadow-sm text-[0.28rem] font-bold flex items-center gap-1 text-[#0D9488]">
                <span>🛡️</span> USFDA Approved
              </div>
              <div className="relative z-10 bg-white/95 rounded p-1.5 shadow-sm">
                <span className="text-[0.22rem] text-slate-400 font-bold block uppercase">Led by</span>
                <span className="text-[0.3rem] font-bold text-slate-800 block leading-tight">Dr. Ukarande</span>
                <span className="text-[0.22rem] text-slate-500">Hair Transplant Specialist</span>
              </div>
            </div>
          </div>

          {/* Right stats column */}
          <div className="col-span-3 flex flex-col gap-2">
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/50 shadow-sm text-center">
              <h4 className="text-[0.45rem] font-extrabold text-[#004D40] leading-none">1000+</h4>
              <span className="text-[0.24rem] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Happy Patients</span>
            </div>
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/50 shadow-sm text-center">
              <h4 className="text-[0.45rem] font-extrabold text-[#004D40] leading-none">500+</h4>
              <span className="text-[0.24rem] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Hair Transplants</span>
            </div>
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/50 shadow-sm text-center">
              <h4 className="text-[0.45rem] font-extrabold text-[#004D40] leading-none">10+</h4>
              <span className="text-[0.24rem] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Years Experience</span>
            </div>
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100/50 shadow-sm text-center">
              <h4 className="text-[0.45rem] font-extrabold text-[#004D40] leading-none">5★</h4>
              <span className="text-[0.24rem] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Patient Satisfaction</span>
            </div>
          </div>
        </div>

        {/* 2. Treatments Section */}
        <div className="mt-8 px-4">
          <span className="text-[0.26rem] font-bold text-[#0D9488] tracking-widest uppercase block mb-1">✦ Clinical Specialties</span>
          <h3 className="text-xs font-black text-slate-800 mb-4">Our Specialized Treatments</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[0.55rem] block mb-1">🌱</span>
              <h5 className="text-[0.32rem] font-bold text-slate-800">FUE Hair Transplant</h5>
              <p className="text-[0.26rem] text-slate-400 mt-0.5 leading-tight">Advanced Solapur hair restoration technique.</p>
            </div>
            <div className="bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[0.55rem] block mb-1">✨</span>
              <h5 className="text-[0.32rem] font-bold text-slate-800">Laser Skin Correction</h5>
              <p className="text-[0.26rem] text-slate-400 mt-0.5 leading-tight">USFDA approved lasers for pristine skin.</p>
            </div>
          </div>
        </div>

        {/* 3. Testimonial Section */}
        <div className="mt-8 mx-4 p-3 bg-[#FAF8F5] rounded-xl border border-amber-100 flex flex-col gap-1.5 select-none">
          <div className="flex justify-between items-center">
            <span className="text-[0.28rem] font-bold text-slate-700">Patient Review</span>
            <span className="text-amber-500 text-[0.28rem]">★★★★★</span>
          </div>
          <p className="text-[0.28rem] italic text-slate-500 leading-normal">
            "Solapur's most advanced hair restoration. Very friendly staff and great results."
          </p>
          <span className="text-[0.22rem] font-bold text-slate-400">— Rohit S., Solapur</span>
        </div>

        {/* 4. Footer */}
        <div className="mt-10 border-t border-slate-100 pt-4 px-4 text-center select-none">
          <span className="text-[0.25rem] text-slate-400 font-medium">Elite Cosmo Clinic · Solapur, Maharashtra</span>
        </div>
      </div>
    </AutoScroll>
  );
}

export function DealItSite() {
  return (
    <AutoScroll distance="72%" duration={30}>
      <div className="bg-[#FAFBFD] text-[#0A0F1D] font-sans pb-8 min-h-[900px] relative text-left">
        {/* Clean slate blueprint lines */}
        <div className="absolute inset-0 blueprint-lines opacity-[0.05] pointer-events-none" />

        {/* Navbar */}
        <div className="bg-[#FAFBFD]/95 border-b border-slate-200/60 px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-1.5">
            <div className="h-4.5 w-4.5 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[0.42rem] font-bold shadow-sm">
              🛡️
            </div>
            <span className="font-bold text-[0.55rem] tracking-tight text-slate-900">Dealit</span>
          </div>
          <div className="flex gap-3 text-[0.32rem] font-semibold text-slate-500">
            <span>Home</span>
            <span>Create Deal</span>
            <span>Dashboard</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1 rounded-full text-[0.32rem] font-bold shadow-sm transition-all">
            Login
          </button>
        </div>

        {/* Hero Section */}
        <div className="px-6 pt-8 text-center max-w-md mx-auto">
          <h1 className="text-xl font-extrabold tracking-tight text-[#0A0F1D] mt-2 leading-tight">
            Secure Digital Delivery, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">Perfected</span>
          </h1>
          <p className="text-[0.38rem] text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
            Deliver software, credentials, or documents securely. Get paid via Stripe instantly.
          </p>
        </div>

        {/* Enter Deal Code Widget */}
        <div className="mt-4 bg-white border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-sm max-w-xs mx-auto">
          <div className="flex flex-col leading-none">
            <span className="text-[0.24rem] text-slate-400 font-bold uppercase tracking-wider">Enter Deal Code</span>
            <span className="text-[0.35rem] font-medium text-slate-300 mt-1">E.G., 6YHG72KD</span>
          </div>
          <button className="bg-indigo-600 text-white h-7 w-7 rounded-lg flex items-center justify-center text-[0.38rem] shadow-sm">
            🔍
          </button>
        </div>

        {/* Create Private Deal Form Widget */}
        <div className="mt-4 bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm max-w-xs mx-auto">
          <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
            <div>
              <span className="text-[0.35rem] font-bold text-slate-800 block leading-tight">Create Private Deal</span>
              <span className="text-[0.24rem] text-slate-400">Configure secure digital delivery link</span>
            </div>
          </div>

          {/* Upload card */}
          <div className="mt-2.5 border border-dashed border-slate-200 rounded-lg p-3 text-center bg-slate-50/60 flex flex-col items-center justify-center select-none">
            <span className="text-[0.28rem] text-slate-400 font-medium">Click anywhere to upload or drag & drop</span>
            <button className="mt-1.5 bg-white border border-slate-200 text-indigo-600 px-2 py-0.5 rounded text-[0.28rem] font-bold shadow-sm">
              Upload File
            </button>
          </div>

          <div className="mt-3 space-y-2 text-[0.28rem]">
            <div>
              <label className="text-[0.22rem] font-bold text-slate-400 uppercase tracking-wider block">Deal Name</label>
              <input readOnly placeholder="Auto-filled from filename" className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[0.28rem] outline-none mt-0.5 text-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[0.22rem] font-bold text-slate-400 uppercase tracking-wider block">Price (₹)</label>
                <input readOnly placeholder="0" className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[0.28rem] outline-none mt-0.5 text-slate-400" />
              </div>
              <div>
                <label className="text-[0.22rem] font-bold text-slate-400 uppercase tracking-wider block">Expiry</label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[0.28rem] mt-0.5 text-slate-400 select-none">
                  12 Hours (Max)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. How it works section */}
        <div className="mt-8 px-6 text-center max-w-xs mx-auto">
          <h3 className="text-xs font-black text-slate-800 mb-4">How Dealit Works</h3>
          <div className="space-y-3.5 text-left">
            <div className="flex items-start gap-2.5">
              <span className="h-4.5 w-4.5 rounded bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-[0.28rem] shrink-0">1</span>
              <div>
                <h5 className="text-[0.3rem] font-bold text-slate-800">Lock Digital Files</h5>
                <p className="text-[0.25rem] text-slate-400 leading-tight">Files are stored securely in our escrow vault.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-4.5 w-4.5 rounded bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-[0.28rem] shrink-0">2</span>
              <div>
                <h5 className="text-[0.3rem] font-bold text-slate-800">Escrow Payment</h5>
                <p className="text-[0.25rem] text-slate-400 leading-tight">Funds are held by Stripe connect until files are downloaded.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Footer */}
        <div className="mt-10 border-t border-slate-100 pt-4 text-center select-none">
          <span className="text-[0.25rem] text-slate-400 font-medium">Dealit Escrow Systems · Private Security</span>
        </div>
      </div>
    </AutoScroll>
  );
}


export function AnnotationChip({
  children,
  className = '',
  rotate = -3,
  color = 'gold',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: 'gold' | 'coral' | 'sage';
}) {
  const c: Record<string, string> = {
    gold: 'hsl(48 60% 86%)',
    coral: 'hsl(9 58% 82%)',
    sage: 'hsl(90 22% 84%)',
  };
  return (
    <div
      className={`paper-edge relative max-w-[14rem] px-3 py-2 font-hand text-[0.85rem] leading-tight text-graphite ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, background: c[color] }}
    >
      {children}
    </div>
  );
}

export function TemplateSystemPreview({
  configText,
  fileName,
  children
}: {
  configText: string;
  fileName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-300 font-mono text-[0.5rem] overflow-hidden leading-tight select-none">
      {/* Config sidebar (dark theme) */}
      <div className="w-[38%] border-r border-slate-800 bg-[#0c101b] p-3 flex flex-col justify-between select-none text-left">
        <div>
          <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2 mb-2">
            <span className="text-[0.45rem] text-slate-500 font-bold">📄</span>
            <span className="text-slate-400 font-semibold tracking-wide">{fileName}</span>
          </div>
          <pre className="text-emerald-400/90 leading-normal font-mono text-[0.45rem] whitespace-pre-wrap">
            {configText}
          </pre>
        </div>
        <div className="text-[0.4rem] text-slate-500 border-t border-slate-900 pt-1.5 flex items-center gap-1 font-sans">
          <span>⚙️</span>
          <span>Config-driven System</span>
        </div>
      </div>
      {/* Rendered Preview pane */}
      <div className="flex-1 bg-white relative overflow-hidden h-full">
        {children}
      </div>
    </div>
  );
}

export function DoctorTemplateSite() {
  return (
    <TemplateSystemPreview
      fileName="doctor.config.yml"
      configText={`# doctor.config.yml
doctor:
  name: "Dr. Aarogya"
  specialty: "Consultant"
  experience: "15+ Years"
ui:
  theme: "teal"
  responsive: true
features:
  - Appointments
  - WhatsApp Form`}
    >
      <AutoScroll distance="72%" duration={30}>
        <div className="bg-white text-slate-800 font-sans pb-8 min-h-[900px] relative text-left">
          
          {/* Navbar */}
          <div className="bg-white/95 border-b border-slate-100 px-3 py-2 flex items-center justify-between sticky top-0 z-30 select-none">
            <div className="flex items-center gap-1">
              <span className="h-3.5 w-3.5 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-[0.38rem] font-bold">✦</span>
              <span className="text-[0.4rem] font-extrabold tracking-wider uppercase text-[#0D9488]">Aarogya</span>
            </div>
            <button className="bg-[#0D9488] text-white px-2.5 py-0.5 rounded text-[0.28rem] font-bold shadow-sm">
              Book Visit
            </button>
          </div>

          {/* Hero Content stacked */}
          <div className="px-3 pt-6 flex flex-col gap-2 text-left">
            <span className="inline-block bg-teal-50 border border-teal-100 text-[#0D9488] px-2 py-0.5 rounded-full text-[0.25rem] font-bold w-fit">
              ✦ Registered Healthcare Facility
            </span>
            <h1 className="text-sm font-black tracking-tight text-slate-900 leading-tight">
              Specialist Care,<br />
              <span className="text-[#0D9488]">Trusted Results</span>
            </h1>
            <p className="text-[0.35rem] leading-relaxed text-slate-500">
              A modern multi-specialty clinic delivering evidence-based care with a patient-first approach. Located in Bengaluru.
            </p>
            <div className="flex gap-2">
              <button className="bg-[#0D9488] text-white px-3 py-1 rounded text-[0.28rem] font-bold shadow-sm">
                Book Appointment
              </button>
              <button className="border border-slate-200 text-slate-500 px-3 py-1 rounded text-[0.28rem] font-bold">
                Call Us
              </button>
            </div>
            <div className="flex items-center gap-1 text-[0.26rem] text-slate-400 mt-1 select-none">
              <span className="text-amber-500">★★★★★</span>
              <span>4.8/5 from 2000+ patients</span>
            </div>
          </div>

          {/* Photo Placeholder Card */}
          <div className="mt-5 mx-3">
            <div className="aspect-[1.5/1] w-full rounded-xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col items-center justify-center text-center select-none shadow-inner">
              <span className="text-[0.45rem]">📷</span>
              <span className="text-[0.28rem] font-bold text-slate-400 mt-1">Aarogya Clinic Facility</span>
              <span className="text-[0.22rem] text-slate-300 mt-0.5">Clinic Photo Placeholder</span>
            </div>
          </div>

          {/* 2. Departments list */}
          <div className="mt-6 px-3">
            <span className="text-[0.22rem] text-[#0D9488] font-bold uppercase tracking-wider block mb-0.5">✦ Medical Units</span>
            <h5 className="text-[0.32rem] font-black text-slate-800 mb-2.5">Our Departments</h5>
            <div className="space-y-2">
              <div className="bg-slate-50 p-2 rounded border border-slate-100/50 flex items-center justify-between text-[0.28rem]">
                <span className="font-bold text-slate-700">Cardiology</span>
                <span className="text-slate-400">Heart screening</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100/50 flex items-center justify-between text-[0.28rem]">
                <span className="font-bold text-slate-700">ENT Specialty</span>
                <span className="text-slate-400">Sinus & hearing care</span>
              </div>
            </div>
          </div>

          {/* Bottom stats row */}
          <div className="mt-6 mx-3 grid grid-cols-2 gap-2 text-left">
            <div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100">
              <span className="text-[0.38rem] font-black text-slate-800 block">15+</span>
              <span className="text-[0.22rem] text-slate-400">Years Experience</span>
            </div>
            <div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100">
              <span className="text-[0.38rem] font-black text-slate-800 block">20k+</span>
              <span className="text-[0.22rem] text-slate-400">Patients Treated</span>
            </div>
          </div>
          
          {/* 3. Footer */}
          <div className="mt-10 border-t border-slate-100 pt-4 text-center select-none">
            <span className="text-[0.25rem] text-slate-400 font-medium">Aarogya Medical · Bengaluru, Karnataka</span>
          </div>

        </div>
      </AutoScroll>
    </TemplateSystemPreview>
  );
}

export function ClinicTemplateSite() {
  return (
    <TemplateSystemPreview
      fileName="clinic.config.yml"
      configText={`# clinic.config.yml
clinic:
  name: "Aarav Clinic"
  theme: "blue"
  location: "Pune, IN"
ui:
  whatsapp: true
  reviews: 4.9
features:
  - Dermatology
  - Laser Care`}
    >
      <AutoScroll distance="72%" duration={30}>
        <div className="bg-[#FAFBFD] text-[#0F2537] font-sans pb-8 min-h-[900px] relative text-left">
          {/* Grid lines */}
          <div className="absolute inset-0 blueprint-lines opacity-[0.05] pointer-events-none" />

          {/* Navbar */}
          <div className="bg-[#FAFBFD]/98 border-b border-slate-200/60 px-3 py-2 flex items-center justify-between sticky top-0 z-30 select-none">
            <div className="flex items-center gap-1">
              <span className="text-[0.5rem]">🩺</span>
              <span className="font-extrabold text-[0.4rem] tracking-tight uppercase text-slate-800">Aarav Clinic</span>
            </div>
            <button className="bg-blue-600 text-white px-2.5 py-0.5 rounded text-[0.28rem] font-bold shadow-sm">
              Book Appointment
            </button>
          </div>

          {/* Hero Content stacked */}
          <div className="px-3 pt-6 flex flex-col gap-2 text-left">
            <span className="inline-block bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[0.25rem] font-bold w-fit">
              ✦ Trusted dermatology care in Pune
            </span>
            <h1 className="text-sm font-black tracking-tight text-slate-900 leading-tight">
              Confident Skin. Healthy Hair.<br />
              <span className="text-blue-600 font-extrabold">Advanced Laser Care.</span>
            </h1>
            <p className="text-[0.35rem] leading-relaxed text-slate-500">
              Expert dermatology, hair restoration and laser treatments delivered with modern technology.
            </p>
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-[0.28rem] font-bold shadow-sm">
                  Book Appointment
                </button>
                <button className="border border-slate-200 bg-white text-slate-500 px-3 py-1 rounded text-[0.28rem] font-bold">
                  Treatments →
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[0.26rem] text-slate-400 mt-1 select-none">
              <span className="text-amber-500">★★★★★</span>
              <span>4.9/5 from 500+ happy patients</span>
            </div>
          </div>

          {/* Photo Placeholder Card */}
          <div className="mt-5 mx-3">
            <div className="aspect-[1.5/1] w-full rounded-xl border border-slate-100 bg-white p-4 flex flex-col items-center justify-center text-center relative select-none shadow-sm overflow-hidden">
              <span className="text-[0.45rem]">📷</span>
              <span className="text-[0.28rem] font-bold text-slate-400 mt-1">Dermatology Consultation</span>
              
              <div className="absolute bottom-2.5 inset-x-2.5 bg-blue-50 border border-blue-100 rounded py-0.5 text-[0.22rem] font-bold text-blue-600 text-center">
                Personalised Care Plans · Designed for you
              </div>
            </div>
          </div>

          {/* 2. Treatments List Grid */}
          <div className="mt-6 px-3">
            <span className="text-[0.22rem] text-blue-600 font-bold uppercase tracking-wider block mb-0.5">✦ Specialities</span>
            <h5 className="text-[0.32rem] font-black text-slate-800 mb-2.5">Aarav Care Services</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-100 p-2 rounded-lg text-[0.28rem]">
                <span className="font-bold text-slate-700 block leading-tight">Dermatology</span>
                <span className="text-[0.24rem] text-slate-400 block mt-0.5">Custom skin plans</span>
              </div>
              <div className="bg-white border border-slate-100 p-2 rounded-lg text-[0.28rem]">
                <span className="font-bold text-slate-700 block leading-tight">Laser Care</span>
                <span className="text-[0.24rem] text-slate-400 block mt-0.5">USFDA approved</span>
              </div>
            </div>
          </div>

          {/* 3. WhatsApp Integration Section */}
          <div className="mt-6 mx-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col gap-1 items-center select-none text-[0.28rem] text-center">
            <span className="text-[0.55rem]">💬</span>
            <span className="font-black text-slate-800 leading-tight">Instant WhatsApp Support</span>
            <p className="text-[0.24rem] text-slate-400">Quick book visits, consult doctor, get pricing.</p>
            <button className="mt-1.5 bg-emerald-500 text-white px-3 py-1 rounded text-[0.26rem] font-bold shadow-sm">
              Chat Now
            </button>
          </div>

          {/* 4. Footer */}
          <div className="mt-10 border-t border-slate-100 pt-4 text-center select-none">
            <span className="text-[0.25rem] text-slate-400 font-medium">Aarav Clinic Pune · Premium Skin Care</span>
          </div>
        </div>
      </AutoScroll>
    </TemplateSystemPreview>
  );
}

export function DeltSite() {
  return (
    <AutoScroll distance="30%" duration={12}>
      <div className="w-full bg-white text-slate-900 font-sans p-6 md:p-8 flex flex-col items-center select-none border-b border-slate-100">
        {/* Mini Nav */}
        <div className="w-full flex items-center justify-between pb-6 border-b border-slate-100/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-950 flex items-center justify-center text-white text-xs font-bold font-mono">P</div>
            <span className="font-bold text-sm tracking-tight text-slate-950">DELT</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-500">
            <span>How it works</span>
            <span>Pricing</span>
            <span>Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 px-2 py-1">Log in</span>
            <span className="text-xs font-semibold bg-slate-950 text-white px-3 py-1.5 rounded-lg shadow-sm">Get started</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="w-full max-w-lg text-center pt-8 pb-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-medium text-emerald-700 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Private client transactions, all in one place
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
            The workspace where digital work gets done.
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-sm">
            DELT brings client communication, negotiation, delivery and payment into one secure workspace.
          </p>
          <div className="flex items-center gap-2.5 mt-4">
            <button className="text-xs font-medium bg-slate-950 text-white px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
              Create your first Deal <span>→</span>
            </button>
            <button className="text-xs font-medium bg-white text-slate-700 border border-slate-200 px-3.5 py-2 rounded-lg shadow-2xs">
              See how it works
            </button>
          </div>
        </div>

        {/* Inner Floating Deal Card Mockup */}
        <div className="w-full max-w-md bg-white rounded-xl border border-slate-200/80 shadow-md p-4 text-left mt-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Clinic Website Redesign</h4>
              <p className="text-[10px] text-slate-400">Sarah Mitchell · BrightSmile Dental</p>
            </div>
            <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              ● In Progress
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 my-3 text-center">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Price</span>
              <span className="text-xs font-bold text-slate-900">₹62,000</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Progress</span>
              <span className="text-xs font-bold text-slate-900">65%</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Payment</span>
              <span className="text-xs font-bold text-amber-600">Pending</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] pt-1">
            <div className="bg-slate-50 p-2 rounded-lg text-slate-600 border border-slate-100">
              <span className="font-semibold text-slate-800">Sarah:</span> Can we also add dark mode to the booking section?
            </div>
            <div className="bg-slate-950 text-white p-2 rounded-lg ml-auto max-w-[85%] text-right font-medium">
              Yes, I&apos;ll include it in the next version.
            </div>
          </div>
        </div>
      </div>
    </AutoScroll>
  );
}

export function GaddamClinicSite() {
  return (
    <AutoScroll distance="72%" duration={30}>
      <div className="bg-[#FAF9F5] text-[#2C3E50] font-sans pb-8 min-h-[900px] relative text-left">
        {/* Grid lines */}
        <div className="absolute inset-0 blueprint-lines opacity-[0.04] pointer-events-none" />

        {/* Navbar */}
        <div className="bg-[#FAF9F5]/98 border-b border-stone-200/50 px-3 py-2.5 flex items-center justify-between sticky top-0 z-30 select-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[0.55rem]">🩺</span>
            <span className="font-extrabold text-[0.45rem] tracking-tight uppercase text-stone-800">Dr. Gaddam Clinic</span>
          </div>
          <button className="bg-emerald-600 text-white px-2.5 py-0.5 rounded text-[0.28rem] font-bold shadow-sm">
            Book Appointment
          </button>
        </div>

        {/* Hero Content */}
        <div className="px-4 pt-6 flex flex-col gap-2 text-left">
          <span className="inline-block bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[0.25rem] font-bold w-fit">
            ✦ Experienced Clinical Care & Consultation
          </span>
          <h1 className="text-sm font-black tracking-tight text-stone-900 leading-tight">
            Your Health. Our Mission.<br />
            <span className="text-emerald-600 font-extrabold">Professional Patient Care.</span>
          </h1>
          <p className="text-[0.35rem] leading-relaxed text-stone-500">
            Providing accessible, high-quality general healthcare services, direct scheduling, and video consultations.
          </p>
          <div className="flex gap-2 mt-1">
            <button className="bg-emerald-600 text-white px-3 py-1 rounded text-[0.28rem] font-bold shadow-sm">
              Schedule Visit
            </button>
            <button className="border border-stone-300 bg-white text-stone-600 px-3 py-1 rounded text-[0.28rem] font-bold">
              Video Consult →
            </button>
          </div>
          <div className="flex items-center gap-1 text-[0.26rem] text-stone-400 mt-1 select-none">
            <span className="text-amber-500">★★★★★</span>
            <span>4.9/5 patient rating (1200+ reviews)</span>
          </div>
        </div>

        {/* Vitals Monitor Display Card */}
        <div className="mt-5 mx-3">
          <div className="aspect-[1.5/1] w-full rounded-xl border border-stone-200/60 bg-white p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <span className="text-[0.28rem] font-bold text-stone-800">Health Vitals Monitor</span>
              <span className="text-[0.22rem] text-emerald-600 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="bg-stone-50 p-2 rounded border border-stone-100 flex flex-col">
                <span className="text-[0.22rem] text-stone-400 uppercase font-mono">Heart Rate</span>
                <span className="text-[0.45rem] font-bold text-stone-800 mt-0.5">72 bpm</span>
              </div>
              <div className="bg-stone-50 p-2 rounded border border-stone-100 flex flex-col">
                <span className="text-[0.22rem] text-stone-400 uppercase font-mono">SpO2</span>
                <span className="text-[0.45rem] font-bold text-emerald-600 mt-0.5">99%</span>
              </div>
            </div>
            <div className="text-[0.22rem] text-stone-400 text-center select-none pt-1">
              Synchronized via Patient Health Portal
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-6 px-3">
          <span className="text-[0.22rem] text-emerald-600 font-bold uppercase tracking-wider block mb-0.5">✦ Specialities</span>
          <h5 className="text-[0.32rem] font-black text-stone-800 mb-2.5">Clinical Services</h5>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border border-stone-200/50 p-2 rounded-lg text-[0.28rem]">
              <span className="font-bold text-stone-700 block leading-tight">General Checkup</span>
              <span className="text-[0.24rem] text-stone-400 block mt-0.5">Comprehensive consults</span>
            </div>
            <div className="bg-white border border-stone-200/50 p-2 rounded-lg text-[0.28rem]">
              <span className="font-bold text-stone-700 block leading-tight">Video Consultation</span>
              <span className="text-[0.24rem] text-stone-400 block mt-0.5">Remote diagnoses</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="mt-6 mx-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex flex-col gap-1 items-center select-none text-[0.28rem] text-center">
          <span className="text-[0.55rem]">💬</span>
          <span className="font-black text-stone-800 leading-tight">Quick WhatsApp Support</span>
          <p className="text-[0.24rem] text-stone-400">Direct booking and medical inquiries.</p>
          <button className="mt-1.5 bg-emerald-500 text-white px-3 py-1 rounded text-[0.26rem] font-bold shadow-sm">
            Chat Now
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-stone-200/50 pt-4 text-center select-none">
          <span className="text-[0.25rem] text-stone-400 font-medium">Dr. Gaddam Clinic · Health Services</span>
        </div>
      </div>
    </AutoScroll>
  );
}
