import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, FileText, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { COMMON_STYLES } from "./common-styles";

const benefits = [
  "5 главных ошибок новичков за столом",
  "Чек-лист разминки перед борьбой",
  "3 упражнения для взрывного старта",
  "Как не травмировать локоть",
];

const LeadMagnetSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    window.open("https://t.me/armtemiy_lab_bot", "_blank");
    setTimeout(() => {
      setIsDownloading(false);
      setDownloaded(true);
    }, 600);
  };

  return (
    <section id="lead-magnet" className="relative py-20 md:py-28 overflow-hidden bg-[hsl(15_8%_8%)]">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[hsl(5_85%_60%/0.05)] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(15_90%_50%/0.04)] blur-[120px]" />
      </div>

      <div
        ref={sectionRef}
        className={`relative container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-6" style={COMMON_STYLES.satoshi}>
                <Zap size={16} />
                БЕСПЛАТНО
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={COMMON_STYLES.clashDisplay}>
                Чек-лист для старта{" "}
                <span className="text-gradient">в армрестлинге</span>
              </h2>

              <p className="text-[hsl(15_10%_60%)] text-base sm:text-lg mb-8" style={COMMON_STYLES.satoshi}>
                Получи бесплатный PDF в Telegram и узнай, с чего начать тренировки, чтобы не тратить время на ерунду и не травмироваться
              </p>

              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-[hsl(5_85%_60%)] flex-shrink-0 mt-0.5" />
                    <span className="text-[hsl(15_10%_80%)]" style={COMMON_STYLES.satoshi}>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                size="lg"
                className="rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-8 py-6 text-base shadow-[0_0_30px_hsl(5_85%_60%/0.3)] hover:shadow-[0_0_40px_hsl(5_85%_60%/0.5)] transition-all duration-300 disabled:opacity-70"
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Загрузка...
                  </>
                ) : downloaded ? (
                  <>
                    <CheckCircle className="mr-2" size={20} />
                    Отправлено!
                  </>
                ) : (
                  <>
                    <Download className="mr-2" size={20} />
                    Скачать бесплатно
                  </>
                )}
              </Button>
              <p className="mt-3 text-xs text-[hsl(15_10%_60%)]" style={COMMON_STYLES.satoshi}>
                Кнопка откроет Telegram
              </p>
            </div>

            {/* PDF Preview Card */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[hsl(15_8%_12%)] to-[hsl(15_8%_10%)] rounded-3xl p-8 border border-[hsl(15_5%_20%)] shadow-2xl">
                {/* PDF Icon */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-[hsl(5_85%_60%)] flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>

                {/* Mock PDF content */}
                <div className="space-y-4">
                  <div className="h-3 w-3/4 rounded bg-[hsl(15_5%_20%/0.5)]" />
                  <div className="h-3 w-full rounded bg-[hsl(15_5%_20%/0.4)]" />
                  <div className="h-3 w-5/6 rounded bg-[hsl(15_5%_20%/0.4)]" />

                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-[hsl(5_85%_60%/0.3)]" />
                      <div className="h-2 w-2/3 rounded bg-[hsl(15_5%_20%/0.3)]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-[hsl(5_85%_60%/0.3)]" />
                      <div className="h-2 w-1/2 rounded bg-[hsl(15_5%_20%/0.3)]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-[hsl(5_85%_60%/0.3)]" />
                      <div className="h-2 w-3/4 rounded bg-[hsl(15_5%_20%/0.3)]" />
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="h-2 w-full rounded bg-[hsl(15_5%_20%/0.2)]" />
                    <div className="h-2 w-4/5 rounded bg-[hsl(15_5%_20%/0.2)]" />
                    <div className="h-2 w-full rounded bg-[hsl(15_5%_20%/0.2)]" />
                  </div>
                </div>

                {/* Label */}
                <div className="mt-6 pt-4 border-t border-[hsl(15_5%_20%)]">
                  <p className="text-[hsl(15_10%_60%)] text-sm" style={COMMON_STYLES.satoshi}>
                    armtemiy-checklist.pdf
                  </p>
                  <p className="text-[hsl(5_85%_60%)] text-xs mt-1">
                    PDF • 2 страницы
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-[hsl(5_85%_60%/0.1)] -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />
    </section>
  );
};

export default LeadMagnetSection;
