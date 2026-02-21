import { Suspense, lazy } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ConsultationSection from "@/components/landing/ConsultationSection";
import { SEO } from "@/components/SEO";

const ProgramSection = lazy(() => import("@/components/landing/ProgramSection"));
const AboutSection = lazy(() => import("@/components/landing/AboutSection"));
const MarqueeTicker = lazy(() => import("@/components/landing/MarqueeTicker"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

interface LazySectionFallbackProps {
  id?: string;
  className: string;
}

const LazySectionFallback = ({ id, className }: LazySectionFallbackProps) => {
  return (
    <section id={id} className={className} aria-hidden="true">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl animate-pulse space-y-4 sm:space-y-6">
          <div className="h-6 w-32 rounded-full bg-white/10" />
          <div className="h-10 w-3/4 rounded-xl bg-white/10" />
          <div className="h-5 w-full rounded-lg bg-white/5" />
          <div className="h-5 w-5/6 rounded-lg bg-white/5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
            <div className="h-40 sm:h-48 rounded-2xl bg-white/5" />
            <div className="h-40 sm:h-48 rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

const MarqueeFallback = () => {
  return (
    <div className="w-full bg-background py-6 sm:py-8 min-h-[110px] sm:min-h-[130px]" aria-hidden="true">
      <div className="container mx-auto px-4">
        <div className="h-12 sm:h-14 rounded-xl bg-white/5 animate-pulse" />
      </div>
    </div>
  );
};

const FooterFallback = () => {
  return (
    <div className="bg-background min-h-[520px] md:min-h-[420px] lg:min-h-[360px]" aria-hidden="true">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-4xl rounded-2xl sm:rounded-3xl border border-border/60 bg-card/30 p-6 sm:p-8 md:p-10 animate-pulse space-y-6">
          <div className="h-8 w-40 rounded-lg bg-white/10" />
          <div className="h-4 w-full rounded bg-white/5" />
          <div className="h-4 w-4/5 rounded bg-white/5" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-20 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <>
      <SEO
        title="Armtemiy Lab — диагностика и инструменты для армрестлинга | Тула"
        description="Armtemiy Lab — мини-приложение в Telegram: быстрый разбор поражений, понятные рекомендации и инструменты для армрестлера. Крафтовые консультации по технике и программе."
        keywords="армрестлинг, Armtemiy Lab, диагностика, разбор поражений, техника армрестлинга, консультация, тренировочная программа, Тула"
      />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ConsultationSection />

        <Suspense
          fallback={
            <LazySectionFallback
              id="lab"
              className="bg-[hsl(15_6%_8%)] min-h-[980px] md:min-h-[760px] lg:min-h-[680px]"
            />
          }
        >
          <ProgramSection />
        </Suspense>

        <Suspense
          fallback={
            <LazySectionFallback
              id="about"
              className="bg-[hsl(15_6%_8%)] min-h-[900px] md:min-h-[700px] lg:min-h-[640px]"
            />
          }
        >
          <AboutSection />
        </Suspense>

        <Suspense fallback={<MarqueeFallback />}>
          <MarqueeTicker />
        </Suspense>

        <Suspense
          fallback={
            <LazySectionFallback
              id="faq"
              className="bg-background min-h-[1050px] md:min-h-[900px] lg:min-h-[820px]"
            />
          }
        >
          <FAQSection />
        </Suspense>

        <Suspense
          fallback={
            <LazySectionFallback
              id="contact"
              className="bg-[hsl(15_5%_10%)] min-h-[760px] md:min-h-[660px] lg:min-h-[620px]"
            />
          }
        >
          <CTASection />
        </Suspense>

        <Suspense fallback={<FooterFallback />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
