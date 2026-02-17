import { useState, FormEvent } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Clock, Mail, CheckCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 section-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-10 fade-up ${isVisible ? "visible" : ""}`}>
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info + Form */}
          <div className={`space-y-8 fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
            <div className="space-y-4">
              <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                123 Smile Avenue, MG Road, Mumbai 400001
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                Mon–Sun: 9:00 AM – 8:00 PM
              </div>
              <a href="mailto:hello@dentcare.in" className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                hello@dentcare.in
              </a>

              <div className="flex gap-4 pt-2">
                {/* Social Icons Placeholder - as per prompt: Instagram, Facebook, WhatsApp */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">📸</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">fb</a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">💬</a>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Name *" required minLength={2} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                  <input placeholder="Phone *" required type="tel" pattern="\d{10}" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                </div>
                <input placeholder="Email *" required type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                <input placeholder="Subject *" required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                <div className="relative">
                  <textarea placeholder="Your message... (Min 20 chars)" required minLength={20} rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-pill-primary w-full flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce-slow" />
                <h3 className="text-2xl font-heading font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">We'll contact you within 2 hours. ✓</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-green-600 underline hover:text-green-800">Send another message</button>
              </div>
            )}
          </div>

          {/* Right — Map */}
          <div className={`fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
            <iframe
              title="DentCare Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755!2d72.8311!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              className="rounded-3xl border-0 min-h-[400px] shadow-lg"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
