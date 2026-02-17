import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";

const guides = [
  {
    title: "After Extraction",
    dos: ["Bite on gauze for 30 minutes", "Apply ice pack on cheek", "Eat soft foods for 24 hours"],
    donts: ["Don't spit or rinse vigorously", "Don't drink with a straw", "Don't smoke for 48 hours"],
    meds: "Ibuprofen 400mg every 6 hours as needed",
    warning: "If bleeding persists after 4 hours, contact us immediately.",
  },
  {
    title: "After Root Canal",
    dos: ["Take prescribed medication on time", "Eat on the opposite side", "Maintain oral hygiene"],
    donts: ["Don't chew hard foods on treated tooth", "Don't skip the crown appointment", "Don't ignore pain after 3 days"],
    meds: "Antibiotics + Painkiller as prescribed",
    warning: "Slight discomfort is normal. Severe swelling or fever requires immediate attention.",
  },
  {
    title: "After Whitening",
    dos: ["Drink through a straw", "Eat white foods for 48 hours", "Use sensitivity toothpaste"],
    donts: ["No coffee, tea, or red wine for 48h", "No colored sauces or berries", "Don't smoke"],
    meds: "Sensitivity gel if needed",
    warning: "Extreme sensitivity lasting more than a week should be reported.",
  },
  {
    title: "With Braces",
    dos: ["Brush after every meal", "Use interdental brushes", "Attend regular adjustments"],
    donts: ["No sticky or hard candy", "No biting into apples or corn directly", "Don't skip appointments"],
    meds: "Wax for bracket irritation",
    warning: "Loose bracket or wire poking? Call us for an urgent appointment.",
  },
  {
    title: "After Implants",
    dos: ["Follow a soft diet for 2 weeks", "Rinse with warm salt water", "Take antibiotics as prescribed"],
    donts: ["Don't touch the implant site", "No vigorous exercise for 48h", "Don't smoke"],
    meds: "Antibiotics + Anti-inflammatory as prescribed",
    warning: "Implant feeling loose or unusual pain? Contact us immediately.",
  },
  {
    title: "General Hygiene",
    dos: ["Brush twice daily for 2 minutes", "Floss once daily", "Visit dentist every 6 months"],
    donts: ["Don't use hard-bristled toothbrush", "Don't skip flossing", "Don't ignore bleeding gums"],
    meds: "Fluoride mouthwash recommended",
    warning: "Persistent bad breath or bleeding gums may indicate gum disease.",
  },
];

export default function PostCareGuide() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 section-white" ref={ref}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-2 fade-up ${isVisible ? "visible" : ""}`}>
          Post-Treatment Care
        </h2>
        <p className={`text-center text-muted-foreground mb-10 fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
          Follow these instructions for a smooth recovery
        </p>

        <div className="space-y-3">
          {guides.map((g, i) => (
            <div
              key={g.title}
              className={`card-dentcare !p-0 overflow-hidden fade-up ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading text-lg font-semibold">{g.title}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "600px" : "0" }}
              >
                <div className="px-5 pb-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">✓ Do's</h4>
                    <ul className="space-y-1">
                      {g.dos.map((d) => (
                        <li key={d} className="text-sm text-foreground flex gap-2">
                          <span className="text-primary">✓</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-destructive mb-2">✗ Don'ts</h4>
                    <ul className="space-y-1">
                      {g.donts.map((d) => (
                        <li key={d} className="text-sm text-foreground flex gap-2">
                          <span className="text-destructive">✗</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">💊 Medicines</h4>
                    <p className="text-sm text-muted-foreground">{g.meds}</p>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-3">
                    <p className="text-sm text-foreground">⚠️ {g.warning}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
