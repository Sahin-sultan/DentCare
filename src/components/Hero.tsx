import heroImg from "@/assets/hero-patient.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-background">

      {/* Background Shapes */}
      {/* Large Blue Circle on Right - characteristic of the reference image */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] min-w-[600px] min-h-[600px] bg-primary rounded-full translate-x-1/4 -translate-y-1/4 opacity-10 blur-3xl lg:opacity-100 lg:blur-0 lg:translate-x-1/3 lg:-translate-y-1/3 lg:bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_hsl(215,90%,45%)_100%)] z-0" />

      {/* Abstract blobs for mobile softness */}
      <div className="lg:hidden absolute top-20 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="space-y-8 max-w-2xl relative">

            {/* Tag */}
            <div className={`
                inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-border shadow-sm 
                fade-up ${isVisible ? "visible" : ""}
            `}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-foreground tracking-wide uppercase">Healthcare Solutions</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className={`font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
                Healthcare <br />
                <span className="text-primary">Solutions</span>
              </h1>
              <p className={`text-lg sm:text-lg text-muted-foreground leading-relaxed max-w-md fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
                We provide the best dental services for you and your family. Experienced doctors and modern technology.
              </p>
            </div>

            {/* Actions */}
            <div className={`flex flex-col sm:flex-row gap-4 fade-up stagger-3 ${isVisible ? "visible" : ""}`}>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                  setTimeout(() => {
                    document.querySelector("#booking")?.classList.add("highlight-glow");
                    setTimeout(() => document.querySelector("#booking")?.classList.remove("highlight-glow"), 2000);
                  }, 500);
                }}
                className="btn-pill-primary flex items-center justify-center gap-2 h-14 px-8 text-base shadow-lg hover:shadow-primary/30"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#treatments"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#treatments")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-pill-outline flex items-center justify-center gap-2 h-14 px-8 text-base"
              >
                View Services
              </a>
            </div>

          </div>

          {/* Right Image Compositon */}
          <div className={`relative h-full min-h-[400px] flex items-center justify-center fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
            {/* 
                 To mimic the "Group of Doctors in a Circle" look without 3D assets:
                 I will use the main image, but clipped into a circle, 
                 placed on top of the large blue background shape.
              */}

            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-10 animate-bounce-slow text-4xl">💊</div>
              <div className="absolute bottom-20 left-0 animate-float text-4xl" style={{ animationDelay: '1s' }}>🦷</div>

              {/* Main Image Container - Circle Mask */}
              <div className="relative w-full h-full rounded-full border-[8px] border-white/50 shadow-2xl overflow-hidden bg-white">
                <img
                  src={heroImg}
                  alt="Doctor"
                  className="w-full h-full object-cover scale-110 translate-y-4"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating "Health" Badge */}
              <div className="absolute top-10 right-0 bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-1">
                  <ShieldCheck size={20} />
                </div>
              </div>

              {/* Floating "Rating" Badge */}
              <div className="absolute bottom-10 -left-4 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-float">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                </div>
                <div>
                  <div className="flex text-yellow-400 text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
