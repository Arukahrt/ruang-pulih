import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Shield, Brain, MessageCircle, BookOpen, PlayCircle, HelpCircle, Menu, X, BookMarked } from 'lucide-react';

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

  const isArticleActive =
    location.pathname === '/education' ||
    (location.pathname.startsWith('/education/') && location.pathname !== '/education/video');
  const isVideoActive = location.pathname === '/education/video';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base-cream/80 backdrop-blur-md border-b border-primary-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group" onClick={() => setMenuOpen(false)}>
            <div className="w-10 h-10 bg-primary-sage rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Shield size={24} />
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-text-main block leading-tight">Ruang Pulih</span>
              <span className="text-xs font-sans text-primary-sage font-medium tracking-wider uppercase">Online</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {/* Home & Assessment */}
            {navItems.slice(0, 2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative group',
                    isActive ? 'text-primary-sage' : 'text-text-muted hover:text-text-main hover:bg-primary-sage/5'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-sage"
                    />
                  )}
                </Link>
              );
            })}

            {/* Edukasi group */}
            <div className="flex items-center gap-0.5 mx-1 px-2 py-1 rounded-2xl bg-primary-sage/5 border border-primary-sage/10">
              <span className="text-[11px] font-bold text-text-muted/50 uppercase tracking-wider pr-2">Edukasi</span>
              {educationItems.map((item) => {
                const isActive = item.path === '/education' ? isArticleActive : isVideoActive;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-white text-primary-sage shadow-sm'
                        : 'text-text-muted hover:text-text-main hover:bg-white/60'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Jurnal & FAQ */}
            {navItems.slice(2).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative group',
                    isActive ? 'text-primary-sage' : 'text-text-muted hover:text-text-main hover:bg-primary-sage/5'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-sage"
                    />
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

          <button
            className="md:hidden p-2 rounded-xl text-text-muted hover:bg-primary-sage/10 hover:text-primary-sage transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
              {/* Home & Assessment */}
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

              {/* Mobile: Edukasi group */}
              <div className="mt-1 mb-1">
                <span className="px-4 text-[10px] font-bold text-text-muted/40 uppercase tracking-widest">Edukasi</span>
                {educationItems.map((item) => {
                  const isActive = item.path === '/education' ? isArticleActive : isVideoActive;
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
              </div>

              {/* Jurnal & FAQ */}
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
