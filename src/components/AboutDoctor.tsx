import doctorImg from "@/assets/doctor.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const achievements = [
  "15+ Years of Clinical Excellence",
  "Member — Indian Dental Association",
  "Published in International Journals",
  "Trained 50+ Junior Dentists",
  "Pioneer in Painless Dentistry",
];

const degrees = [
  { short: "BDS", long: "Bachelor of Dental Surgery — Manipal University" },
  { short: "MDS", long: "Master of Dental Surgery — Saveetha Dental College" },
  { short: "Fellowship", long: "Fellowship in Advanced Implantology — ICOI, USA" },
];

export default function AboutDoctor() {
  const { ref, isVisible } = useScrollAnimation();

  const handleBookDoctor = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('prefill-booking', { detail: { doctor: "Dr. Arjun Mehta" } });
    window.dispatchEvent(event);

    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        el.classList.add("highlight-glow");
        setTimeout(() => el.classList.remove("highlight-glow"), 2000);
      }, 500);
    }
  };

  return (
    <section id="doctor" className="py-20 section-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className={`relative fade-up ${isVisible ? "visible" : ""}`}>
            <div className="absolute -inset-6 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <img
                src={doctorImg}
                alt="Dr. Arjun Mehta — Lead Dentist at DentCare"
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 card-dentcare !p-3 !rounded-2xl text-xs font-semibold whitespace-nowrap">
                🎓 MDS — Prosthodontics
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <span className={`text-xs uppercase tracking-widest text-primary font-semibold fade-up ${isVisible ? "visible" : ""}`}>
              Meet Your Dentist
            </span>
            <h2 className={`font-heading text-3xl md:text-4xl font-bold fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
              Dr. Arjun Mehta
            </h2>
            <h3 className={`text-lg text-primary font-medium fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
              Prosthodontist & Implantologist
            </h3>
            <p className={`text-muted-foreground leading-relaxed fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
              With over 15 years of experience, Dr. Mehta combines clinical precision with a gentle, patient-first approach.
              He has treated 5,000+ patients and specializes in painless procedures, cosmetic dentistry, and dental implants.
            </p>

            <div className={`flex flex-wrap gap-2 fade-up stagger-3 ${isVisible ? "visible" : ""}`}>
              {degrees.map((d) => (
                <TooltipProvider key={d.short}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium cursor-help border border-transparent hover:border-primary/20 transition-colors">
                        {d.short}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{d.long}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <ul className={`space-y-2 fade-up stagger-4 ${isVisible ? "visible" : ""}`}>
              {achievements.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              onClick={handleBookDoctor}
              className={`btn-pill-primary inline-block fade-up stagger-5 ${isVisible ? "visible" : ""}`}
            >
              Book With Doctor →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
