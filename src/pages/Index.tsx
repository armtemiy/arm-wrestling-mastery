import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ProgramSection from "@/components/landing/ProgramSection";
import TrainingSection from "@/components/landing/TrainingSection";
import LeadMagnetSection from "@/components/landing/LeadMagnetSection";
import AboutSection from "@/components/landing/AboutSection";
import MarqueeTicker from "@/components/landing/MarqueeTicker";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="Armtemiy Lab — диагностика и инструменты для армрестлинга | Тула"
        description="Armtemiy Lab — мини-приложение в Telegram: быстрый разбор поражений, понятные рекомендации и инструменты для армрестлера."
        keywords="армрестлинг, Armtemiy Lab, диагностика, разбор поражений, техника армрестлинга, тренировки, Тула"
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ProgramSection />
        <TrainingSection />
        <LeadMagnetSection />
        <AboutSection />
        <MarqueeTicker />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
