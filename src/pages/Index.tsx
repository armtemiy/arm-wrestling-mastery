import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProgramSection from "@/components/landing/ProgramSection";
import TrainingSection from "@/components/landing/TrainingSection";
import AboutSection from "@/components/landing/AboutSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="Armtemiy — Побеждай за столом, а не гадай как | Армрестлинг Тула"
        description="Готовая система тренировок и техники армрестлинга. Без YouTube-мусора и догадок — только проверенные методы. Персональные тренировки в Туле."
        keywords="армрестлинг, тренировки армрестлинг, техника армрестлинга, программа тренировок, армрестлинг Тула, как побеждать в армрестлинге"
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <ProgramSection />
        <TrainingSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
