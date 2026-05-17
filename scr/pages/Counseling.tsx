import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Clock, Calendar, Video, Phone, MessageSquare, Shield } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const formats = [
  { id: 'video', name: 'Video Call', icon: Video, desc: 'Tatap muka virtual secara real-time.' },
  { id: 'audio', name: 'Voice Call', icon: Phone, desc: 'Percakapan suara tanpa video.' },
  { id: 'chat', name: 'Chat', icon: MessageSquare, desc: 'Interaksi berbasis teks yang santai.' },
];

const WA_NUMBER = '6283115601410';

function buildWhatsAppURL(data: {
  nickname: string;
  email: string;
  category: string;
  format: string;
  date: string;
  time: string;
  notes: string;
}) {
  const formatLabel: Record<string, string> = {
    video: 'Video Call',
    audio: 'Voice Call',
    chat: 'Chat',
  };
  const message = [
    'Halo, saya ingin melakukan konseling melalui Ruang Pulih Online.',
    '',
    `*Nama Panggilan:* ${data.nickname}`,
    `*Email:* ${data.email}`,
    `*Kategori Masalah:* ${data.category}`,
    `*Format Sesi:* ${formatLabel[data.format] ?? data.format}`,
    `*Tanggal:* ${data.date}`,
    `*Waktu:* ${data.time}`,
    data.notes ? `*Catatan:* ${data.notes}` : '',
    '',
    'Terima kasih.',
  ]
    .filter((line) => line !== undefined)
    .join('\n');

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Counseling() {
  const [format, setFormat] = useState('video');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Pelecehan Seksual Online');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppURL({ nickname, email, category, format, date, time, notes });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-block p-3 bg-primary-blue/20 text-primary-blue rounded-2xl mb-6">
          <MessageCircle size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl mb-6">Konseling <span className="italic">Pribadi</span></h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Temukan dukungan dari ahli profesional. Semua sesi dirancang untuk keamanan emosional dan kerahasiaan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif">Pilih Format Sesi</h2>
            <div className="grid grid-cols-1 gap-4">
              {formats.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex items-center gap-6 transition-all text-left",
                    format === f.id
                      ? "bg-white border-primary-blue shadow-lg"
                      : "bg-base-cream/50 border-transparent hover:bg-white hover:border-primary-blue/20"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    format === f.id ? "bg-primary-blue text-white" : "bg-white text-text-muted"
                  )}>
                    <f.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">{f.name}</h4>
                    <p className="text-sm text-text-muted">{f.desc}</p>
                  </div>
                  {format === f.id && <div className="ml-auto w-3 h-3 bg-primary-blue rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-primary-sage/10 rounded-[2.5rem] p-10 relative overflow-hidden">
            <Shield className="absolute -bottom-10 -right-10 w-40 h-40 text-primary-sage/10" />
            <h3 className="text-xl font-bold mb-4">Jaminan Kerahasiaan</h3>
            <ul className="space-y-4">
              {[
                "Data sesi tidak akan direkam tanpa izin.",
                "Kerahasiaan identitas 100% terjamin.",
                "Konselor berlisensi dan berpengalaman.",
                "Dukungan teknis responsif 24/7."
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-text-main font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-sage" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-8 md:p-12 card-shadow space-y-8">
          <h3 className="text-2xl font-serif mb-8">Informasi Pemesanan</h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2">Nama Panggilan</label>
                <input
                  type="text"
                  required
                  placeholder="Nama atau Inisial"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-base-cream border-none focus:ring-2 focus:ring-primary-blue/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="email@contoh.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-base-cream border-none focus:ring-2 focus:ring-primary-blue/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2">Kategori Masalah</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-base-cream border-none focus:ring-2 focus:ring-primary-blue/30 text-text-main"
              >
                <option>Pelecehan Seksual Online</option>
                <option>Cyberbullying</option>
                <option>Kecemasan Sosial Digital</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2 flex items-center gap-1">
                  <Calendar size={14} /> Tanggal Sesi
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-base-cream border-none focus:ring-2 focus:ring-primary-blue/30"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2 flex items-center gap-1">
                  <Clock size={14} /> Waktu Sesi
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-base-cream border-none focus:ring-2 focus:ring-primary-blue/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2">Catatan Tambahan (Opsional)</label>
              <textarea
                placeholder="Apa yang ingin Anda sampaikan sebelum sesi dimulai?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 px-6 py-4 rounded-2xl bg-base-cream border-none focus:ring-2 focus:ring-primary-blue/30 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-primary-blue/5 rounded-2xl">
            <input type="checkbox" required className="w-5 h-5 rounded border-primary-blue/30 text-primary-blue focus:ring-primary-blue/30" />
            <label className="text-xs text-text-muted leading-relaxed">Saya memahami bahwa informasi yang saya berikan akan dijaga kerahasiaannya oleh konselor.</label>
          </div>

          <button
            type="submit"
            className="w-full btn-soft bg-primary-blue text-white text-lg py-5 shadow-lg shadow-primary-blue/20 flex items-center justify-center gap-3"
          >
            <MessageCircle size={20} />
            Hubungi Konselor
          </button>

          <p className="text-center text-xs text-text-muted">
            Kamu akan diarahkan ke WhatsApp dengan detail booking yang sudah terisi otomatis.
          </p>
        </form>
      </div>
    </div>
  );
}
