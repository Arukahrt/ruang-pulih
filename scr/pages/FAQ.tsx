import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, MessageCircle, Shield, Lock, Users } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "Apakah identitas saya benar-benar anonim?",
    answer: "Ya, kami menjamin kerahasiaan identitas Anda. Untuk laporan anonim, kami tidak menyimpan data pribadi Anda. Untuk konseling, data hanya digunakan untuk keperluan pendampingan dan dilindungi enkripsi.",
    icon: Lock
  },
  {
    question: "Bagaimana cara memulai sesi konseling?",
    answer: "Anda dapat memilih menu 'Konseling Online', memilih format sesi (video/suara/tulisan), mengisi jadwal yang tersedia, dan tim kami akan mengirimkan konfirmasi melalui email.",
    icon: MessageCircle
  },
  {
    question: "Layanan ini gratis atau berbayar?",
    answer: "Sebagian besar layanan edukasi dan laporan anonim tersedia secara gratis. Untuk sesi konseling profesional, terdapat skema subsidi bagi mahasiswa dan remaja yang membutuhkan.",
    icon: Shield
  },
  {
    question: "Apa yang harus saya lakukan saat darurat?",
    answer: "Jika Anda berada dalam situasi berbahaya secara fisik atau emosional yang sangat mendesak, silakan hubungi hotline darurat nasional di 129 atau kunjungi fasilitas kesehatan terdekat.",
    icon: Users
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <div className="inline-block p-3 bg-primary-sage/20 text-primary-sage rounded-2xl mb-6">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl mb-6">Pertanyaan <span className="italic uppercase tracking-widest text-xs font-bold text-primary-sage block mt-2">Umum</span></h1>
        <p className="text-lg text-text-muted">
          Cari tahu lebih lanjut tentang cara kerja Ruang Pulih Online dan bagaimana kami melindungi Anda.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className={cn(
              "rounded-[2rem] transition-all duration-300 border overflow-hidden",
              openIndex === idx ? "bg-white border-primary-sage/20 card-shadow" : "bg-base-cream border-transparent hover:bg-white"
            )}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-8 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                  openIndex === idx ? "bg-primary-sage text-white" : "bg-white text-text-muted group-hover:text-primary-sage"
                )}>
                  <faq.icon size={22} />
                </div>
                <span className="font-bold text-lg md:text-xl text-text-main">{faq.question}</span>
              </div>
              <ChevronDown 
                size={20} 
                className={cn("text-text-muted transition-transform duration-300", openIndex === idx && "rotate-180")} 
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-8 pb-8 pt-0 ml-18 text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[3.5rem] bg-primary-blue text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <h2 className="text-3xl mb-4 text-white">Masih Memiliki Pertanyaan?</h2>
        <p className="opacity-90 max-w-xl mx-auto mb-10">
          Tim pendukung kami siap membantu Anda memberikan penjelasan lebih lanjut melalui chat langsung.
        </p>
        <button className="btn-soft bg-white text-primary-blue px-12 py-4 font-bold shadow-xl">
          Hubungi Kami
        </button>
      </div>
    </div>
  );
}
