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
    question: "Подойдёт ли новичку?",
    answer:
      "Да, программа идёт от основ. Разбираем базу техники, правильную постановку руки, основные упражнения. Ты сможешь начать с нуля и сразу делать всё правильно.",
  },
  {
    question: "Нужно ли специальное оборудование?",
    answer:
      "Нет, в программе есть раздел про тренировки без стола и специального оборудования. Конечно, стол и ручки — это плюс, но начать можно с минимумом.",
  },
  {
    question: "Как получу материалы?",
    answer:
      "Доступ в Telegram сразу после оплаты. Получаешь ссылку на закрытый канал с текстовыми материалами и видео. Доступ навсегда.",
  },
  {
    question: "А если не понравится?",
    answer:
      "Если в течение 3 дней поймёшь, что это не для тебя — напиши, верну деньги без вопросов.",
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
      className="relative py-24 md:py-32 section-charcoal overflow-hidden"
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
            <span className="inline-block px-4 py-2 rounded-full bg-[hsl(30_80%_55%/0.15)] text-[hsl(30_80%_55%)] text-sm font-medium mb-6">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[hsl(0_0%_98%)]">
              Частые вопросы
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
                    className="border border-[hsl(0_0%_100%/0.1)] rounded-2xl px-6 bg-[hsl(0_0%_100%/0.03)] data-[state=open]:bg-[hsl(0_0%_100%/0.05)] data-[state=open]:border-[hsl(30_80%_55%/0.3)] transition-all duration-300 hover:border-[hsl(0_0%_100%/0.2)] relative overflow-hidden group card-lift"
                  >
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-[hsl(30_80%_55%/0.02)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <AccordionTrigger className="relative z-10 text-left text-[hsl(0_0%_98%)] hover:no-underline py-6 text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="relative z-10 text-[hsl(0_0%_98%/0.6)] pb-6 text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>

          {/* Divider after accordion */}
          <div className="h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.1)] to-transparent my-12" />

          {/* CTA under FAQ */}
          <div className="text-center">
            <p className="text-[hsl(0_0%_98%/0.5)] mb-4">
              Остались вопросы? Напиши — отвечу лично
            </p>
            <a
              href="https://t.me/assistemiy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[hsl(30_80%_55%)] hover:text-[hsl(30_80%_65%)] hover:drop-shadow-[0_0_8px_hsl(30_80%_55%/0.5)] transition-all font-medium"
            >
              Написать в Telegram
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
