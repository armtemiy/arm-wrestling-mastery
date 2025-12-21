import { User, Users, Trophy } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ForWhomSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const audiences = [
    {
      icon: User,
      title: "Новичок",
      description:
        "Хочешь попробовать армрестлинг и сразу делать всё правильно",
    },
    {
      icon: Users,
      title: "Любитель",
      description:
        "Уже борешься, но хочешь понять технику глубже и тренироваться системно",
    },
    {
      icon: Trophy,
      title: "Выступающий",
      description:
        "Готовишься к соревнованиям и ищешь тактические фишки",
    },
  ];

  return (
    <section 
      ref={ref}
      className={`py-24 md:py-32 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Для кого это
          </h2>
          <p className="text-muted-foreground text-lg">
            Программа подходит на любом уровне подготовки
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <audience.icon className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {audience.title}
              </h3>
              <p className="text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
