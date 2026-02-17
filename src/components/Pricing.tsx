import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "₹499",
    desc: "Consultation + Checkup",
    features: ["Full Dental Checkup", "X-Ray (1 unit)", "Treatment Plan", "Cleaning Tips"],
    popular: false,
  },
  {
    name: "Complete",
    price: "₹1,499",
    desc: "Full Care Package",
    features: ["Everything in Basic", "Professional Cleaning", "Fluoride Treatment", "Follow-up Visit", "Priority Booking"],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹9,999",
    desc: "Annual Smile Plan",
    features: ["Everything in Complete", "2 Cleanings/Year", "Whitening Session", "Emergency Visits", "Family Discount 10%", "Priority Queue"],
    popular: false,
  },
];

type Tab = "Consultation" | "Treatments" | "Packages";

export default function Pricing() {
  const [tab, setTab] = useState<Tab>("Packages");
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pricing" className="py-20 section-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-2 fade-up ${isVisible ? "visible" : ""}`}>
          Transparent Pricing
        </h2>
        <p className={`text-center text-muted-foreground mb-8 fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
          No Hidden Charges
        </p>

        {/* Toggle */}
        <div className={`flex justify-center gap-1 bg-secondary rounded-full p-1 max-w-sm mx-auto mb-12 fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
          {(["Consultation", "Treatments", "Packages"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`relative card-dentcare text-center fade-up ${isVisible ? "visible" : ""} ${pkg.popular ? "!bg-primary !text-primary-foreground scale-105 border-0" : ""
                }`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-heading text-xl font-bold mb-1">{pkg.name}</h3>
              <p className={`text-sm mb-4 ${pkg.popular ? "opacity-80" : "text-muted-foreground"}`}>{pkg.desc}</p>
              <div className="text-4xl font-heading font-bold mb-6">{pkg.price}</div>
              <ul className="space-y-2 text-sm mb-6 text-left">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className={`w-4 h-4 flex-shrink-0 ${pkg.popular ? "text-accent" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  // Determine treatment/package name based on card
                  const treatmentName = pkg.name === "Basic" ? "Consultation" :
                    pkg.name === "Complete" ? "Full Exam Package" :
                      "Smile Makeover Package";

                  window.dispatchEvent(new CustomEvent('prefill-booking', {
                    detail: { treatment: treatmentName }
                  }));

                  const el = document.getElementById("booking");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      el.classList.add("highlight-glow");
                      setTimeout(() => el.classList.remove("highlight-glow"), 2000);
                    }, 500);
                  }
                }}
                className={`btn-pill w-full inline-block text-center cursor-pointer ${pkg.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : "btn-pill-primary"
                  }`}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
