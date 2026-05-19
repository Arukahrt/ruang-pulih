import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Shield, Brain, MessageCircle, BookOpen, PlayCircle, HelpCircle, Menu, X, BookMarked, ChevronDown } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Shield },
  { name: 'Assessment', path: '/assessment', icon: Brain },
  { name: 'Jurnal Referensi', path: '/jurnal', icon: BookMarked },
  { name: 'FAQ', path: '/faq', icon: HelpCircle },
];

const educationItems = [
  { name: 'Artikel', path: '/education', icon: BookOpen },
  { name: 'Video', path: '/education/video', icon: PlayCircle },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [mobileEduOpen, setMobileEduOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEducationActive =
    location.pathname === '/education' ||
    location.pathname.startsWith('/education/');

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEduOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setEduOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-cream/80 backdrop-blur-md border-b border-primary-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary-sage rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Shield size={24} />
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-text-main block leading-tight">Ruang Pulih</span>
              <span className="text-xs font-sans text-primary-sage font-medium tracking-wider uppercase">Online</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative',
                    isActive ? 'text-primary-sage' : 'text-text-muted hover:text-text-main hover:bg-primary-sage/5'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-sage" />
                  )}
                </Link>
              );
            })}

            {/* Edukasi dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setEduOpen((v) => !v)}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative',
                  isEducationActive ? 'text-primary-sage' : 'text-text-muted hover:text-text-main hover:bg-primary-sage/5'
                )}
              >
                Edukasi
                <ChevronDown
                  size={15}
                  className={cn('transition-transform duration-200', eduOpen ? 'rotate-180' : '')}
                />
                {isEducationActive && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-sage" />
                )}
              </button>

              <AnimatePresence>
                {eduOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-44 bg-white rounded-2xl shadow-lg border border-primary-sage/10 overflow-hidden"
                  >
                    {educationItems.map((item) => {
                      const isActive =
                        item.path === '/education/video'
                          ? location.pathname === '/education/video'
                          : location.pathname === '/education' || (location.pathname.startsWith('/education/') && location.pathname !== '/education/video');
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary-sage/10 text-primary-sage'
                              : 'text-text-muted hover:bg-base-cream hover:text-text-main'
                          )}
                        >
                          <item.icon size={16} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.slice(2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative',
                    isActive ? 'text-primary-sage' : 'text-text-muted hover:text-text-main hover:bg-primary-sage/5'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-sage" />
                  )}
                </Link>
              );
            })}

            <Link
              to="/counseling"
              className="ml-4 btn-soft bg-primary-sage text-white hover:bg-primary-sage/90 shadow-md shadow-primary-sage/20"
            >
              Mulai Konseling
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-text-muted hover:bg-primary-sage/10 hover:text-primary-sage transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-base-cream/95 backdrop-blur-md border-t border-primary-sage/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.slice(0, 2).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                      isActive ? 'bg-primary-sage/10 text-primary-sage' : 'text-text-muted hover:bg-primary-sage/5 hover:text-text-main'
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Edukasi accordion */}
              <div>
                <button
                  onClick={() => setMobileEduOpen((v) => !v)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                    isEducationActive ? 'bg-primary-sage/10 text-primary-sage' : 'text-text-muted hover:bg-primary-sage/5 hover:text-text-main'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <BookOpen size={18} />
                    Edukasi
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn('transition-transform duration-200', mobileEduOpen ? 'rotate-180' : '')}
                  />
                </button>

                <AnimatePresence>
                  {mobileEduOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      {educationItems.map((item) => {
                        const isActive =
                          item.path === '/education/video'
                            ? location.pathname === '/education/video'
                            : location.pathname === '/education' || (location.pathname.startsWith('/education/') && location.pathname !== '/education/video');
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => { setMenuOpen(false); setMobileEduOpen(false); }}
                            className={cn(
                              'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                              isActive ? 'bg-primary-sage/10 text-primary-sage' : 'text-text-muted hover:bg-primary-sage/5 hover:text-text-main'
                            )}
                          >
                            <item.icon size={16} />
                            {item.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.slice(2).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                      isActive ? 'bg-primary-sage/10 text-primary-sage' : 'text-text-muted hover:bg-primary-sage/5 hover:text-text-main'
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}

              <Link
                to="/counseling"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary-sage text-white text-sm font-semibold"
              >
                <MessageCircle size={18} />
                Mulai Konseling
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
