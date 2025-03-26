
import React from 'react';
import { motion } from 'framer-motion';
import FloatGlyph from '@/components/FloatGlyph';
import Navigation from '@/components/Navigation';

const Archive = () => {
  return (
    <div className="min-h-screen bg-float-dark text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <FloatGlyph type="circle" size="lg" animated className="mb-4" />
          <h1 className="text-3xl md:text-5xl font-light mb-6">The Archive</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A living collection of digital artifacts, symbolic systems, and recursive structures.
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center justify-center text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel px-8 py-12 max-w-2xl"
          >
            <FloatGlyph type="sigil" size="xl" animated className="mb-6" />
            <h2 className="text-2xl font-light mb-4">Archive Initialization</h2>
            <p className="text-white/70 mb-8">
              The archival process has begun. Future artifacts will be indexed and made accessible through this interface.
            </p>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
              <span className="mr-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Protocol Activating
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10 mt-auto">
        <div className="container px-4 mx-auto text-center">
          <FloatGlyph type="triune" size="sm" className="mb-4" />
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} FLOAT Origin</p>
        </div>
      </footer>
    </div>
  );
};

export default Archive;
