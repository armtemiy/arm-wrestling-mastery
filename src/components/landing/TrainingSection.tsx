import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";

const TrainingSection = () => {
  const details = [
    { icon: MapPin, text: "Тула, оборудованная комната" },
    { icon: Clock, text: "От 500₽/час" },
    { icon: Users, text: "Можно вдвоём или втроём" },
  ];

  return (
    <section 
      id="training"
      className="relative py-24 md:py-32 section-warm overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(0_0%_14%)] to-[hsl(0_0%_11%)] border border-[hsl(0_0%_100%/0.1)] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(30_80%_60%/0.15)] flex items-center justify-center">
                      <MapPin size={28} className="text-[hsl(30_70%_55%)]" />
                    </div>
                    <p className="text-[hsl(0_0%_100%/0.4)] text-sm">
                      Фото комнаты/оборудования
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[hsl(30_80%_60%/0.1)] -z-10" />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-[hsl(30_80%_60%/0.15)] text-[hsl(30_70%_55%)] text-sm font-medium mb-4">
                Офлайн
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[hsl(0_0%_98%)] mb-4">
                Персональные тренировки
              </h2>
              <p className="text-[hsl(0_0%_100%/0.6)] text-lg mb-8">
                Для тех, кому важно разобрать технику вживую. Покажу на
                практике, поправлю ошибки, дам упражнения под тебя.
              </p>

              <div className="space-y-4 mb-8">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(30_80%_60%/0.15)] flex items-center justify-center">
                      <detail.icon className="text-[hsl(30_70%_55%)]" size={20} />
                    </div>
                    <span className="text-[hsl(0_0%_98%)]">{detail.text}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="cta"
                size="xl"
                className="rounded-full shadow-[0_0_30px_hsl(30_80%_55%/0.3)] hover:shadow-[0_0_50px_hsl(30_80%_55%/0.5)]"
              >
                <a
                  href="https://t.me/assistemiy?text=Хочу%20на%20тренировку"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Записаться
                  <ArrowRight className="ml-2" size={20} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider-dark" />
    </section>
  );
};

export default TrainingSection;
