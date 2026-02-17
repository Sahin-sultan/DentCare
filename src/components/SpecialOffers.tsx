import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SpecialOffers() {
  const { ref, isVisible } = useScrollAnimation();

  const handleBook = (e: React.MouseEvent, type: 'happy-hour' | 'online') => {
    e.preventDefault();

    const detail: any = {};
    if (type === 'happy-hour') {
      detail.time = "11:00 AM";
    }

    window.dispatchEvent(new CustomEvent('prefill-booking', { detail }));

    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        el.classList.add("highlight-glow");
        setTimeout(() => el.classList.remove("highlight-glow"), 2000);

        // Focus first input
        const input = el.querySelector('input');
        if (input) input.focus();
      }, 500);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-10 fade-up ${isVisible ? "visible" : ""}`}>
          Special Offers
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className={`bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-8 text-primary-foreground fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
            <div className="text-3xl mb-3">🕐</div>
            <h3 className="font-heading text-xl font-bold mb-2">Happy Hours</h3>
            <p className="text-sm opacity-90 mb-4">10% off all treatments between 11 AM – 2 PM. Walk-ins welcome!</p>
            <a
              href="#booking"
              onClick={(e) => handleBook(e, 'happy-hour')}
              className="btn-pill bg-accent text-accent-foreground hover:bg-accent/90 inline-block cursor-pointer"
            >
              Book Happy Hours →
            </a>
          </div>

          <div className={`bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-8 text-primary-foreground fade-up stagger-2 ${isVisible ? "visible" : ""}`}>
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-heading text-xl font-bold mb-2">Book Online & Save 5%</h3>
            <p className="text-sm opacity-90 mb-4">Get an instant 5% discount when you book your appointment online.</p>
            <a
              href="#booking"
              onClick={(e) => handleBook(e, 'online')}
              className="btn-pill bg-accent text-accent-foreground hover:bg-accent/90 inline-block cursor-pointer"
            >
              Book Online →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
