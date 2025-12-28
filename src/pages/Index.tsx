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
        title="Armtemiy — Программы и тренировки по армрестлингу | Тренер в Туле"
        description="Всё об армрестлинге — от техники до готовых программ. Персональные тренировки в Туле. Систематизированные знания от топовых рукоборцев."
        keywords="армрестлинг, тренировки, техника армрестлинга, программа тренировок, Тула, рукоборье, тренер по армрестлингу"
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
