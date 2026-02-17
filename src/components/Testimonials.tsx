import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Add Autoplay type definition
// Note: We might need to install embla-carousel-autoplay, checking package.json...
// package.json doesn't show "embla-carousel-autoplay".
// If not installed, I should stick to manual or simple interval.
// Wait, user prompt says "Carousel auto-scrolls infinitely".
// Without the plugin, I can use a simple useEffect to scrollNext.
// Or I can just check if I can use the basic Autoplay if available or just basic JS.
// I will assume basics first. If no autoplay plugin, I'll write a small custom useEffect.

const testimonials = [
  { name: "Priya Sharma", treatment: "Teeth Whitening", date: "Jan 2025", quote: "My smile has never looked better! The team was so gentle and professional." },
  { name: "Raj Patel", treatment: "Root Canal", date: "Dec 2024", quote: "I was terrified of root canals but Dr. Mehta made it completely painless. Highly recommend!" },
  { name: "Anita Desai", treatment: "Braces", date: "Nov 2024", quote: "My daughter's braces journey has been wonderful. The staff is incredibly patient with kids." },
  { name: "Vikram Singh", treatment: "Implants", date: "Oct 2024", quote: "Best dental implant experience. The results are natural-looking and comfortable." },
  { name: "Meera Joshi", treatment: "Cleaning", date: "Feb 2025", quote: "Regular cleanings here keep my teeth perfect. Love the modern clinic and friendly staff!" },
  { name: "Arjun Nair", treatment: "Veneers", date: "Jan 2025", quote: "The veneers look absolutely natural. Couldn't be happier with the transformation!" },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll simulation
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [emblaApi, isPlaying]);

  return (
    <section className="py-20 section-light overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 mb-10">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center mb-2 fade-up ${isVisible ? "visible" : ""}`}>
          What Our Patients Say
        </h2>
        <p className={`text-center text-muted-foreground fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
          Real stories from real smiles
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative max-w-5xl mx-auto px-12"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 min-w-0">
                <div className="card-dentcare h-full flex flex-col p-6 md:p-8">
                  <div className="text-primary mb-4 opacity-20">
                    <Quote size={40} />
                  </div>
                  <p className="text-foreground mb-6 italic flex-grow text-lg leading-relaxed">"{t.quote}"</p>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground font-medium">{t.treatment}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-border"
          aria-label="Previous"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-border"
          aria-label="Next"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${selectedIndex === i ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30 hover:bg-primary/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className={`text-center mt-12 fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
        <span className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-2 shadow-sm border border-border text-sm font-medium">
          ⭐ <strong>4.9/5</strong> · 230+ Google Reviews
        </span>
      </div>
    </section>
  );
}
