
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ConceptCard from '@/components/ConceptCard';
import FloatGlyph from '@/components/FloatGlyph';
import { floatConcepts } from '@/data/floatConcepts';
import Navigation from '@/components/Navigation';

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Add subtle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      
      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-float-dark text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-float-dark via-float-dark/90 to-float-dark opacity-90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,120,120,0.05)_0,rgba(0,0,0,0)_70%)]"></div>
          
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 blur-3xl parallax" data-speed="-0.03"></div>
          <div className="absolute bottom-1/3 right-1/5 w-64 h-64 rounded-full bg-white/5 blur-3xl parallax" data-speed="0.05"></div>
        </div>
        
        <div className="container px-4 mx-auto z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <FloatGlyph type="core" size="xl" animated className="mb-4" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-light mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="shimmer-text">FLOAT Origin</span>
            <span className="block text-xl md:text-2xl mt-2 text-white/70 font-light">Remembered Forward</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="mx-auto max-w-prose text-white/70 mb-8">
              Distilled Essence as Visual Language
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-lg"
            >
              Begin Experience
            </button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div 
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Concepts Grid */}
      <section 
        ref={scrollRef}
        className="py-16 md:py-24 relative z-10"
      >
        <div className="container px-4 mx-auto">
          <motion.div
            className="mb-12 md:mb-16 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">The Seven Elements</h2>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-white/70 max-w-2xl mx-auto">
                Explore the foundational concepts that form FLOAT's philosophical and visual framework.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {floatConcepts.map((concept, index) => (
              <ConceptCard key={concept.id} concept={concept} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container px-4 mx-auto text-center">
          <FloatGlyph type="triune" size="md" className="mb-4" />
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} FLOAT Origin</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
