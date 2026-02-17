import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const features = [
  {
    icon: "🦷",
    title: "Painless Dentistry",
    desc: "Advanced anesthesia techniques for zero discomfort",
    detail: "We utilize computer-controlled local anesthesia delivery systems (The Wand) and sedation dentistry options to ensure a completely pain-free experience for even the most anxious patients."
  },
  {
    icon: "⏰",
    title: "Flexible Timings",
    desc: "Open 7 days, early mornings & late evenings",
    detail: "We understand your busy schedule. That's why we're open from 7 AM to 9 PM every single day, including Sundays and public holidays, so you never have to miss work for dental care."
  },
  {
    icon: "🏥",
    title: "Modern Equipment",
    desc: "Latest digital X-rays, lasers & sterilization",
    detail: "Our clinic is equipped with OPG machines, intraoral cameras, and diode lasers. We follow strict 4-step sterilization protocols (CDC guidelines) to ensure 100% hygiene and safety."
  },
  {
    icon: "📲",
    title: "Online Booking",
    desc: "Book 24/7 and manage appointments online",
    detail: "Our seamless online portal lets you view real-time slot availability, book appointments, reschedule, and even pay online - all from the comfort of your home, anytime."
  },
  {
    icon: "💊",
    title: "Gentle Approach",
    desc: "Patient comfort is our top priority",
    detail: "Our doctors are trained in behavioral management and gentle handling techniques. We take the time to explain every procedure and ensure you are comfortable before proceeding."
  },
  {
    icon: "💰",
    title: "Affordable Care",
    desc: "Transparent pricing with EMI options available",
    detail: "No hidden costs. We provide a detailed treatment plan with costs upfront. We also offer 0% interest EMI options for major treatments to make quality care accessible to everyone."
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 section-light" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-2 fade-up ${isVisible ? "visible" : ""}`}>
          Why Choose DentCare
        </h2>
        <p className={`text-center text-muted-foreground mb-12 fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
          Experience the difference — Click cards for details
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <Popover key={f.title}>
              <PopoverTrigger asChild>
                <div
                  className={`card-dentcare text-center group cursor-pointer fade-up ${isVisible ? "visible" : ""} hover:border-primary/50`}
                  style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                  <h3 className="font-heading text-lg font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 text-sm text-foreground bg-card shadow-xl border border-border rounded-xl">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span>{f.icon}</span> {f.title}
                </h4>
                <p className="leading-relaxed text-muted-foreground">
                  {f.detail}
                </p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </section>
  );
}
