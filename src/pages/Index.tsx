import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import QueueTracker from "@/components/QueueTracker";
import Treatments from "@/components/Treatments";
import AboutDoctor from "@/components/AboutDoctor";
import AppointmentBooking from "@/components/AppointmentBooking";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import PostCareGuide from "@/components/PostCareGuide";
import WhyChooseUs from "@/components/WhyChooseUs";
import SpecialOffers from "@/components/SpecialOffers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FixedElements from "@/components/FixedElements";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FixedElements />
      <Navbar />
      <Hero />
      <StatsBar />
      <QueueTracker />
      <Treatments />
      <AboutDoctor />
      <AppointmentBooking />
      <Pricing />
      <Testimonials />
      <PostCareGuide />
      <WhyChooseUs />
      <SpecialOffers />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
