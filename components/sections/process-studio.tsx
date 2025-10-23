"use client";

import { useEffect, useRef } from "react";
import { Search, Palette, Code, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Poznajemy Twoją markę",
    description: "Słuchamy, pytamy i rozumiemy. Każdy projekt zaczyna się od głębokiej rozmowy o Twojej wizji i celach.",
    icon: Search,
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    number: "02",
    title: "Projektujemy doświadczenie",
    description: "Tworzymy wireframes i prototypy. Design to nie tylko wygląd - to przemyślana ścieżka użytkownika.",
    icon: Palette,
    gradient: "from-purple-400 to-pink-400",
  },
  {
    number: "03",
    title: "Budujemy i wdrażamy",
    description: "Kod, testy, optymalizacja. Rozwijamy projekt z dbałością o każdy detal i wydajność.",
    icon: Code,
    gradient: "from-amber-400 to-orange-400",
  },
  {
    number: "04",
    title: "Opiekujemy się stroną",
    description: "Nie znikamy po wdrożeniu. Wspieramy, aktualizujemy i rozwijamy Twój projekt.",
    icon: HeartHandshake,
    gradient: "from-pink-400 to-rose-400",
  },
];

export default function ProcessStudio() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = document.querySelectorAll('.process-step');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('step-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    steps.forEach((step) => observer.observe(step));

    return () => {
      steps.forEach((step) => observer.unobserve(step));
    };
  }, []);

  return (
    <section id="process-studio" className="relative z-10 py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 blur-2xl opacity-30 animate-pulse"></div>
            <h2 className="relative text-4xl md:text-5xl font-light tracking-widest glow-text">
              Jak pracujemy
            </h2>
          </div>
          <p className="text-lg font-light tracking-wide text-gray-400">
            Proces, który łączy empatię z precyzją
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-20"></div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="process-step opacity-0 translate-x-8 transition-all duration-700 ease-out relative"
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="flex items-start gap-6">
                    {/* Icon Circle */}
                    <div className="relative flex-shrink-0">
                      {/* Glow */}
                      <div 
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} blur-xl opacity-30`}
                      ></div>
                      {/* Icon container */}
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} bg-opacity-10 border-2 border-white/10 flex items-center justify-center backdrop-blur-sm`}>
                        <Icon className="text-white" size={24} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-sm font-mono font-medium bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}>
                          {step.number}
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-r ${step.gradient} opacity-20`}></div>
                      </div>
                      
                      <h3 className="text-2xl font-light tracking-wide mb-3 glow-text">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-400 font-light tracking-wide leading-relaxed">
                        {step.description}
                      </p>

                      {/* Decorative element */}
                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500">
                        <div className={`w-8 h-0.5 bg-gradient-to-r ${step.gradient}`}></div>
                        <span className="font-light">Krok {index + 1} z 4</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute -right-32 top-1/4 w-64 h-64 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-5 blur-3xl -z-10"></div>
          <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-5 blur-3xl -z-10"></div>
        </div>
      </div>

      <style jsx>{`
        .process-step.step-visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
}

