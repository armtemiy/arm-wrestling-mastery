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
        title="Armtemiy — Выигрывай борьбу, а не надейся на удачу | Армрестлинг Тула"
        description="Система тренировок и техники армрестлинга. Без догадок — только методы, которые работают. Персональные тренировки в Туле."
        keywords="армрестлинг, тренировки армрестлинг, техника армрестлинга, программа тренировок, армрестлинг Тула, как побеждать в армрестлинге"
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
