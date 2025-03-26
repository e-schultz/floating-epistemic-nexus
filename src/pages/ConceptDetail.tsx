
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import FloatGlyph from '@/components/FloatGlyph';
import { floatConcepts } from '@/data/floatConcepts';
import Navigation from '@/components/Navigation';

const ConceptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState(floatConcepts.find(c => c.id === Number(id)));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!id || !concept) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [id, concept, navigate]);

  if (!concept) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const prevConcept = floatConcepts.find(c => c.id === concept.id - 1);
  const nextConcept = floatConcepts.find(c => c.id === concept.id + 1);

  return (
    <div className="min-h-screen bg-float-dark text-white overflow-hidden">
      <Navigation />
      
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-16"
          >
            {/* Back button */}
            <div className="container mx-auto px-4 py-6">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft size={18} />
                <span>Back to Elements</span>
              </button>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
              >
                {/* Concept header */}
                <motion.div variants={itemVariants} className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-mono">
                        {concept.id} / 7
                      </span>
                      <FloatGlyph type={concept.glyph} size="md" animated />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-light">{concept.title}</h1>
                  </div>
                </motion.div>
                
                {/* Visual description */}
                <motion.div 
                  variants={itemVariants} 
                  className="mb-12 glass-panel p-6 md:p-8"
                >
                  <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4 font-medium">Visual</h2>
                  <p className="text-lg text-white/90 leading-relaxed">{concept.visual}</p>
                </motion.div>
                
                {/* Core concept */}
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4 font-medium">Core</h2>
                  <p className="text-xl md:text-2xl font-light leading-relaxed">
                    {concept.core}
                  </p>
                </motion.div>
                
                {/* Glyph explanation */}
                <motion.div variants={itemVariants} className="mb-16 glass-panel p-6 md:p-8">
                  <h2 className="text-sm uppercase tracking-wider text-white/50 mb-4 font-medium">FLOAT Glyph</h2>
                  <div className="flex items-center space-x-4">
                    <FloatGlyph type={concept.glyph} size="lg" animated className="text-white" />
                    <div>
                      <h3 className="font-mono text-sm text-white/80">
                        {concept.glyph === 'refusal' && 'The Refusal That Reveals'}
                        {concept.glyph === 'compass' && 'The Compass That Remembers'}
                        {concept.glyph === 'circle' && 'The Circle That Compiles'}
                        {concept.glyph === 'rift' && 'The Rift That Reads Back'}
                        {concept.glyph === 'sigil' && 'The Sigil of Structured Disobedience'}
                        {concept.glyph === 'triune' && 'The Triune Echo'}
                        {concept.glyph === 'core' && '(unnamed) — A living invocation system'}
                      </h3>
                    </div>
                  </div>
                </motion.div>
                
                {/* Navigation between concepts */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
                >
                  {prevConcept && (
                    <button 
                      onClick={() => {
                        navigate(`/concept/${prevConcept.id}`);
                      }}
                      className="px-6 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-left group"
                    >
                      <div className="flex items-center space-x-2 text-white/60 group-hover:text-white/80 transition-colors mb-1">
                        <ArrowLeft size={16} />
                        <span>Previous</span>
                      </div>
                      <span className="block text-lg">{prevConcept.title}</span>
                    </button>
                  )}
                  
                  {nextConcept && (
                    <button 
                      onClick={() => {
                        navigate(`/concept/${nextConcept.id}`);
                      }}
                      className={`px-6 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-right group ${!prevConcept ? 'md:col-start-2' : ''}`}
                    >
                      <div className="flex items-center justify-end space-x-2 text-white/60 group-hover:text-white/80 transition-colors mb-1">
                        <span>Next</span>
                        <ArrowLeft size={16} className="rotate-180" />
                      </div>
                      <span className="block text-lg">{nextConcept.title}</span>
                    </button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container px-4 mx-auto text-center">
          <FloatGlyph type="triune" size="sm" className="mb-4" />
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} FLOAT Origin</p>
        </div>
      </footer>
    </div>
  );
};

export default ConceptDetail;
