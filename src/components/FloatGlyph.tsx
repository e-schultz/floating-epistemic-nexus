
import React from 'react';
import { cn } from '@/lib/utils';

type GlyphType = 
  | 'refusal' 
  | 'compass' 
  | 'circle' 
  | 'rift' 
  | 'sigil' 
  | 'triune' 
  | 'core';

interface FloatGlyphProps {
  type: GlyphType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

const glyphMap: Record<GlyphType, string> = {
  refusal: '⟁',     // The Refusal That Reveals
  compass: '⇱',     // The Compass That Remembers
  circle: '⟁⟁',    // The Circle That Compiles
  rift: '⟟⟍',       // The Rift That Reads Back
  sigil: '⧉',       // The Sigil of Structured Disobedience
  triune: '⟁⇱⧉',   // The Triune Echo
  core: '⚹',        // FLOAT Itself (unnamed)
};

const sizeMap = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
};

export const FloatGlyph: React.FC<FloatGlyphProps> = ({
  type,
  size = 'md',
  animated = false,
  interactive = false,
  className,
}) => {
  return (
    <span 
      className={cn(
        'inline-block font-mono glyph-shadow tracking-wider',
        sizeMap[size],
        animated && 'animate-glyph-pulse',
        interactive && 'cursor-pointer hover:text-white transition-colors duration-300',
        className
      )}
      aria-label={`FLOAT glyph: ${type}`}
    >
      {glyphMap[type]}
    </span>
  );
};

export default FloatGlyph;
