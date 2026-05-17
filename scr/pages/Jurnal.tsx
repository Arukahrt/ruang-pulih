import React from 'react';
import { motion } from 'motion/react';
import { BookMarked, ExternalLink, FileText, Filter, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

type Journal = {
  title: string;
  titleEn?: string;
  authors: string;
  journal: string;
  year: number;
  volume: string;
  abstract: string;
  category: string;
  doi?: string;
  pdf?: string;
};

const journals: Journal[] = [
  {
    title: 'Tantangan Hukum dan Psikologis dalam Penegakan Hukum terhadap Pelecehan dan Intimidasi Online di Media Sosial',
    authors: 'Patisina, Norma Sari',
    journal: 'Ahmad Dahlan Legal Perspective',
    year: 2025,
    volume: 'Vol. 5, No. 1, hlm. 16–34',
    abstract:
      'Artikel ini membahas tantangan utama dalam penegakan hukum terhadap pelecehan dan intimidasi online di Indonesia, serta dampak psikologis yang dialami korban dan strategi intervensi yang digunakan. Solusi yang diusulkan meliputi peningkatan literasi digital, edukasi etika media sosial, dan penguatan kerja sama antara pemerintah, platform, serta lembaga penegak hukum.',
    category: 'Hukum',
    pdf: '/jurnal/patisina-tantangan-hukum-pelecehan-online.pdf',
  },
  {
    title: 'Cyber Sexual Harassment sebagai Bentuk Kekerasan Simbolik Gender di Media Sosial',
    titleEn: 'Cyber Sexual Harassment as Symbolic Gender Violence in Digital Social Platforms',
    authors: 'Deskia Firsatara Shalihat, Abil Al Husain, Kriswandi Sinaga, Aulia Kasih',
    journal: 'SPECTRUM: Journal of Gender and Children Studies',
    year: 2025,
    volume: 'Vol. 5, No. 1, hlm. 19–30',
    abstract:
      'Penelitian ini mengkaji cyber sexual harassment sebagai bentuk kekerasan simbolik berbasis gender menggunakan pendekatan sosiologis dan tinjauan literatur. Temuan menunjukkan bahwa pelecehan seksual online tidak hanya berdampak psikologis pada korban, tetapi juga melegitimasi dominasi melalui simbol, bahasa, dan norma yang dinormalisasi dalam interaksi digital.',
    category: 'Sosiologi',
    pdf: '/jurnal/deskia-cyber-sexual-harassment-kekerasan-simbolik.pdf',
  },
  {
    title: 'Cyber Sexual Harassment di Media Sosial Sebagai Bentuk Penyimpangan Sosial di Era Digital',
    authors: 'Tasya Suci Januri, Siti Komariah, Puspita Wulandari',
    journal: 'SOSIAL HORIZON: Jurnal Pendidikan Sosial',
    year: 2023,
    volume: 'Vol. 10, No. 1, April 2023, hlm. 63–72',
    abstract:
      'Penelitian kualitatif dengan metode systematic literature review ini mengkaji bentuk-bentuk perilaku cyber sexual harassment, faktor penyebab, dan upaya penanggulangannya. Temuan mencakup sexting, non-consensual dissemination of intimate images, dan komentar tidak pantas di media sosial. Upaya penanggulangan meliputi sosialisasi, pengawasan, dan pemberian sanksi.',
    category: 'Sosiologi',
    pdf: '/jurnal/tasya-cyber-sexual-harassment-penyimpangan-sosial.pdf',
  },
  {
    title: 'Mental Health Communication: The Phenomenon of Cyber Sexual Harassment Through Social Media',
    authors: 'Eko Hero, Bunga Astini',
    journal: 'Asian Journal of Media and Communication',
    year: 2023,
    volume: 'Vol. 7, No. 1, 2023',
    abstract:
      'Penelitian ini mengungkap fenomena cyber sexual harassment melalui media sosial dan kaitannya dengan kesehatan mental. Melalui paradigma konstruktivis dan pendekatan kualitatif, hasil penelitian menunjukkan bahwa masyarakat Indonesia belum memiliki pemahaman memadai dalam mengklasifikasikan tindakan cyber sexual harassment, yang berdampak pada gangguan kesehatan mental korban.',
    category: 'Komunikasi',
    doi: '10.20885/asjmc.vol7.iss1.art5',
    pdf: '/jurnal/eko-hero-mental-health-communication.pdf',
  },
  {
    title: 'Perlindungan Hukum terhadap Korban Cyber Sexual Harassment dalam Media Sosial',
    authors: 'Venny Febriyanti Puspita Ningrum, Ufran',
    journal: 'IURIS NOTITIA: Jurnal Ilmu Hukum',
    year: 2023,
    volume: 'Vol. 1, No. 2, Oktober 2023, hlm. 51–55',
    abstract:
      'Penelitian normatif ini menganalisis bentuk perlindungan hukum dan hambatan penanganan korban cyber sexual harassment. Hasil menunjukkan perlindungan hukum diatur dalam UU No. 12 Tahun 2022 tentang Tindak Pidana Kekerasan Seksual, khususnya Pasal 68–70. Hambatan utama adalah implementasi hak-hak korban yang belum optimal dan minimnya perlindungan pemulihan kesehatan mental.',
    category: 'Hukum',
    pdf: '/jurnal/venny-perlindungan-hukum-cyber-sexual-harassment.pdf',
  },
  {
    title: 'Dinamika Psikologis Perempuan Korban Cyber Sexual Harassment',
    authors: 'Dita Aviliani, Faisal Adnan Reza, Nurul Isnaini',
    journal: 'Jurnal Studia Insania',
    year: 2025,
    volume: 'Vol. 13, No. 1, Mei 2025, hlm. 44–65',
    abstract:
      'Penelitian kualitatif dengan pendekatan studi kasus pada lima perempuan usia 18–25 tahun ini mengkaji dampak psikologis cyber sexual harassment. Temuan menunjukkan aspek kognitif (persepsi diri negatif, flashback traumatis), aspek emosional (rasa malu, kecemasan, marah), dan dampak interpersonal (menarik diri, sulit mempercayai orang lain). Dukungan orang terdekat menjadi faktor pemulihan yang krusial.',
    category: 'Psikologi',
    doi: '10.18592/jsi.v13i1.15920',
    pdf: '/jurnal/dita-dinamika-psikologis-korban-cyber-sexual-harassment.pdf',
  },
];

const categories = ['Semua', 'Hukum', 'Psikologi', 'Sosiologi', 'Komunikasi'];

const categoryColors: Record<string, string> = {
  Hukum: 'bg-primary-blue/15 text-primary-blue',
  Psikologi: 'bg-primary-lavender/20 text-primary-lavender',
  Sosiologi: 'bg-primary-sage/15 text-primary-sage',
  Komunikasi: 'bg-amber-100 text-amber-700',
};

export default function Jurnal() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered = useMemo(
    () => (activeCategory === 'Semua' ? journals : journals.filter((j) => j.category === activeCategory)),
    [activeCategory]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-16">
        <div className="inline-block p-3 bg-primary-lavender/20 text-primary-lavender rounded-2xl mb-6">
          <BookMarked size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl mb-6">
          Jurnal <span className="italic text-primary-sage">Referensi</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl">
          Kumpulan jurnal ilmiah sebagai dasar akademis platform Ruang Pulih Online, mencakup perspektif hukum, psikologi, sosiologi, dan komunikasi.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-12">
        <div className="p-3 bg-white rounded-xl card-shadow">
          <Filter size={18} className="text-primary-sage" />
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-primary-sage text-white shadow-lg shadow-primary-sage/20'
                : 'bg-white text-text-muted hover:bg-base-cream'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-sm text-text-muted font-medium">{filtered.length} jurnal</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((journal, i) => {
          const CardWrapper = journal.pdf
            ? ({ children }: { children: React.ReactNode }) => (
                <a href={journal.pdf} target="_blank" rel="noopener noreferrer" className="contents">
                  {children}
                </a>
              )
            : ({ children }: { children: React.ReactNode }) => <>{children}</>;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <CardWrapper>
                <div className={`bg-white rounded-[2.5rem] p-8 card-shadow border border-transparent transition-all duration-300 flex flex-col gap-5 h-full ${journal.pdf ? 'hover:border-primary-sage/20 hover:-translate-y-1 hover:shadow-xl cursor-pointer group' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${categoryColors[journal.category]}`}>
                      {journal.category}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {journal.pdf && <FileText size={14} className="text-primary-sage/50 group-hover:text-primary-sage transition-colors" />}
                      <span className="text-xs text-text-muted font-semibold">{journal.year}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-text-main leading-snug mb-1 group-hover:text-primary-sage transition-colors">{journal.title}</h2>
                    {journal.titleEn && (
                      <p className="text-xs text-text-muted italic">{journal.titleEn}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-2 text-sm text-text-muted">
                    <Users size={15} className="shrink-0 mt-0.5 text-primary-sage" />
                    <span>{journal.authors}</span>
                  </div>

                  <div className="text-xs font-semibold text-primary-sage bg-primary-sage/5 rounded-2xl px-4 py-2">
                    {journal.journal} &mdash; {journal.volume}
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed flex-grow">{journal.abstract}</p>

                  {journal.doi && (
                    <a
                      href={`https://doi.org/${journal.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-primary-blue hover:underline mt-auto w-fit"
                    >
                      <ExternalLink size={14} /> DOI: {journal.doi}
                    </a>
                  )}
                </div>
              </CardWrapper>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 p-12 rounded-[3rem] bg-primary-sage/5 border border-primary-sage/10 text-center">
        <h2 className="text-2xl font-serif mb-4 text-text-main">Ada Referensi Jurnal Lain?</h2>
        <p className="text-text-muted max-w-xl mx-auto text-sm">
          Platform ini terus diperbarui dengan referensi akademis terbaru. Jika kamu memiliki rekomendasi jurnal relevan, hubungi tim kami.
        </p>
      </div>
    </div>
  );
}
