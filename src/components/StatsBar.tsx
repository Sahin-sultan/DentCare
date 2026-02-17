import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { Users, Calendar, Clock, Award } from "lucide-react";

// stats data matching the prompt requirements
const stats = [
  { label: "Happy Patients", value: 5000, suffix: "+", icon: Users },
  { label: "Years Experience", value: 10, suffix: "+", icon: Calendar },
  { label: "Surgeries Done", value: 1500, suffix: "+", icon: Award },
  { label: "Expert Doctors", value: 8, suffix: "", icon: Clock },
];

export default function StatsBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative z-20 -mt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} index={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index, isVisible }: { stat: any; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div
      className={`
        relative p-6 rounded-3xl shadow-xl overflow-hidden bg-card text-card-foreground 
        transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
        fade-up border border-border
        ${isVisible ? "visible" : ""}
      `}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <stat.icon className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <div className="text-3xl md:text-4xl font-bold font-heading text-primary">
            {count}{stat.suffix}
          </div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
}
