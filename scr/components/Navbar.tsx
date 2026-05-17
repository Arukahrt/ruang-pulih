import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Shield, Brain, MessageCircle, BookOpen, HelpCircle, Menu, X, Lock } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Shield },
  { name: 'Counseling', path: '/counseling', icon: MessageCircle },
  { name: 'Assessment', path: '/assessment', icon: Brain },
  { name: 'Education', path: '/education', icon: BookOpen },
  { name: 'FAQ', path: '/faq', icon: HelpCircle },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative group",
                    isActive ? "text-primary-sage" : "text-text-muted hover:text-text-main hover:bg-primary-sage/5"
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
              to="/report"
              className="ml-4 btn-soft bg-primary-sage text-white hover:bg-primary-sage/90 shadow-md shadow-primary-sage/20"
            >
              Report Harassment
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
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary-sage/10 text-primary-sage"
                        : "text-text-muted hover:bg-primary-sage/5 hover:text-text-main"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/report"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary-sage text-white text-sm font-semibold"
              >
                <Lock size={18} />
                Report Harassment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
