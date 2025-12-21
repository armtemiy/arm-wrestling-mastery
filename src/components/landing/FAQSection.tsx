import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
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

  return (
    <section 
      ref={ref}
      className={`py-24 md:py-32 bg-background transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Частые вопросы
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-2xl px-6 bg-card data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
