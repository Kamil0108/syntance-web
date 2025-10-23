"use client";

import Link from "next/link";
import { Menu, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import GooeyNav from "@/components/ui/gooey-nav";

const navItems = [
  { label: "O nas", href: "#hero-studio" },
  { label: "Wartości", href: "#values-studio" },
  { label: "Portfolio", href: "#portfolio-studio" },
  { label: "Proces", href: "#process-studio" },
  { label: "Cennik", href: "#pricing-studio" },
  { label: "Kontakt", href: "#contact" },
];

const sectionIds = ['hero-studio', 'values-studio', 'portfolio-studio', 'process-studio', 'pricing-studio', 'contact'];

export default function NavbarStudio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      let currentSectionIndex = 0;
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const sectionTop = element.offsetTop;
          
          if (scrollPosition >= sectionTop) {
            currentSectionIndex = i;
            
            if (i < sectionIds.length - 1) {
              const nextElement = document.getElementById(sectionIds[i + 1]);
              if (nextElement && scrollPosition >= nextElement.offsetTop) {
                currentSectionIndex = i + 1;
              }
            }
            break;
          }
        }
      }
      
      setActiveSection(currentSectionIndex);
    };

    handleScroll();
    
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isScrolling, activeSection]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6 lg:px-12 backdrop-blur-md bg-black/30 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-light tracking-wider">Powrót</span>
          </Link>
          <button 
            onClick={() => {
              const element = document.getElementById('hero-studio');
              if (element) {
                const navbarHeight = 100;
                const elementRect = element.getBoundingClientRect();
                const elementTop = elementRect.top + window.scrollY;
                const viewportHeight = window.innerHeight;
                const elementHeight = elementRect.height;
                const offset = (viewportHeight - elementHeight) / 2;
                const scrollToPosition = elementTop - Math.max(offset, navbarHeight);
                
                window.scrollTo({
                  top: scrollToPosition,
                  behavior: 'smooth'
                });
              }
            }}
            className="text-2xl font-medium tracking-widest glow-text cursor-pointer hover:opacity-80 transition-opacity"
          >
            Syntance <span className="text-teal-300">Studio</span>
          </button>
        </div>
        
        <div className="hidden md:flex">
          <GooeyNav 
            items={navItems}
            particleCount={8}
            particleDistances={[90, 10]}
            particleR={80}
            initialActiveIndex={0}
            externalActiveIndex={activeSection}
            animationTime={450}
            timeVariance={200}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            onNavigate={(index) => {
              setActiveSection(index);
              setIsScrolling(true);
              setTimeout(() => setIsScrolling(false), 1000);
            }}
          />
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-6 space-y-4">
          <Link 
            href="/" 
            className="block text-sm font-light tracking-wider text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            ← Powrót do Syntance
          </Link>
          
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block text-sm font-light tracking-wider hover:text-purple-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setActiveSection(index);
                setIsScrolling(true);
                const element = document.querySelector(item.href) as HTMLElement;
                if (element) {
                  const navbarHeight = 100;
                  const viewportHeight = window.innerHeight;
                  const elementHeight = element.offsetHeight;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const centerOffset = (viewportHeight - elementHeight) / 2;
                  const offsetPosition = elementPosition - Math.max(navbarHeight, centerOffset);
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setTimeout(() => setIsScrolling(false), 1000);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

