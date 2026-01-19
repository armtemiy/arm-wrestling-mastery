import { Award, BookOpen, Dumbbell } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { COMMON_STYLES } from "./common-styles";

const AboutSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const highlights = [
    {
      icon: BookOpen,
      text: "3 года изучения армрестлинга от и до",
    },
    {
      icon: Dumbbell,
      text: "Опыт в пауэрлифтинге и стритлифтинге",
    },
    {
      icon: Award,
      text: "КМС по акробатическому рок-н-роллу",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[hsl(15_6%_8%)] overflow-hidden"
    >
      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[hsl(15_8%_12%)] to-[hsl(15_8%_10%)] border border-[hsl(15_5%_20%)] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center">
                      <span className="text-3xl font-bold text-[hsl(5_85%_60%)]" style={COMMON_STYLES.clashDisplay}>А</span>
                    </div>
                    <p className="text-[hsl(15_10%_40%)] text-sm" style={COMMON_STYLES.satoshi}>
                      Твоё фото
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl bg-[hsl(15_90%_50%/0.1)] -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[hsl(5_85%_60%/0.05)] -z-10" />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-4" style={COMMON_STYLES.satoshi}>
                КТО Я
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={COMMON_STYLES.clashDisplay}>
                Артемий Кривошапов
              </h2>
              <p className="text-[hsl(15_10%_60%)] text-lg mb-6" style={COMMON_STYLES.satoshi}>
                Я не чемпион мира. Но я перелопатил тонну информации: от учебников по биомеханике до разборов топовых спортсменов. Тренировался сам, общался с профессионалами, набивал шишки.
              </p>
              <p className="text-[hsl(15_10%_60%)] text-lg mb-8" style={COMMON_STYLES.satoshi}>
                Теперь делюсь тем, что реально работает. Без понтов, без «секретных техник» — просто система, которая даёт результат.
              </p>

              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[hsl(5_85%_60%/0.15)] flex items-center justify-center group-hover:bg-[hsl(5_85%_60%/0.25)] group-hover:scale-110 transition-all duration-300">
                      <item.icon className="text-[hsl(5_85%_60%)] group-hover:rotate-6 transition-transform duration-300" size={20} />
                    </div>
                    <span className="text-white" style={COMMON_STYLES.satoshi}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
