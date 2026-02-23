import { useState, FormEvent, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CalendarDays, Clock, User, Phone, Stethoscope, CheckCircle, Loader2, Sparkles } from "lucide-react";

const treatments = [
    "Teeth Cleaning",
    "Teeth Whitening",
    "Dental Implants",
    "Braces / Aligners",
    "Root Canal",
    "Tooth Extraction",
    "Cavity Filling",
    "Crown & Bridge",
    "Other / Consultation",
];

const doctors = ["Dr. Arjun Mehta", "Dr. Priya Sharma", "Any Available Doctor"];

const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM",
];

export default function BookingForm() {
    const { ref, isVisible } = useScrollAnimation();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        treatment: "",
        doctor: "",
        date: "",
        time: "",
    });

    // Listen for prefill events from other sections (Treatments, Pricing, etc.)
    useEffect(() => {
        const handler = (e: CustomEvent) => {
            if (e.detail?.treatment) setForm(f => ({ ...f, treatment: e.detail.treatment }));
            if (e.detail?.doctor) setForm(f => ({ ...f, doctor: e.detail.doctor }));
        };
        window.addEventListener("prefill-booking" as any, handler as EventListener);
        return () => window.removeEventListener("prefill-booking" as any, handler as EventListener);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1800);
    };

    // Get today's date in yyyy-mm-dd for min attribute
    const today = new Date().toISOString().split("T")[0];

    return (
        <section id="booking" className="relative py-24 overflow-hidden" ref={ref}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 z-0" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-0" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className={`text-center mb-12 fade-up ${isVisible ? "visible" : ""}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />
                        Easy Online Booking
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Book an <span className="text-primary">Appointment</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Schedule your visit in under 60 seconds. We'll confirm within 2 hours.
                    </p>
                </div>

                {/* Card */}
                <div className={`max-w-2xl mx-auto fade-up stagger-1 ${isVisible ? "visible" : ""}`}>
                    {!submitted ? (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white/80 backdrop-blur-sm border border-white/60 shadow-2xl shadow-primary/10 rounded-3xl p-8 md:p-10 space-y-6"
                        >
                            {/* Row 1 — Name & Phone */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-primary" /> Full Name
                                    </label>
                                    <input
                                        required
                                        minLength={2}
                                        placeholder="e.g. Rahul Sharma"
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        pattern="\d{10}"
                                        placeholder="10-digit number"
                                        value={form.phone}
                                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Row 2 — Treatment */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide flex items-center gap-1.5">
                                    <Stethoscope className="w-3.5 h-3.5 text-primary" /> Treatment Needed
                                </label>
                                <select
                                    required
                                    value={form.treatment}
                                    onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200 cursor-pointer"
                                >
                                    <option value="">Select a treatment...</option>
                                    {treatments.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Row 3 — Doctor */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-primary" /> Preferred Doctor
                                </label>
                                <select
                                    required
                                    value={form.doctor}
                                    onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200 cursor-pointer"
                                >
                                    <option value="">Select a doctor...</option>
                                    {doctors.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Row 4 — Date & Time */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide flex items-center gap-1.5">
                                        <CalendarDays className="w-3.5 h-3.5 text-primary" /> Preferred Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        min={today}
                                        value={form.date}
                                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200 cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-primary" /> Preferred Time
                                    </label>
                                    <select
                                        required
                                        value={form.time}
                                        onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200 cursor-pointer"
                                    >
                                        <option value="">Select a time slot...</option>
                                        {timeSlots.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-pill-primary w-full h-14 text-base font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Booking your appointment...
                                    </>
                                ) : (
                                    <>
                                        <CalendarDays className="w-5 h-5" />
                                        Confirm Appointment
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-muted-foreground">
                                🔒 Your information is secure. We'll call to confirm within 2 hours.
                            </p>
                        </form>
                    ) : (
                        /* Success State */
                        <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-2xl rounded-3xl p-10 text-center space-y-5 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                                    Appointment Requested! 🎉
                                </h3>
                                <p className="text-muted-foreground">
                                    Thank you, <strong>{form.name}</strong>! We've received your request for{" "}
                                    <strong>{form.treatment}</strong> on <strong>{form.date}</strong> at{" "}
                                    <strong>{form.time}</strong>.
                                </p>
                                <p className="text-sm text-muted-foreground mt-3">
                                    We'll call <strong>{form.phone}</strong> to confirm within 2 hours.
                                </p>
                            </div>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", treatment: "", doctor: "", date: "", time: "" }); }}
                                className="btn-pill-outline text-sm"
                            >
                                Book Another Appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
