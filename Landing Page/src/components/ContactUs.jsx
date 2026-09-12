import { useState } from "react";
import { FadeInUp, SlideIn } from "../utils/animations";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  Globe,
  GraduationCap,
  Building2,
  Users,
  BookOpen,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Contact Data ─── */
const contactInfo = [
  {
    icon: <MapPin size={22} />,
    label: " Address",
    value: "F2/A, Chandaka Industrial Estate,\nIn front of Infocity, Chandrasekharpur,\nBhubaneswar, Odisha – 751024",
    href: "https://maps.google.com/?q=Trident+Academy+of+Technology+Bhubaneswar",
    color: "#E8BD63",
  },
  {
    icon: <Phone size={22} />,
    label: "Phone",
    value: "0674-3530517\n+91 98611 91195",
    href: "tel:+919861191195",
    color: "#3EA644",
  },
  {
    icon: <Mail size={22} />,
    label: "Email",
    value: "info@trident.ac.in",
    href: "mailto:info@trident.ac.in",
    color: "#2E6DB4",
  },
  {
    icon: <Clock size={22} />,
    label: "Office Hours",
    value: "Mon – Sat: 9:00 AM – 5:00 PM\nSun: Closed",
    href: null,
    color: "#C41E3A",
  },
];

const departments = [
  { name: "Admissions Office", phone: "+91 98611 91195", email: "admissions@trident.ac.in", icon: <GraduationCap size={18} /> },
  { name: "Placement Cell", phone: "+91 70084 43255", email: "placements@trident.ac.in", icon: <Building2 size={18} /> },
  { name: "Examination Cell", phone: "0674-3530517", email: "exam@trident.ac.in", icon: <BookOpen size={18} /> },
  { name: "Alumni Relations", phone: "+91 98611 91195", email: "alumni@trident.ac.in", icon: <Users size={18} /> },
];

const quickLinks = [
  { label: "Admissions Portal", href: "https://admissions-tat.tekkzy.com" },
  { label: "Placement Reports", href: "https://placement-tat.tekkzy.com" },
  { label: "Campus Life", href: "https://campuslife-tat.tekkzy.com/" },
  { label: "Research & Innovation", href: "https://research-tat.tekkzy.com" },
  { label: "Alumni Network", href: "https://alumni-tat.tekkzy.com/" },
  { label: "Academic Calendar", href: "https://academics-tat.tekkzy.com/calenders/" },
];

/* ─── Component ─── */
export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    department: "General Inquiry",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sgemn43u4xfdset5xxdjjzsn3i0kgjrj.lambda-url.us-east-1.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `[Subject: ${formData.subject}] [Department: ${formData.department}] ${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", department: "General Inquiry" });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "#0B1120" }}>
      {/* ── Decorative geometry ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#283B91]/15 rotate-45 hidden md:block" />
        <div className="absolute top-[30%] left-[2%] w-56 h-56 rounded-full bg-[#E8BD63]/[0.04] hidden md:block" />
        <div className="absolute bottom-[20%] right-[5%] w-32 h-32 bg-[#C41E3A]/[0.04] rotate-45 hidden md:block" />
        <div className="absolute top-0 left-[25%] w-px h-72 bg-gradient-to-b from-[#E8BD63]/15 to-transparent hidden md:block" />
        <div className="absolute bottom-0 right-[20%] w-px h-48 bg-gradient-to-t from-[#283B91]/20 to-transparent hidden md:block" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Top tri-color accent */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-0">
        <div className="h-[3px] flex-1 bg-[#E8BD63]" />
        <div className="h-[3px] flex-1 bg-[#C41E3A]" />
        <div className="h-[3px] flex-1 bg-[#2E6DB4]" />
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — Hero Header                                    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SlideIn direction="right">
            <div className="inline-flex items-center gap-3 border border-white/15 text-white/70 text-[11px] font-medium uppercase tracking-[0.35em] px-8 py-3 rounded-full mb-10 bg-white/5 backdrop-blur-sm">
              <span
                className="w-2 h-2 rounded-full bg-[#3EA644]"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              Get in Touch
            </div>
          </SlideIn>

          <FadeInUp delay={100}>
            <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
              We'd love to{" "}
              <br className="hidden md:block" />
              <span className="italic text-[#E8BD63]">hear from you.</span>
            </h2>
          </FadeInUp>

          <FadeInUp delay={250}>
            <p className="text-white/45 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Whether you're a prospective student, parent, or industry partner — our doors are always open. Reach out and let's start a conversation.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — Contact Cards                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((c, i) => (
            <FadeInUp key={c.label} delay={100 + i * 100}>
              <a
                href={c.href || "#contact"}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-2xl block h-full"
              >
                {/* Colored top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500" style={{ backgroundColor: c.color }} />
                {/* Corner triangle */}
                <div className="absolute top-0 right-0 w-0 h-0" style={{ borderLeft: "35px solid transparent", borderTop: `35px solid ${c.color}` }} />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${c.color}15`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">{c.label}</div>
                <div className="text-white/80 text-[15px] font-medium leading-relaxed whitespace-pre-line">{c.value}</div>
              </a>
            </FadeInUp>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — Form + Map                                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Contact Form ── */}
          <FadeInUp delay={200} className="lg:col-span-7">
            <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
              {/* Side accent */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#E8BD63] via-[#C41E3A] to-[#2E6DB4]" />
              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#E8BD63]/15 hidden md:block" />
              <div className="absolute bottom-4 left-8 w-8 h-8 border-b border-l border-[#283B91]/15 hidden md:block" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-[2px] w-10" style={{ background: "linear-gradient(90deg, #E8BD63, transparent)" }} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">Send a Message</span>
                </div>
                <h3 className="serif text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
                  Drop us a <span className="italic text-[#E8BD63]">line.</span>
                </h3>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#3EA644]/20 flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-[#3EA644]" />
                    </div>
                    <h4 className="serif text-2xl font-bold text-white mb-3">Message Sent!</h4>
                    <p className="text-white/50 text-sm font-medium max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="relative">
                        <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">
                          Full Name <span className="text-[#C41E3A]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 rounded-xl outline-none transition-all duration-300"
                          style={{
                            borderColor: focusedField === "name" ? "#E8BD63" : undefined,
                            boxShadow: focusedField === "name" ? "0 0 0 3px rgba(232,189,99,0.1)" : undefined,
                          }}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">
                          Email Address <span className="text-[#C41E3A]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 rounded-xl outline-none transition-all duration-300"
                          style={{
                            borderColor: focusedField === "email" ? "#E8BD63" : undefined,
                            boxShadow: focusedField === "email" ? "0 0 0 3px rgba(232,189,99,0.1)" : undefined,
                          }}
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 rounded-xl outline-none transition-all duration-300"
                          style={{
                            borderColor: focusedField === "phone" ? "#E8BD63" : undefined,
                            boxShadow: focusedField === "phone" ? "0 0 0 3px rgba(232,189,99,0.1)" : undefined,
                          }}
                          placeholder="+91 98XXX XXXXX"
                        />
                      </div>

                      {/* Department */}
                      <div className="relative">
                        <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("department")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white/5 border border-white/10 text-white/80 px-5 py-4 rounded-xl outline-none transition-all duration-300 appearance-none cursor-pointer"
                          style={{
                            borderColor: focusedField === "department" ? "#E8BD63" : undefined,
                            boxShadow: focusedField === "department" ? "0 0 0 3px rgba(232,189,99,0.1)" : undefined,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 16px center",
                          }}
                        >
                          <option value="General Inquiry" style={{ background: "#1a1a2e" }}>General Inquiry</option>
                          <option value="Admissions" style={{ background: "#1a1a2e" }}>Admissions</option>
                          <option value="Placements" style={{ background: "#1a1a2e" }}>Placements</option>
                          <option value="Academics" style={{ background: "#1a1a2e" }}>Academics</option>
                          <option value="Research" style={{ background: "#1a1a2e" }}>Research</option>
                          <option value="Alumni" style={{ background: "#1a1a2e" }}>Alumni Relations</option>
                          <option value="Other" style={{ background: "#1a1a2e" }}>Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="relative">
                      <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">
                        Subject <span className="text-[#C41E3A]">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 rounded-xl outline-none transition-all duration-300"
                        style={{
                          borderColor: focusedField === "subject" ? "#E8BD63" : undefined,
                          boxShadow: focusedField === "subject" ? "0 0 0 3px rgba(232,189,99,0.1)" : undefined,
                        }}
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-2">
                        Message <span className="text-[#C41E3A]">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 rounded-xl outline-none transition-all duration-300 resize-none"
                        style={{
                          borderColor: focusedField === "message" ? "#E8BD63" : undefined,
                          boxShadow: focusedField === "message" ? "0 0 0 3px rgba(232,189,99,0.1)" : undefined,
                        }}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-white/20 text-[10px] font-medium uppercase tracking-widest hidden sm:block">
                        <span className="text-[#C41E3A]">*</span> Required fields
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 bg-[#E8BD63] text-[#0B1120] px-10 py-4 rounded-xl font-medium text-[13px] uppercase tracking-widest shadow-xl hover:bg-[#F0D080] hover:-translate-y-1 transition-all duration-500"
                      >
                        Send Message
                        <Send size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </FadeInUp>

          {/* ── Map + Quick Access ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Google Maps Embed */}
            <FadeInUp delay={300}>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: "320px" }}>
                <iframe
                  title="Trident Academy of Technology Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0025!2d85.8148!3d20.3350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190900125b0001%3A0x2fa5a1248e5084a4!2sTrident%20Academy%20of%20Technology!5e0!3m2!1sen!2sin!4v1711900000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "saturate(0.7) contrast(1.1) brightness(0.7)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Map overlay badge */}
                <div className="absolute bottom-4 left-4 bg-[#0B1120]/90 backdrop-blur-md text-white px-5 py-3 rounded-xl border border-white/10">
                  <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E8BD63] mb-1">Campus Location</div>
                  <div className="text-[13px] font-medium text-white/80">Chandrasekharpur, Bhubaneswar</div>
                </div>
              </div>
            </FadeInUp>

            {/* Department Contacts */}
            <FadeInUp delay={400}>
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-7 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8BD63] via-[#C41E3A] to-[#2E6DB4]" />
                <h4 className="serif text-xl font-bold text-white mb-5">
                  Department <span className="text-[#E8BD63]">Contacts</span>
                </h4>
                <div className="space-y-3">
                  {departments.map((d, i) => (
                    <div
                      key={d.name}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-default"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#283B91]/30 flex items-center justify-center text-[#E8BD63] flex-shrink-0 group-hover:bg-[#283B91]/50 transition-colors">
                        {d.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white/90 text-[14px] font-medium truncate">{d.name}</div>
                        <div className="text-white/40 text-[12px] font-medium truncate">{d.phone}</div>
                      </div>
                      <a
                        href={`mailto:${d.email}`}
                        className="text-[#E8BD63] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — Quick Links Bar                                */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <FadeInUp delay={200}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={18} className="text-[#E8BD63]" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">Quick Links</span>
                </div>
                <h4 className="serif text-2xl font-bold text-white">
                  Explore <span className="italic text-[#E8BD63]">more.</span>
                </h4>
              </div>

              <div className="flex flex-wrap gap-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 bg-white/5 hover:bg-[#E8BD63] border border-white/10 hover:border-[#E8BD63] text-white/70 hover:text-[#0B1120] px-5 py-2.5 rounded-full text-[12px] font-medium uppercase tracking-wider transition-all duration-400 hover:-translate-y-0.5"
                  >
                    {link.label}
                    <ChevronRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* ── CTA Strip ── */}
      <div className="relative z-10 border-t border-white/5 bg-[#283B91]/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <FadeInUp delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="serif text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready to join <span className="italic text-[#E8BD63]">Trident?</span>
                </h4>
                <p className="text-white/40 text-sm font-medium">Begin your application today and take the first step towards an extraordinary career.</p>
              </div>
              <a
                href="https://admissions-tat.tekkzy.com"
                className="group inline-flex items-center gap-3 bg-[#E8BD63] text-[#0B1120] px-10 py-4 rounded-full font-medium text-[13px] uppercase tracking-widest shadow-xl hover:bg-[#F0D080] hover:-translate-y-1 transition-all duration-500 whitespace-nowrap"
              >
                Apply Now
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Bottom tri-color accent */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-0">
        <div className="h-[3px] flex-1 bg-[#2E6DB4]" />
        <div className="h-[3px] flex-1 bg-[#C41E3A]" />
        <div className="h-[3px] flex-1 bg-[#E8BD63]" />
      </div>
    </section>
  );
}
