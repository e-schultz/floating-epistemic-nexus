
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatGlyph from './FloatGlyph';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Origin', path: '/' },
    { name: 'Archive', path: '/archive' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3 ${
          isScrolled ? 'bg-float-dark/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <FloatGlyph type="core" size="sm" animated />
            <span className="font-medium tracking-wider text-lg">FLOAT</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 transition-colors duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span 
              className="w-6 h-0.5 bg-white rounded-full block"
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-white rounded-full block"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-white rounded-full block"
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-float-dark/95 backdrop-blur-lg border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col py-4 px-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `py-3 px-4 rounded-lg transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from hiding under the fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;
