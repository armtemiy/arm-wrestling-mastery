import { Award, BookOpen, Dumbbell } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const highlights = [
    {
      icon: BookOpen,
      text: "3 года глубокого изучения армрестлинга",
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
      ref={ref}
      className={`py-24 md:py-32 section-light transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-muted to-muted/50 border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">А</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Твоё фото
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl bg-primary/10 -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-primary/5 -z-10" />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Обо мне
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Артемий Кривошапов
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Изучил всё: от вузовских учебников по биомеханике до разборов
                топовых спортсменов. Тренировался сам, общался с
                профессионалами, пробовал разные подходы.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Собрал это в систему, которую теперь передаю другим — понятно,
                без воды и лишнего.
              </p>

              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="text-primary" size={20} />
                    </div>
                    <span className="text-foreground">{item.text}</span>
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
