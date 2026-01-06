import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";

const faqs = [
  {
    question: "НУЛЬ В АРМРЕСТЛИНГЕ — ПОЙДЁТ?",
    answer: "Именно для тебя. От основ: постановка руки, мышцы, травмы. Начнёшь правильно — не переучиваешься потом.",
  },
  {
    question: "НЕТ СТОЛА И ОБОРУДОВАНИЯ?",
    answer: "Есть раздел про тренировки без стола. Турник, резина, гантели — минимум для старта. Главное — понимать что делаешь.",
  },
  {
    question: "КАК ПОЛУЧИТЬ ДОСТУП?",
    answer: "После оплаты — ссылка на закрытый Telegram-канал. Текст, видео, разборы. Доступ навсегда.",
  },
  {
    question: "А ЕСЛИ НЕ ЗАЙДЁТ?",
    answer: "3 дня на тест. Не зашло — пишу, возвращаю деньги. Без вопросов. Мне важно, чтобы программа помогала.",
  },
  {
    question: "ЧЕМ ЛУЧШЕ YOUTUBE?",
    answer: "На YouTube — противоречия. Здесь — система: что, в какой порядок, почему. Экономишь месяцы проб и ошибок.",
  },
];

const FAQSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const { containerRef: faqsRef, visibleItems } = useStaggeredReveal(faqs.length, {
    staggerDelay: 80,
  });

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 bg-metal-900 bg-noise overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-rust-600 opacity-10" />

      <div
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-metal-800 border border-rust-600 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rust-600 animate-pulse" />
              <span className="font-mono text-xs text-rust-500 uppercase tracking-widest">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-metal-50" style={{ textShadow: '3px 3px 0 hsl(24 98% 32%)' }}>
              ВОПРОСЫ
            </h2>
          </div>

          {/* Brutal accordion */}
          <div ref={faqsRef}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`stagger-item ${visibleItems[index] ? 'visible' : ''}`}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-metal-800 border-2 border-metal-700 data-[state=open]:border-rust-600 transition-all duration-200"
                  >
                    <AccordionTrigger className="relative text-left px-6 py-5 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-xs text-metal-600">
                          0{index + 1}
                        </div>
                        <span className="font-mono text-sm md:text-base text-metal-200 uppercase tracking-wider font-bold">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-metal-400 font-body leading-relaxed">
                      <div className="pl-10 border-l-2 border-rust-600">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-metal-800 via-rust-600 to-metal-800" />
    </section>
  );
};

export default FAQSection;
