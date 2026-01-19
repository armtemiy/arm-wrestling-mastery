import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";
import { COMMON_STYLES } from "./common-styles";

const faqs = [
  {
    question: "Я полный ноль в армрестлинге. Мне подойдёт?",
    answer:
      "Именно для тебя и делал. Программа идёт от основ: как ставить руку, какие мышцы качать, как не травмироваться. Начнёшь с нуля и сразу будешь делать правильно, а не переучиваться потом.",
  },
  {
    question: "А если у меня нет стола и специального оборудования?",
    answer:
      "Есть целый раздел про тренировки без стола. Конечно, со столом лучше, но начать можно с минимумом — турник, резина, гантели. Главное — понимать что и зачем делаешь.",
  },
  {
    question: "Как получу доступ после оплаты?",
    answer:
      "Сразу после оплаты получишь ссылку на закрытый Telegram-канал. Там текст, видео, разборы. Доступ навсегда — можешь возвращаться когда угодно.",
  },
  {
    question: "Что если не понравится?",
    answer:
      "Если за 3 дня поймёшь, что это не твоё — напиши, верну деньги без вопросов. Мне важно, чтобы программа реально помогала, а не просто продавалась.",
  },
  {
    question: "Чем это лучше бесплатных видео на YouTube?",
    answer:
      "На YouTube куча противоречивой информации. Один говорит одно, другой — другое. Здесь всё собрано в систему: что делать, в какой последовательности, почему именно так. Экономишь месяцы проб и ошибок.",
  },
];

const FAQSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { containerRef: faqsRef, visibleItems } = useStaggeredReveal(faqs.length, {
    staggerDelay: 100,
  });

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-[hsl(15_5%_10%)] overflow-hidden"
    >
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
            <h2 className="text-3xl md:text-5xl font-bold text-white" style={COMMON_STYLES.clashDisplay}>
              Отвечаю на главное
            </h2>
          </div>

          {/* Accordion with staggered animations */}
          <div ref={faqsRef}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`stagger-item ${visibleItems[index] ? 'visible' : ''}`}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-[hsl(15_5%_20%)] rounded-2xl px-6 bg-[hsl(15_8%_8%)] data-[state=open]:bg-[hsl(15_8%_12%)] data-[state=open]:border-[hsl(5_85%_60%/0.4)] transition-all duration-300 hover:border-[hsl(15_5%_25%)] relative overflow-hidden group card-lift"
                  >
                    {/* Red glow on hover */}
                    <div className="absolute inset-0 bg-[hsl(5_85%_60%/0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <AccordionTrigger className="relative z-10 text-left text-white hover:no-underline py-6 text-lg font-medium" style={COMMON_STYLES.satoshi}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="relative z-10 text-[hsl(15_10%_70%)] pb-6 text-base leading-relaxed" style={COMMON_STYLES.satoshi}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>

        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(15_5%_20%)] to-transparent" />
    </section>
  );
};

export default FAQSection;
