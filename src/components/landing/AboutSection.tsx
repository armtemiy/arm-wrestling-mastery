import { Award, BookOpen, Dumbbell } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const credentials = [
    {
      icon: BookOpen,
      text: "3+ ГОДА АРМРЕСТЛИНГА",
      sub: "Биомеханика • Техника • Тактика",
    },
    {
      icon: Dumbbell,
      text: "ПАУЭРЛИФТИНГ + СТРИТЛИФТИНГ",
      sub: "База силы и понимания работы мышц",
    },
    {
      icon: Award,
      text: "КМС АКРОБАТИЧЕСКИЙ РОК-Н-РОЛЛ",
      sub: "Спортивная дисциплина",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-metal-800 bg-noise overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Corner accent */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-rust-600 opacity-10" />

      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-900 border border-rust-600 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
              <span className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                Автор
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-metal-50 mb-4" style={{ textShadow: '3px 3px 0 hsl(24 98% 32%)' }}>
              КТО Я
            </h2>
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Photo placeholder - 4 cols */}
            <div className="md:col-span-4 md:order-1">
              <div className="aspect-[4/5] bg-metal-900 border-2 border-metal-700 p-8 shadow-brutal-sm relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-rust-600" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-rust-600" />

                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-metal-800 border-2 border-metal-600 flex items-center justify-center mb-4">
                    <span className="font-display text-4xl text-rust-600" style={{ textShadow: '2px 2px 0 hsl(0 0% 0%)' }}>
                      А
                    </span>
                  </div>
                  <p className="font-mono text-xs text-metal-600 uppercase tracking-widest">
                    // ФОТО
                  </p>
                </div>
              </div>
            </div>

            {/* Content - 8 cols */}
            <div className="md:col-span-8 md:order-2 space-y-6">
              {/* Name block */}
              <div className="bg-metal-900 border-2 border-metal-700 p-6 shadow-brutal-sm">
                <p className="font-display text-3xl md:text-4xl text-metal-50 mb-2" style={{ textShadow: '2px 2px 0 hsl(24 98% 32%)' }}>
                  АРТЕМИЙ КРИВОШАПОВ
                </p>
                <p className="font-mono text-sm text-rust-500 uppercase tracking-widest">
                  Тренер по армрестлингу • Тула
                </p>
              </div>

              {/* Bio */}
              <div className="bg-metal-900 border-l-4 border-rust-600 p-6">
                <p className="font-body text-metal-300 leading-relaxed mb-4">
                  Не чемпион мира. Но перелопатил тонну информации — от учебников по биомеханике до разборов топовых спортсменов. Тренировался сам, общался с профи, набивал шишки.
                </p>
                <p className="font-body text-metal-300 leading-relaxed">
                  Теперь делюсь <span className="text-rust-500 font-bold">тем, что работает</span>. Без понтов, без «секретных техник» — просто система, которая даёт результат.
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-3">
                {credentials.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 px-4 py-3 bg-metal-900 border border-metal-700 hover:border-rust-600 transition-all duration-200"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-12 h-12 bg-metal-800 border border-metal-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-rust-600" size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-sm text-metal-200 uppercase tracking-wider font-bold">
                        {item.text}
                      </p>
                      <p className="font-body text-xs text-metal-500 mt-1">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
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

export default AboutSection;
