import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggeredReveal } from "@/hooks/useStaggeredReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { COMMON_STYLES } from "./common-styles";
import { faqData } from "@/data/faq";

const FAQSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const prefersReducedMotion = useReducedMotion();

  const { containerRef: labRef, visibleItems: labVisible } = useStaggeredReveal({
    itemCount: faqData.lab.items.length,
    staggerMs: prefersReducedMotion ? 0 : 100,
  });

  const { containerRef: trainingRef, visibleItems: trainingVisible } = useStaggeredReveal({
    itemCount: faqData.training.items.length,
    staggerMs: prefersReducedMotion ? 0 : 100,
  });

  return (
    <section
      id="faq"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[250px] sm:h-[400px] rounded-full bg-primary/5 blur-[120px] sm:blur-[200px]" />
      </div>
      <div
        ref={sectionRef}
        className={`container mx-auto px-4 sm:px-6 ${
          prefersReducedMotion ? "opacity-100" : `transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 sm:mb-6"
              style={COMMON_STYLES.satoshi}
            >
              ВОПРОСЫ
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
              style={COMMON_STYLES.clashDisplay}
            >
              Отвечаю на главное
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div>
              <p
                className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-4 sm:mb-5"
                style={COMMON_STYLES.satoshi}
              >
                {faqData.lab.title}
              </p>
              <div ref={labRef}>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqData.lab.items.map((faq, index) => (
                    <div
                      key={`lab-${index}`}
                      className={prefersReducedMotion ? "" : `stagger-item ${labVisible[index] ? "visible" : ""}`}
                      style={{ transitionDelay: prefersReducedMotion ? "0ms" : undefined }}
                    >
                      <AccordionItem
                        value={`lab-${index}`}
                        className={`border border-border rounded-xl sm:rounded-2xl px-4 sm:px-6 bg-card data-[state=open]:bg-accent/5 data-[state=open]:border-primary/40 relative overflow-hidden group ${
                          prefersReducedMotion
                            ? ""
                            : "transition-all duration-300 hover:border-primary/20 card-lift"
                        }`}
                      >
                        {!prefersReducedMotion && (
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        )}
                        <AccordionTrigger
                          className="relative z-10 text-left text-foreground hover:no-underline py-4 sm:py-5 md:py-6 text-base sm:text-lg font-medium min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                          style={COMMON_STYLES.satoshi}
                        >
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent
                          className="relative z-10 text-muted-foreground pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                          style={COMMON_STYLES.satoshi}
                        >
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>

            <div>
              <p
                className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-4 sm:mb-5"
                style={COMMON_STYLES.satoshi}
              >
                {faqData.training.title}
              </p>
              <div ref={trainingRef}>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqData.training.items.map((faq, index) => (
                    <div
                      key={`training-${index}`}
                      className={prefersReducedMotion ? "" : `stagger-item ${trainingVisible[index] ? "visible" : ""}`}
                      style={{ transitionDelay: prefersReducedMotion ? "0ms" : undefined }}
                    >
                      <AccordionItem
                        value={`training-${index}`}
                        className={`border border-border rounded-xl sm:rounded-2xl px-4 sm:px-6 bg-card data-[state=open]:bg-accent/5 data-[state=open]:border-primary/40 relative overflow-hidden group ${
                          prefersReducedMotion
                            ? ""
                            : "transition-all duration-300 hover:border-primary/20 card-lift"
                        }`}
                      >
                        {!prefersReducedMotion && (
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        )}
                        <AccordionTrigger
                          className="relative z-10 text-left text-foreground hover:no-underline py-4 sm:py-5 md:py-6 text-base sm:text-lg font-medium min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                          style={COMMON_STYLES.satoshi}
                        >
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent
                          className="relative z-10 text-muted-foreground pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                          style={COMMON_STYLES.satoshi}
                        >
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

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

const MemoizedFAQSection = React.memo(FAQSection);
export default MemoizedFAQSection;