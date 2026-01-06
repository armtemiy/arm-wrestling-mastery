import { useState } from "react";
import { Download, CheckCircle, FileText } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  "5 главных ошибок новичков",
  "Чек-лист разминки перед борьбой",
  "3 упражнения для взрывного старта",
  "Профилактика травм локтя",
];

const LeadMagnetSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloaded(true);
      window.open("https://t.me/armtemiy_bot", "_blank");
    }, 1000);
  };

  return (
    <section id="lead-magnet" className="relative py-20 md:py-28 bg-metal-900 bg-noise overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Rust gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rust-600 rounded-full blur-[200px] opacity-[0.03]" />

      <div
        ref={sectionRef}
        className={`relative container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div>
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-800 border border-rust-600 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
                <span className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                  Бесплатно
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl text-metal-50 mb-4" style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}>
                ЧЕК-ЛИСТ
                <br />
                <span className="text-rust-500">ДЛЯ СТАРТА</span>
              </h2>

              <p className="font-body text-metal-400 mb-8">
                PDF-файл с основами. Скачай и начни правильно — без травм и потери времени.
              </p>

              {/* Benefits list */}
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-5 h-5 bg-rust-600 border border-rust-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-metal-900" />
                    </div>
                    <span className="font-body text-sm text-metal-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="group relative inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-5 bg-rust-600 text-metal-50 font-body font-bold text-base uppercase tracking-wide border-none rounded-sm shadow-brutal hover:bg-rust-500 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 disabled:opacity-70"
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-metal-900/30 border-t-metal-900 rounded-full animate-spin" />
                    <span>Загрузка...</span>
                  </>
                ) : downloaded ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Отправлено!</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>Скачать бесплатно</span>
                  </>
                )}
              </button>
            </div>

            {/* PDF Preview Card */}
            <div className="relative">
              <div className="bg-metal-800 border-2 border-metal-700 p-8 shadow-brutal-sm relative">
                {/* Corner accent */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-rust-600 border border-rust-700 flex items-center justify-center shadow-brutal-sm">
                  <FileText className="w-6 h-6 text-metal-900" />
                </div>

                {/* Mock PDF content */}
                <div className="space-y-4 font-mono">
                  <div className="flex items-center gap-2 pb-4 border-b border-metal-700">
                    <div className="w-3 h-3 bg-rust-600" />
                    <div className="w-3 h-3 bg-metal-700" />
                    <div className="w-3 h-3 bg-metal-700" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-metal-700 rounded" />
                    <div className="h-2 w-full bg-metal-700 rounded" />
                    <div className="h-2 w-5/6 bg-metal-700 rounded" />
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-rust-600/30" />
                      <div className="h-1.5 w-2/3 bg-metal-700 rounded" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-rust-600/30" />
                      <div className="h-1.5 w-1/2 bg-metal-700 rounded" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-rust-600/30" />
                      <div className="h-1.5 w-3/4 bg-metal-700 rounded" />
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="h-1 w-full bg-metal-700 rounded" />
                    <div className="h-1 w-4/5 bg-metal-700 rounded" />
                    <div className="h-1 w-full bg-metal-700 rounded" />
                  </div>
                </div>

                {/* File info */}
                <div className="mt-6 pt-4 border-t border-metal-700">
                  <p className="font-mono text-xs text-metal-500">
                    armtemiy-checklist.pdf
                  </p>
                  <p className="font-mono text-xs text-rust-600 mt-1">
                    PDF • 2 СТРАНИЦЫ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-metal-800 via-rust-600 to-metal-800" />
    </section>
  );
};

export default LeadMagnetSection;
