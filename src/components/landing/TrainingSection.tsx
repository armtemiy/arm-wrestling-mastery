import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { COMMON_STYLES } from "./common-styles";

const TrainingSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const details = [
    { icon: MapPin, text: "Тула, своя комната с оборудованием" },
    { icon: Clock, text: "От 500₽ за час работы" },
    { icon: Users, text: "Можно прийти с другом" },
  ];

  return (
    <section
      id="training"
      className="relative py-24 md:py-32 bg-[hsl(15_7%_9%)] overflow-hidden"
    >
      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(15_8%_12%)] to-[hsl(15_8%_10%)] border border-[hsl(15_5%_20%)] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center">
                      <MapPin size={28} className="text-[hsl(5_85%_60%)]" />
                    </div>
                    <p className="text-[hsl(15_10%_40%)] text-sm" style={COMMON_STYLES.satoshi}>
                      Фото комнаты/оборудования
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[hsl(15_90%_50%/0.1)] -z-10" />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-4" style={COMMON_STYLES.satoshi}>
                ЖИВЫЕ ТРЕНИРОВКИ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={COMMON_STYLES.clashDisplay}>
                Разберём твою технику вживую
              </h2>
              <p className="text-[hsl(15_10%_60%)] text-lg mb-8" style={COMMON_STYLES.satoshi}>
                Видео — это хорошо, но ничто не заменит живую работу. Увижу твои ошибки, поставлю руку, покажу как чувствовать рычаг. За одну тренировку поймёшь больше, чем за месяц самостоятельных попыток.
              </p>

              <div className="space-y-4 mb-8">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center group-hover:bg-[hsl(5_85%_60%/0.25)] group-hover:scale-110 transition-all duration-300">
                      <detail.icon className="text-[hsl(5_85%_60%)] group-hover:rotate-6 transition-transform duration-300" size={20} />
                    </div>
                    <span className="text-white" style={COMMON_STYLES.satoshi}>{detail.text}</span>
                  </div>
                ))}
              </div>

                <a
                  href="https://t.me/armtemiy_lab_bot?start=training"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[hsl(5_85%_60%)] hover:bg-[hsl(5_95%_65%)] text-white font-semibold px-8 py-4 text-base shadow-[0_0_30px_hsl(5_85%_60%/0.3)] hover:shadow-[0_0_50px_hsl(5_85%_60%/0.5)] transition-all duration-300"
                >
                  Записаться на тренировку
                  <ArrowRight className="ml-2" size={20} />
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />
    </section>
  );
};

export default TrainingSection;
