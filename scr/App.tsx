import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import AnonymousReport from './pages/AnonymousReport';
import Counseling from './pages/Counseling';
import Education from './pages/Education';
import FAQ from './pages/FAQ';
import Jurnal from './pages/Jurnal';

function PanicExitButton() {
  const handleExit = () => {
    window.location.replace('https://www.google.com');
  };
  return (
    <button
      onClick={handleExit}
      title="Tutup halaman ini sekarang"
      className="fixed bottom-6 right-6 z-[9999] bg-white text-text-muted border border-primary-sage/20 shadow-lg rounded-full px-4 py-2 text-xs font-semibold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-200 select-none"
      aria-label="Tutup halaman"
    >
      ✕ Tutup
    </button>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <PanicExitButton />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/report" element={<AnonymousReport />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/education" element={<Education />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/jurnal" element={<Jurnal />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-primary-sage/10 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="font-serif text-xl mb-4 text-text-main">Ruang Pulih Online</h3>
            <p className="text-text-muted max-w-lg mx-auto text-sm leading-relaxed">
              Sebuah ruang aman digital untuk pemulihan, edukasi, dan dukungan bagi korban kekerasan seksual online dan stigmatisasi di media sosial.
            </p>
            <div className="mt-8 pt-8 border-t border-primary-sage/5 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted gap-4">
              <p>© 2026 Ruang Pulih Online. Semua hak dilindungi.</p>
              <div className="flex gap-6">
                <a href="/faq" className="hover:text-primary-sage transition-colors">Privacy Policy</a>
                <a href="/faq" className="hover:text-primary-sage transition-colors">Terms of Service</a>
                <a href="tel:119" className="hover:text-primary-sage transition-colors">Emergency Hotline: 119 ext 8</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

