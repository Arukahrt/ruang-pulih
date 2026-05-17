import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Sparkles, Upload, Send, ShieldCheck, Heart, X } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  'Cyberbullying',
  'Pelecehan Seksual Online',
  'Sextortion',
  'Stigma Sosial',
  'Victim Blaming',
  'Lainnya'
];

export default function AnonymousReport() {
  const [submitted, setSubmitted] = useState(false);
  const [identityMode, setIdentityMode] = useState<'anon' | 'known'>('anon');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-16 card-shadow"
        >
          <div className="w-20 h-20 bg-primary-sage/10 text-primary-sage rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-serif mb-4">Terima Kasih Telah Berbagi</h2>
          <p className="text-text-muted mb-10 text-lg leading-relaxed">
            Cerita Anda telah kami terima secara aman. Langkah Anda untuk bersuara adalah bentuk keberanian yang luar biasa. Tim kami akan meninjau laporan ini dengan penuh kerahasiaan.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-soft bg-base-cream text-text-main px-10"
          >
            Kirim Laporan Lain
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-block p-3 bg-primary-lavender/20 text-primary-lavender rounded-2xl mb-6">
          <Lock size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl mb-6">Laporan <span className="italic">Anonim</span></h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Suara Anda berharga. Di sini, Anda memiliki ruang untuk berbagi pengalaman tanpa rasa takut akan identitas Anda terungkap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 card-shadow space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Metode Identitas</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setIdentityMode('anon')}
                  className={cn(
                    "p-4 rounded-2xl border-2 flex items-center justify-center gap-3 font-semibold transition-all",
                    identityMode === 'anon' 
                      ? "bg-primary-sage/10 border-primary-sage text-primary-sage"
                      : "bg-base-cream border-transparent text-text-muted"
                  )}
                >
                  <Lock size={18} /> Anonim
                </button>
                <button
                  type="button"
                  onClick={() => setIdentityMode('known')}
                  className={cn(
                    "p-4 rounded-2xl border-2 flex items-center justify-center gap-3 font-semibold transition-all",
                    identityMode === 'known' 
                      ? "bg-primary-blue/10 border-primary-blue text-primary-blue"
                      : "bg-base-cream border-transparent text-text-muted"
                  )}
                >
                  <Sparkles size={18} /> Gunakan Nama
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Kategori Masalah</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                      selectedCategories.includes(cat)
                        ? "bg-primary-sage text-white border-primary-sage"
                        : "border-primary-sage/20 text-text-muted hover:bg-primary-sage/5 hover:border-primary-sage"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Ceritakan Pengalaman Anda</label>
              <textarea 
                required
                className="w-full h-48 rounded-3xl bg-base-cream border-none focus:ring-2 focus:ring-primary-sage/30 p-6 text-text-main placeholder:text-text-muted/50 resize-none transition-all"
                placeholder="Bagikan apa yang terjadi, kapan saja Anda merasa siap..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-text-muted uppercase tracking-wider">Unggah Bukti (Opsional)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary-sage/20 rounded-3xl p-10 text-center hover:bg-primary-sage/5 transition-all group cursor-pointer"
              >
                <Upload className="mx-auto text-primary-sage/40 mb-4 group-hover:text-primary-sage group-hover:-translate-y-1 transition-all" size={32} />
                <p className="text-sm text-text-muted">Klik untuk pilih file atau seret file ke sini</p>
                <p className="text-[10px] text-text-muted/60 mt-2 uppercase tracking-widest">PNG, JPG atau PDF (Maks 10MB)</p>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-base-cream rounded-xl text-xs font-medium text-text-main">
                      <span className="max-w-[160px] truncate">{file.name}</span>
                      <button type="button" onClick={() => removeFile(i)} className="text-text-muted hover:text-red-400 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full btn-soft bg-primary-sage text-white text-lg py-5 shadow-lg shadow-primary-sage/20 inline-flex items-center justify-center gap-3 group"
            >
              Kirim Laporan Secara Aman <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-primary-blue/10 rounded-[2.5rem] p-8 border border-primary-blue/20">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-blue shadow-sm mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Privasi Anda Utama</h3>
            <p className="text-sm text-text-muted leading-relaxed italic">
              "Anda berada di tempat yang aman. Setiap kata yang Anda bagikan dienkripsi dan hanya akan diakses untuk keperluan pendampingan jika Anda memberikannya izin."
            </p>
          </div>

          <div className="bg-primary-sage/10 rounded-[2.5rem] p-8 border border-primary-sage/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart size={20} className="text-primary-sage" /> Dukungan Segera
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-sage mt-1.5" />
                <span>Hotline 24 Jam: 129</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-sage mt-1.5" />
                <span>Konsultasi Psikologis Gratis</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-sage mt-1.5" />
                <span>Pendampingan Hukum Awal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
