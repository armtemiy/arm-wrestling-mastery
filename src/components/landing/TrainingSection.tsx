import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TrainingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const details = [
    { icon: MapPin, text: "Тула, оборудованная комната" },
    { icon: Clock, text: "От 500₽/час" },
    { icon: Users, text: "Можно вдвоём или втроём" },
  ];

  return (
    <section
      id="training"
      ref={ref}
      className={`py-24 md:py-32 bg-muted/30 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-muted to-muted/50 border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin size={28} className="text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Фото комнаты/оборудования
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 -z-10" />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Офлайн
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Персональные тренировки
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Для тех, кому важно разобрать технику вживую. Покажу на
                практике, поправлю ошибки, дам упражнения под тебя.
              </p>

              <div className="space-y-4 mb-8">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <detail.icon className="text-primary" size={20} />
                    </div>
                    <span className="text-foreground">{detail.text}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="cta"
                size="lg"
                className="rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)] transition-all"
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
    </section>
  );
};

export default TrainingSection;
