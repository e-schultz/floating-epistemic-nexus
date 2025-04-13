
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import FloatGlyph from '@/components/FloatGlyph';

const Archive = () => {
  return (
    <div className="min-h-screen bg-float-dark text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6 flex items-center gap-4">
            <FloatGlyph type="triune" size="lg" animated />
            The Archive
          </h1>
          
          <p className="text-xl text-white/70 mb-12">
            A repository of FLOAT artifacts, research fragments, and historical annotations.
          </p>
          
          <div className="glass-panel p-8 mb-12">
            <div className="text-center mb-8">
              <p className="text-white/50 italic">
                The Archive section is currently under development.
              </p>
              <FloatGlyph type="circle" size="lg" className="mt-6 mx-auto" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="glass-panel p-6 opacity-30">
                <div className="h-32 flex items-center justify-center">
                  <FloatGlyph 
                    type={['refusal', 'compass', 'rift', 'sigil'][item - 1] as any} 
                    size="md" 
                  />
                </div>
                <div className="h-6 w-3/4 bg-white/10 rounded mt-4"></div>
                <div className="h-4 w-1/2 bg-white/10 rounded mt-2"></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
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

export default Archive;
