import { useState, useEffect, FormEvent } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Loader2, Check, Calendar, MessageCircle, AlertCircle } from "lucide-react";

// Mock Data
const treatments = [
  "Teeth Cleaning", "Filling", "Root Canal", "Extraction",
  "Braces", "Whitening", "Implants", "Veneers", "Kids Dentistry",
  "Consultation", "Full Exam Package", "Smile Makeover Package" // Added package names for pricing section compatibility
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

export default function AppointmentBooking() {
  const { ref, isVisible } = useScrollAnimation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    treatment: "",
    date: "",
    time: "",
    payment: "online",
    problem: "",
    doctor: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Listen for prefill events
  useEffect(() => {
    const handlePrefill = (e: CustomEvent) => {
      const { treatment, doctor, time } = e.detail;
      setFormData(prev => ({
        ...prev,
        treatment: treatment || prev.treatment,
        doctor: doctor || prev.doctor,
        time: time || prev.time
      }));

      // Focus effects would go here if needed, or handled by the caller scrolling
    };

    window.addEventListener('prefill-booking', handlePrefill as EventListener);
    return () => window.removeEventListener('prefill-booking', handlePrefill as EventListener);
  }, []);


  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";

    const ageNum = parseInt(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) newErrors.age = "Age must be 1-120";

    if (!formData.treatment) newErrors.treatment = "Please select a treatment";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time slot";

    // Date validation (No past, No Sunday)
    if (formData.date) {
      const d = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (d < today) newErrors.date = "Cannot book past dates";
      if (d.getDay() === 0) newErrors.date = "We are closed on Sundays";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const generateCalendarUrl = () => {
    const title = `DentCare Appointment: ${formData.treatment}`;
    const dateStr = formData.date.replace(/-/g, '');
    const details = `With ${formData.doctor || "Common Doctor"}. Problem: ${formData.problem}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${dateStr}/${dateStr}`;
  };

  return (
    <section id="booking" className="py-20 section-light" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`max-w-2xl mx-auto card-dentcare !rounded-3xl !p-8 md:!p-12 fade-up ${isVisible ? "visible" : ""}`}>
          {!submitted ? (
            <>
              <h2 className="font-heading text-3xl font-bold text-center mb-2">Book Your Appointment</h2>
              <p className="text-center text-muted-foreground mb-8">Fill in the details and we'll confirm via WhatsApp</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name *"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                    />
                    {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone Number *"
                      type="tel"
                      maxLength={10}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                    />
                    {errors.phone && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email (Optional)"
                      type="email"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                    />
                    {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <input
                      value={formData.age}
                      onChange={e => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Age *"
                      type="number"
                      min="1"
                      max="120"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                    />
                    {errors.age && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.age}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <select
                    value={formData.treatment}
                    onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.treatment ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                  >
                    <option value="">Select Treatment *</option>
                    {treatments.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.treatment && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.treatment}</p>}
                </div>

                {formData.doctor && (
                  <div className="text-sm text-primary font-medium bg-primary/5 p-2 rounded-lg border border-primary/20 text-center">
                    Selected Doctor: {formData.doctor}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.date ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                    />
                    {errors.date && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.date}</p>}
                  </div>

                  <div className="space-y-1">
                    <select
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.time ? 'border-destructive' : 'border-border'} bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition`}
                    >
                      <option value="">Select Time Slot *</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.time}</p>}
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={formData.payment === "online"}
                      onChange={e => setFormData({ ...formData, payment: e.target.value })}
                      className="accent-primary"
                    />
                    Online Payment
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="payment"
                      value="clinic"
                      checked={formData.payment === "clinic"}
                      onChange={e => setFormData({ ...formData, payment: e.target.value })}
                      className="accent-primary"
                    />
                    Pay At Clinic
                  </label>
                </div>

                {formData.payment === "online" && (
                  <p className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded">
                    Note: Pay securely after booking confirmation.
                  </p>
                )}

                <div className="relative">
                  <textarea
                    value={formData.problem}
                    onChange={e => {
                      if (e.target.value.length <= 300) setFormData({ ...formData, problem: e.target.value })
                    }}
                    placeholder="Describe your problem (Optional)..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">{formData.problem.length}/300</div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-pill-primary w-full text-base py-4 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Book My Appointment →"}
                </button>

                <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                  <span>🔒 Secure</span>
                  <span>📲 WhatsApp Confirm</span>
                  <span>🎟 Instant Token</span>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 space-y-6 animate-in zoom-in duration-300">
              <div className="relative mx-auto w-24 h-24">
                <svg className="w-full h-full text-green-500" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="stroke-current opacity-20" />
                  <path d="M30 52 L45 67 L72 35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                    className="drop-shadow-lg"
                    strokeDasharray="100"
                    strokeDashoffset="0"
                  >
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.6s" fill="freeze" />
                  </path>
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-3xl font-bold text-foreground">Booking Confirmed! 🎉</h3>
                <p className="text-lg text-muted-foreground">Your Token: <span className="font-bold text-primary text-xl">#18</span></p>
              </div>

              <div className="bg-secondary/30 p-4 rounded-2xl text-left space-y-2 text-sm">
                <p><strong>Doctor:</strong> {formData.doctor || "Assigned Specialist"}</p>
                <p><strong>Date:</strong> {formData.date} at {formData.time}</p>
                <p><strong>Treatment:</strong> {formData.treatment}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <a
                  href={generateCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-primary text-sm flex items-center justify-center gap-2"
                >
                  <Calendar size={16} /> Add to Calendar
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`I have booked an appointment at DentCare for ${formData.treatment} on ${formData.date} at ${formData.time}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-outline text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> Share on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
