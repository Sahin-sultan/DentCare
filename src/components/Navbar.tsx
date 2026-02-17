import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import DoctorStatusBadge from "@/components/DoctorStatusBadge";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Queue", href: "#queue" },
  { label: "Services", href: "#treatments" },
  { label: "Doctors", href: "#doctor" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Ref to track if we are currently manually scrolling to a section
  // This prevents the intersection observer from hijacking the active state during the scroll animation
  const isManualScrolling = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => {
        if (prev !== isScrolled) return isScrolled;
        return prev;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Middle of screen
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // If we are essentially "animating" to a section, ignore observer updates
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const targetId = href.replace("#", "");

    // 1. Set flag to disable observer updates
    isManualScrolling.current = true;

    // 2. Immediately update UI to show this as active
    setActiveSection(targetId);

    if (href === "#home" || href === "") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        if (href === "#booking") {
          setTimeout(() => {
            element.classList.add("highlight-glow");
            setTimeout(() => element.classList.remove("highlight-glow"), 2000);
          }, 500);
        }
      }
    }

    // 3. Reset flag after scroll animation roughly completes (1s is generous for smooth scroll)
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "nav-liquid py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          onClick={(e) => scrollToSection(e, "#home")}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-300 group-hover:rotate-12">
            <path d="M16 2C10 2 8 6 8 10c0 6 4 18 8 18s8-12 8-18c0-4-2-8-8-8z" className="fill-primary" />
            <path d="M12 6c-2 0-4 2-4 4 0 3 2 10 4 10" className="stroke-primary-foreground/50" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="font-heading text-xl font-bold text-foreground transition-colors duration-300">
            Dent<span className="text-primary">Care</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center p-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/70">
          <ul className="flex items-center relative gap-1">
            {navLinks.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <li key={l.href} className="relative z-10">
                  <a
                    href={l.href}
                    onClick={(e) => scrollToSection(e, l.href)}
                    className={cn(
                      "relative block px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 cursor-pointer select-none",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    )}
                  >
                    {/* Background Pill for Active State - Animated */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-primary rounded-full -z-10 transition-all duration-300 ease-spring",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      )}
                    />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <DoctorStatusBadge />
          <a
            href="#booking"
            className="btn-pill-primary text-sm whitespace-nowrap shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            onClick={(e) => scrollToSection(e, "#booking")}
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out h-[100dvh]",
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <button
          className="absolute top-6 right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full px-6 mb-8 max-w-sm">
          <DoctorStatusBadge mobile />
        </div>

        <nav className="flex flex-col items-center gap-4 w-full px-8 max-w-sm">
          {navLinks.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "text-2xl font-heading font-medium py-3 px-8 rounded-2xl w-full text-center transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:text-foreground active:bg-secondary/50"
                )}
                onClick={(e) => scrollToSection(e, l.href)}
              >
                {l.label}
              </a>
            )
          })}
        </nav>

        <a
          href="#booking"
          className="btn-pill-primary mt-10 w-64 text-center py-4 text-lg shadow-xl active:scale-95 transition-all"
          onClick={(e) => scrollToSection(e, "#booking")}
        >
          Book Appointment
        </a>
      </div>
    </nav>
  );
}
