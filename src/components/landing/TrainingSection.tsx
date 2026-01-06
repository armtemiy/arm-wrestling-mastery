import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TrainingSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const details = [
    { icon: MapPin, text: "ТУЛА • СВОЯ КОМНАТА" },
    { icon: Clock, text: "ОТ 500₽ / ЧАС" },
    { icon: Users, text: "МОЖНО С ДРУГОМ" },
  ];

  return (
    <section
      id="training"
      className="relative py-20 md:py-28 bg-metal-900 bg-noise overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-rust-600 opacity-10" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-rust-600 opacity-10" />

      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-800 border border-rust-600 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
              <span className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                Тренировки
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-metal-50 mb-4" style={{ textShadow: '3px 3px 0 hsl(24 98% 32%)' }}>
              ЖИВАЯ РАБОТА
            </h2>
            <p className="font-body text-lg text-metal-400 max-w-xl">
              Видео — это хорошо. Но ничто не заменит живую коррекцию. Увижу твои ошибки, поставлю руку, покажу как чувствовать рычаг.
            </p>
          </div>

          {/* Content grid - asymmetric */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Image placeholder - 5 cols */}
            <div className="md:col-span-5 md:order-2">
              <div className="aspect-square bg-metal-800 border-2 border-metal-700 p-8 shadow-brutal-sm relative">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-rust-600" />

                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-metal-900 border border-metal-600 flex items-center justify-center mb-4">
                    <MapPin size={36} className="text-rust-600" strokeWidth={2} />
                  </div>
                  <p className="font-mono text-xs text-metal-600 uppercase tracking-widest mb-2">
                    // Локация
                  </p>
                  <p className="font-display text-2xl text-metal-300" style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}>
                    ТУЛА
                  </p>
                </div>
              </div>
            </div>

            {/* Content - 7 cols */}
            <div className="md:col-span-7 md:order-1 space-y-6">
              {/* Description */}
              <div className="bg-metal-800 border-2 border-metal-700 p-6 shadow-brutal-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rust-600 border border-rust-700 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-2xl text-metal-900">!</span>
                  </div>
                  <div>
                    <p className="font-body text-metal-300 leading-relaxed">
                      <span className="text-rust-500 font-bold">Одна тренировка</span> даст больше понимания, чем месяц самостоятельных попыток по видео с YouTube.
                    </p>
                  </div>
                </div>
              </div>

              {/* Details list */}
              <div className="space-y-3">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 px-4 py-3 bg-metal-800 border border-metal-700 hover:border-rust-600 transition-all duration-200"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-10 h-10 bg-metal-900 border border-metal-600 flex items-center justify-center flex-shrink-0">
                      <detail.icon className="text-rust-600" size={18} />
                    </div>
                    <span className="font-mono text-sm text-metal-300 uppercase tracking-wider">
                      {detail.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://t.me/assistemiy?text=Хочу%20на%20тренировку"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-rust-600 text-metal-50 font-body font-bold text-lg uppercase tracking-wide border-none rounded-sm shadow-brutal hover:bg-rust-500 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
              >
                <span>Записаться</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-metal-800 via-rust-600 to-metal-800" />
    </section>
  );
};

export default TrainingSection;
