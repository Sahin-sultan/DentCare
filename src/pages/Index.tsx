import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Treatments from "@/components/Treatments";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutDoctor from "@/components/AboutDoctor";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import SpecialOffers from "@/components/SpecialOffers";
import QueueTracker from "@/components/QueueTracker";
import PostCareGuide from "@/components/PostCareGuide";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FixedElements from "@/components/FixedElements";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <Treatments />
      <WhyChooseUs />
      <AboutDoctor />
      <Testimonials />
      <Pricing />
      <SpecialOffers />
      <QueueTracker />
      <PostCareGuide />
      <Contact />
      <Footer />
      <FixedElements />
    </div>
  );
};

export default Index;
