import React from "react";
import Navbar from "@/components/landing/Navbar";
import { SEO } from "@/components/SEO";
import { COMMON_STYLES } from "@/components/landing/common-styles";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

const NeurotypologyPage = () => {
  return (
    <>
      <SEO
        title="Нейротипология — гайд | Armtemiy"
        description="Гайд по нейротипологии для армрестлеров."
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 sm:pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight"
                style={COMMON_STYLES.clashDisplay}
              >
                Нейротипология в армрестлинге
              </h1>
              
              <p 
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
                style={COMMON_STYLES.satoshi}
              >
                Вводный гайд по нейротипологии с интерактивной 3D‑моделью: связь типов нервной системы и стиля борьбы.
              </p>

              <div className="flex items-center justify-center gap-4">
                <a
                  href="/neurotypology.pdf"
                  download
                  className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  style={COMMON_STYLES.satoshi}
                >
                  <ArrowDownToLine size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  Скачать
                </a>
                
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                
                <a
                  href="/neurotypology.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  style={COMMON_STYLES.satoshi}
                >
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  На весь экран
                </a>
              </div>
            </header>

            <div className="max-w-5xl mx-auto pb-16">
              <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card shadow-2xl">
                <object
                  data="/neurotypology.pdf"
                  type="application/pdf"
                  className="w-full"
                  style={{ height: '75vh', minHeight: '500px' }}
                >
                  <div className="flex flex-col items-center justify-center text-center p-16" style={{ minHeight: '60vh' }}>
                    <p className="text-muted-foreground mb-6" style={COMMON_STYLES.satoshi}>
                      PDF не отображается в этом браузере
                    </p>
                    <a
                      href="/neurotypology.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
                      style={COMMON_STYLES.satoshi}
                    >
                      Открыть гайд
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </object>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NeurotypologyPage;