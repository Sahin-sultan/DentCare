import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Clock, IndianRupee } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = ["All", "General", "Cosmetic", "Orthodontics", "Surgery", "Pediatric"];

const treatments = [
  { name: "Teeth Cleaning", cat: "General", desc: "Professional scaling and polishing for healthy gums", dur: "30 min", price: "₹500", icon: "🦷", steps: ["Checkup", "Scaling", "Polishing", "Fluoride"], before: "Stained teeth", after: "Bright smile" },
  { name: "Filling", cat: "General", desc: "Composite resin fillings for cavities", dur: "45 min", price: "₹800", icon: "🔧", steps: ["Numbing", "Removal", "Filling", "Curing"], before: "Cavity spot", after: "Restored tooth" },
  { name: "Root Canal", cat: "General", desc: "Painless endodontic treatment to save your tooth", dur: "90 min", price: "₹3,000", icon: "💉", steps: ["X-Ray", "Cleaning", "Filling", "Crown"], before: "Infected pulp", after: "Saved tooth" },
  { name: "Extraction", cat: "Surgery", desc: "Safe and painless tooth removal procedure", dur: "30 min", price: "₹500", icon: "🏥", steps: ["Anesthesia", " loosening", "Removal", "Aftercare"], before: "Damaged tooth", after: "Healed gum" },
  { name: "Braces", cat: "Orthodontics", desc: "Metal and ceramic braces for alignment", dur: "12–18 mo", price: "₹25,000", icon: "😁", steps: ["Consult", "Bonding", "Adjustment", "Retention"], before: "Misaligned", after: "Perfect alignment" },
  { name: "Whitening", cat: "Cosmetic", desc: "Brighten your smile with laser whitening", dur: "60 min", price: "₹5,000", icon: "✨", steps: ["Cleaning", "Gel Application", "Laser", "Wash"], before: "Yellow tint", after: "White smile" },
  { name: "Implants", cat: "Surgery", desc: "Permanent titanium implants for missing teeth", dur: "2–3 mo", price: "₹20,000", icon: "🔩", steps: ["Consult", "Placement", "Healing", "Crown"], before: "Gap", after: "New tooth" },
  { name: "Veneers", cat: "Cosmetic", desc: "Custom porcelain veneers for a perfect look", dur: "2 visits", price: "₹8,000", icon: "💎", steps: ["Prep", "Impression", "Check", "Bonding"], before: "Chipped", after: "Flawless" },
  { name: "Kids Dentistry", cat: "Pediatric", desc: "Gentle, child-friendly dental care", dur: "30 min", price: "₹300", icon: "👶", steps: ["Fun Intro", "Checkup", "Cleaning", "Prize"], before: "Scared child", after: "Happy smile" },
];

export default function Treatments() {
  const [active, setActive] = useState("All");
  const { ref, isVisible } = useScrollAnimation();
  const filtered = active === "All" ? treatments : treatments.filter((t) => t.cat === active);

  const handleBook = (treatmentName: string) => {
    // Close modal by clicking the close button or programmatic way? 
    // Radix Dialog doesn't easily expose close without state control.
    // But we can just dispatch and let the user close or use controlled state.
    // I'll make the dialog controlled to close it.
  };

  return (
    <section id="treatments" className="py-20 section-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-4 fade-up ${isVisible ? "visible" : ""}`}>
          Our Treatments
        </h2>
        <p className={`text-center text-muted-foreground mb-10 fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
          Comprehensive dental care for the whole family
        </p>

        {/* Filter tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-primary/10"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => (
            <TreatmentCard key={t.name} treatment={t} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TreatmentCard({ treatment, index, isVisible }: { treatment: any; index: number; isVisible: boolean }) {
  const [open, setOpen] = useState(false);

  const handleBookNow = () => {
    setOpen(false); // Close modal

    // Dispatch event
    const event = new CustomEvent('prefill-booking', { detail: { treatment: treatment.name } });
    window.dispatchEvent(event);

    // Scroll
    setTimeout(() => {
      const el = document.getElementById("booking");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => el.classList.add("highlight-glow"), 500);
        setTimeout(() => el.classList.remove("highlight-glow"), 2500);
      }
    }, 300); // slight delay for modal close animation
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`card-dentcare group cursor-pointer fade-up ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
        >
          <div className="text-4xl mb-4 group-hover:rotate-[8deg] transition-transform duration-300">
            {treatment.icon}
          </div>
          <h3 className="font-heading text-lg font-semibold mb-1">{treatment.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{treatment.desc}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{treatment.dur}</span>
            <span className="font-bold text-primary">{treatment.price}</span>
          </div>
          <button className="mt-4 inline-block text-sm text-primary font-medium hover:underline text-left">
            Learn More →
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{treatment.icon}</span>
            <div>
              <DialogTitle className="text-2xl font-bold font-heading">{treatment.name}</DialogTitle>
              <span className="text-sm bg-secondary px-3 py-1 rounded-full text-muted-foreground">{treatment.cat}</span>
            </div>
          </div>
          <DialogDescription className="text-base text-foreground/80 mt-2">
            {treatment.desc}. This procedure involves advanced techniques to ensure maximum comfort and results.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 py-4">
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Procedure Steps</h4>
            <ul className="space-y-2">
              {treatment.steps.map((step: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                  {step}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{treatment.dur}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-primary text-lg">
                <IndianRupee className="w-4 h-4" />
                <span>{treatment.price}</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 p-6 rounded-2xl relative overflow-hidden">
            <h4 className="font-bold text-lg mb-4 text-center">Expected Results</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <div className="aspect-square rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-muted-foreground opacity-50">
                  Before
                </div>
                <span className="text-xs font-medium text-muted-foreground block">{treatment.before}</span>
              </div>
              <div className="space-y-2 relative">
                <div className="aspect-square rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary border-2 border-primary">
                  After
                </div>
                <span className="text-xs font-medium text-primary block">{treatment.after}</span>
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-card rounded-full p-1 shadow-sm z-10">
                  <Check className="w-3 h-3 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-2">
          <button onClick={() => setOpen(false)} className="btn-pill-outline text-sm">Close</button>
          <button onClick={handleBookNow} className="btn-pill-primary text-sm">Book This Treatment →</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
