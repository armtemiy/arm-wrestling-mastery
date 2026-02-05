import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";
import { COMMON_STYLES } from "./common-styles";

const labFaqs = [
  {
    question: "Что такое Armtemiy Lab?",
    answer:
      "Это мини-приложение в Telegram с инструментами для армрестлера: диагностика, калькулятор, база подсказок.",
  },
  {
    question: "Сколько вопросов в диагностике?",
    answer:
      "Обычно 5–7 вопросов. Цель — быстро определить слабое звено и дать точный фокус.",
  },
  {
    question: "Нужна ли оплата?",
    answer:
      "Базовые инструменты доступны сразу. Расширенные функции будут открываться постепенно.",
  },
  {
    question: "Это заменяет тренера?",
    answer:
      "Нет. Lab — быстрый разбор и ориентиры, а тренер закрывает детали и механику на практике.",
  },
];

const trainingFaqs = [
  {
    question: "Где проходят тренировки?",
    answer:
      "Тула. Своя комната с оборудованием и столом.",
  },
  {
    question: "Сколько стоит тренировка?",
    answer:
      "От 500₽ за час работы. Точную цену и формат согласуем перед встречей.",
  },
  {
    question: "Что брать с собой?",
    answer:
      "Ничего специального не нужно. У меня дома есть всё для армрестлинга и даже больше: стол, блок, резины всех видов, ручки, стрэпы, магнезия. Воду тоже дам. Достаточно прийти чистым и опрятным в удобной одежде для занятий физической активностью.",
  },
  {
    question: "Как записаться?",
    answer:
      "Напиши через форму или в Telegram — отвечу и подберём время.",
  },
];

const FAQSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { containerRef: labRef, visibleItems: labVisible } = useStaggeredReveal(labFaqs.length, {
    staggerDelay: 100,
  });
  const { containerRef: trainingRef, visibleItems: trainingVisible } = useStaggeredReveal(trainingFaqs.length, {
    staggerDelay: 100,
  });

  return (
    <section
      id="faq"
      className="relative py-20 md:py-32 bg-[hsl(15_5%_10%)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(5_85%_60%/0.06)] blur-[200px]" />
      </div>
      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
          <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-[hsl(5_85%_60%/0.15)] text-[hsl(5_85%_60%)] text-sm font-medium mb-6" style={COMMON_STYLES.satoshi}>
              ВОПРОСЫ
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white" style={COMMON_STYLES.clashDisplay}>
              Отвечаю на главное
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-10">
            <div>
              <p className="text-[hsl(15_10%_50%)] text-xs uppercase tracking-[0.2em] font-semibold mb-5" style={COMMON_STYLES.satoshi}>
                Armtemiy Lab
              </p>
              <div ref={labRef}>
                <Accordion type="single" collapsible className="space-y-3">
                  {labFaqs.map((faq, index) => (
                    <div
                      key={`lab-${index}`}
                      className={`stagger-item ${labVisible[index] ? 'visible' : ''}`}
                    >
                      <AccordionItem
                        value={`lab-${index}`}
                        className="border border-[hsl(15_5%_20%)] rounded-2xl px-6 bg-[hsl(15_8%_8%)] data-[state=open]:bg-[hsl(15_8%_12%)] data-[state=open]:border-[hsl(5_85%_60%/0.4)] transition-all duration-300 hover:border-[hsl(15_5%_25%)] relative overflow-hidden group card-lift"
                      >
                        <div className="absolute inset-0 bg-[hsl(5_85%_60%/0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <AccordionTrigger className="relative z-10 text-left text-white hover:no-underline py-5 sm:py-6 text-base sm:text-lg font-medium" style={COMMON_STYLES.satoshi}>
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="relative z-10 text-[hsl(15_10%_70%)] pb-6 text-sm sm:text-base leading-relaxed" style={COMMON_STYLES.satoshi}>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>

            <div>
              <p className="text-[hsl(15_10%_50%)] text-xs uppercase tracking-[0.2em] font-semibold mb-5" style={COMMON_STYLES.satoshi}>
                Тренировки
              </p>
              <div ref={trainingRef}>
                <Accordion type="single" collapsible className="space-y-3">
                  {trainingFaqs.map((faq, index) => (
                    <div
                      key={`training-${index}`}
                      className={`stagger-item ${trainingVisible[index] ? 'visible' : ''}`}
                    >
                      <AccordionItem
                        value={`training-${index}`}
                        className="border border-[hsl(15_5%_20%)] rounded-2xl px-6 bg-[hsl(15_8%_8%)] data-[state=open]:bg-[hsl(15_8%_12%)] data-[state=open]:border-[hsl(5_85%_60%/0.4)] transition-all duration-300 hover:border-[hsl(15_5%_25%)] relative overflow-hidden group card-lift"
                      >
                        <div className="absolute inset-0 bg-[hsl(5_85%_60%/0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <AccordionTrigger className="relative z-10 text-left text-white hover:no-underline py-5 sm:py-6 text-base sm:text-lg font-medium" style={COMMON_STYLES.satoshi}>
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="relative z-10 text-[hsl(15_10%_70%)] pb-6 text-sm sm:text-base leading-relaxed" style={COMMON_STYLES.satoshi}>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />
    </section>
  );
};

export default FAQSection;
