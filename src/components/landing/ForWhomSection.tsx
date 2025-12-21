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
      className={`relative py-24 md:py-32 section-light transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[hsl(0_0%_12%)] mb-4">
            Для кого это
          </h2>
          <p className="text-[hsl(0_0%_12%/0.6)] text-lg">
            Программа подходит на любом уровне подготовки
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-[hsl(0_0%_12%/0.1)] bg-white hover:border-[hsl(30_80%_60%/0.3)] hover:shadow-lg hover:shadow-[hsl(30_80%_60%/0.05)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[hsl(30_80%_60%/0.1)] flex items-center justify-center mb-6 group-hover:bg-[hsl(30_80%_60%/0.2)] transition-colors">
                <audience.icon className="text-[hsl(30_70%_50%)]" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[hsl(0_0%_12%)] mb-3">
                {audience.title}
              </h3>
              <p className="text-[hsl(0_0%_12%/0.6)]">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default ForWhomSection;
