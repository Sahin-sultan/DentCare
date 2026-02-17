import { Mail } from "lucide-react";
import { FormEvent } from "react";

const quickLinks = ["Home", "Services", "Doctors", "Pricing", "Queue", "Book Appointment"];
const services = ["Teeth Cleaning", "Root Canal", "Braces", "Whitening", "Implants", "Kids Dentistry"];

export default function Footer() {
  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    alert("Subscribed! Thank you.");
  };

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C10 2 8 6 8 10c0 6 4 18 8 18s8-12 8-18c0-4-2-8-8-8z" fill="hsl(170,52%,44%)" />
              </svg>
              <span className="font-heading text-lg font-bold">DentCare</span>
            </div>
            <p className="text-sm opacity-70 mb-4">
              Premium dental care with a gentle touch. Your smile is our passion.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "Twitter"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-xs hover:bg-primary/30 transition" aria-label={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s+/g, "")}`} className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#treatments" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-70 mb-4">Get dental tips & exclusive offers</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <span>© 2025 DentCare. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-100 transition">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
