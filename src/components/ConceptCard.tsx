
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatGlyph from './FloatGlyph';
import { cn } from '@/lib/utils';

export interface ConceptData {
  id: number;
  title: string;
  glyph: 'refusal' | 'compass' | 'circle' | 'rift' | 'sigil' | 'triune' | 'core';
  description: string;
  visual: string;
  core: string;
}

interface ConceptCardProps {
  concept: ConceptData;
  index: number;
  className?: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, index, className }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/concept/${concept.id}`);
  };

  return (
    <motion.div
      className={cn("concept-card", className)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono px-2 py-1 rounded-full bg-white/10 text-white/80">
            {index + 1}.
          </span>
          <h3 className="text-lg font-medium tracking-tight">{concept.title}</h3>
        </div>
        <FloatGlyph type={concept.glyph} animated={false} interactive size="sm" />
      </div>
      
      <p className="text-sm text-white/70 line-clamp-2 mb-4">
        {concept.description}
      </p>
      
      <div className="absolute bottom-3 right-3 opacity-50">
        <span className="text-xs font-mono text-white/40">FLOAT</span>
      </div>
    </motion.div>
  );
};

export default ConceptCard;
