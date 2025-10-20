"use client";

import { useEffect, useRef } from "react";
import { Brain, Heart, Zap } from "lucide-react";
import TiltCard from "@/components/tilt-card";
import LotusIcon from "@/components/icons/lotus-icon";
import DiamondIcon from "@/components/icons/diamond-icon";

const values = [
  {
    title: "Spokój zamiast chaosu.",
    icon: LotusIcon,
    gradient: "from-blue-400 to-cyan-400",
    glowColor: "rgba(56, 189, 248, 0.3)",
  },
  {
    title: "Inteligencja w tle.",
    icon: Brain,
    gradient: "from-purple-400 to-pink-400",
    glowColor: "rgba(192, 132, 252, 0.3)",
  },
  {
    title: "Design tworzony od serca.",
    icon: Heart,
    gradient: "from-pink-400 to-rose-400",
    glowColor: "rgba(244, 114, 182, 0.3)",
  },
  {
    title: "Technologia, która zachwyca.",
    icon: Zap,
    gradient: "from-amber-400 to-orange-400",
    glowColor: "rgba(251, 191, 36, 0.3)",
  },
];

export default function WhySyntance() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.value-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section className="relative z-10 py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-2xl opacity-30 animate-pulse"></div>
            <h2 className="relative text-4xl md:text-5xl font-light tracking-widest glow-text">
              Dlaczego Syntance?
            </h2>
          </div>
          <p className="text-lg font-light tracking-wide text-gray-400">
            Wartości i podejście
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="value-card opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <TiltCard className="h-full">
                  <div className="group relative h-full">
                    {/* Card background with gradient border */}
                    <div className="relative h-full">
                      {/* Animated gradient border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"
                        style={{
                          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        }}
                      ></div>
                      
                      {/* Card content */}
                      <div className="relative h-full bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded-2xl p-10 transition-all duration-500 group-hover:border-transparent">
                        {/* Glow effect on hover */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                          style={{
                            boxShadow: `0 0 60px ${value.glowColor}`,
                          }}
                        ></div>

                        {/* Icon */}
                        <div className="mb-6 relative">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} bg-opacity-10 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            {value.title === "Inteligencja w tle." ? (
                              <span className="text-2xl font-bold text-white">
                                AI
                              </span>
                            ) : value.title === "Spokój zamiast chaosu." ? (
                              <LotusIcon className="text-white" size={32} />
                            ) : value.title === "Technologia, która zachwyca." ? (
                              <DiamondIcon className="text-white" size={32} />
                            ) : (
                              <Icon className="text-white" size={32} strokeWidth={1.5} />
                            )}
                          </div>
                          {/* Floating particles on hover */}
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                            style={{
                              backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                            }}
                          ></div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-light tracking-wide leading-relaxed">
                          <span className={`bg-gradient-to-br ${value.gradient} bg-clip-text text-transparent transition-all duration-500 group-hover:tracking-wider`}>
                            {value.title}
                          </span>
                        </h3>

                        {/* Animated underline */}
                        <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r transition-all duration-700"
                          style={{
                            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                          }}
                        ></div>

                        {/* Decorative corner elements */}
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                          style={{
                            borderImage: `linear-gradient(to bottom right, var(--tw-gradient-stops)) 1`,
                          }}
                        ></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                          style={{
                            borderImage: `linear-gradient(to top left, var(--tw-gradient-stops)) 1`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .value-card.card-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
}

