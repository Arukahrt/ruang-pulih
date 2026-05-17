import { motion } from 'motion/react';
import { BookOpen, Search, ArrowRight, Clock, Star, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

const articles = [
  {
    category: 'Digital Awareness',
    title: 'Mengenal Online Sexual Harassment: Ketika Pelecehan Terjadi di Balik Layar',
    excerpt: 'Online sexual harassment adalah segala bentuk pelecehan seksual melalui ruang digital. Ia terjadi di balik layar, tapi lukanya tidak kalah nyata. Kenali bentuk-bentuknya: cyberbullying berbasis seksual, sextortion, penyebaran konten intim tanpa izin, hingga stalking digital.',
    author: 'Tim Ruang Pulih Online',
    readTime: '4 menit',
    image: 'https://picsum.photos/seed/rp-osh/600/400'
  },
  {
    category: 'Mental Health',
    title: 'Luka yang Tak Selalu Terlihat: Dampak Psikologis Online Sexual Harassment',
    excerpt: 'Luka dari pelecehan digital itu nyata — sama nyatanya dengan luka di dunia fisik. Korban bisa mengalami kecemasan intens, perasaan sedih berkepanjangan, gejala trauma, hingga rasa malu yang menggerus kepercayaan diri. Memahami dampak ini penting agar dukungan yang diberikan benar-benar tepat.',
    author: 'Tim Ruang Pulih Online',
    readTime: '4 menit',
    image: 'https://picsum.photos/seed/rp-luka/600/400'
  },
  {
    category: 'Self Care',
    title: 'Berhenti Menyalahkan Korban: Memahami Stigma dan Mengapa Itu Berbahaya',
    excerpt: 'Victim blaming terjadi ketika masyarakat menempatkan beban tanggung jawab atas kekerasan kepada korban, bukan pelaku. Stigma ini memperburuk trauma, membungkam korban, dan melanggengkan kekerasan itu sendiri. Pelajari cara merespons korban dengan empati yang sesungguhnya.',
    author: 'Tim Ruang Pulih Online',
    readTime: '4 menit',
    image: 'https://picsum.photos/seed/rp-stigma/600/400'
  },
  {
    category: 'Digital Safety',
    title: 'Menjaga Diri di Ruang Digital: Langkah-langkah yang Bisa Dimulai Hari Ini',
    excerpt: 'Melindungi diri adalah hak, bukan syarat untuk layak dihormati. Mulai dari meninjau pengaturan privasi, menjaga informasi pribadi, mengamankan akun, hingga langkah yang perlu diambil ketika situasi sudah terasa mengancam — panduan praktis untuk merasa lebih aman secara digital.',
    author: 'Tim Ruang Pulih Online',
    readTime: '5 menit',
    image: 'https://picsum.photos/seed/rp-aman/600/400'
  },
  {
    category: 'Digital Safety',
    title: 'Mengenal Batasan di Dunia Digital: Interaksi yang Sehat di Media Sosial',
    excerpt: 'Batasan digital adalah batas yang kita tetapkan tentang bagaimana orang lain boleh berinteraksi dengan kita secara online. Kamu tidak berutang respons, penjelasan, atau kehadiranmu di ruang digital kepada siapa pun. Menentukan batasan bukan tanda kelemahan — itu bentuk mengenal dan menghargai diri sendiri.',
    author: 'Tim Ruang Pulih Online',
    readTime: '5 menit',
    image: 'https://picsum.photos/seed/rp-batas/600/400'
  },
  {
    category: 'Digital Safety',
    title: 'Membangun Batasan Sehat di Media Sosial',
    excerpt: 'Cara menjaga privasi dan kesehatan mental Anda dari interaksi digital yang toksik.',
    author: 'Tim Psikolog',
    readTime: '5 menit',
    image: 'https://picsum.photos/seed/ed1/600/400'
  },
  {
    category: 'Mental Health',
    title: 'Pulih dari Trauma Kekerasan Seksual Online',
    excerpt: 'Langkah awal untuk mengenali trauma dan cara mencari dukungan profesional yang tepat.',
    author: 'Konselor Ruang Pulih',
    readTime: '8 menit',
    image: 'https://picsum.photos/seed/ed2/600/400'
  },
  {
    category: 'Self Care',
    title: 'Tips Detoks Digital untuk Ketenangan Pikiran',
    excerpt: 'Sederet aktivitas offline yang bisa membantu mengembalikan keseimbangan emosional Anda.',
    author: 'Ahli Wellbeing',
    readTime: '4 menit',
    image: 'https://picsum.photos/seed/ed3/600/400'
  },
  {
    category: 'Digital Awareness',
    title: 'Mengenali Bentuk-Bentuk Sextortion',
    excerpt: 'Edukasi mendalam tentang apa itu sextortion dan bagaimana cara melaporkannya.',
    author: 'Divisi Edukasi',
    readTime: '6 menit',
    image: 'https://picsum.photos/seed/ed4/600/400'
  }
];

const categories = ['Semua', 'Digital Safety', 'Mental Health', 'Self Care', 'Digital Awareness'];

export default function Education() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCategory = activeCategory === 'Semua' || a.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="max-w-2xl">
          <div className="inline-block p-3 bg-primary-sage/20 text-primary-sage rounded-2xl mb-6">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl mb-6">Edukasi <span className="italic text-primary-sage">Digital</span></h1>
          <p className="text-lg text-text-muted">
            Bekali diri Anda dengan pengetahuan untuk berinteraksi secara sehat dan aman di ruang digital.
          </p>
        </div>
        
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-12 py-4 rounded-2xl bg-white border border-primary-sage/10 focus:ring-2 focus:ring-primary-sage/30 card-shadow"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        <div className="p-3 bg-white rounded-xl card-shadow mr-2">
          <Filter size={18} className="text-primary-sage" />
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-primary-sage text-white shadow-lg shadow-primary-sage/20' 
                : 'bg-white text-text-muted hover:bg-base-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <p className="text-center text-text-muted py-16">Tidak ada artikel yang cocok dengan pencarian Anda.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredArticles.map((article, index) => (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden card-shadow hover:translate-y-[-4px] transition-all duration-500 border border-transparent hover:border-primary-sage/10"
          >
            <div className="md:w-2/5 relative overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-sage">
                {article.category}
              </div>
            </div>
            <div className="md:w-3/5 p-8 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-text-muted mb-4 uppercase font-bold tracking-widest">
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
                <span className="flex items-center gap-1"><Star size={14} fill="currentColor" /> Favorit</span>
              </div>
              <h3 className="text-xl md:text-2xl mb-4 group-hover:text-primary-sage transition-colors">{article.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">{article.excerpt}</p>
              <div className="pt-6 border-t border-primary-sage/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-sage/10 flex items-center justify-center text-primary-sage font-bold text-xs">
                    {article.author.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-text-main">{article.author}</span>
                </div>
                <button className="text-primary-sage p-2 rounded-full hover:bg-primary-sage/10 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[3rem] bg-primary-lavender/10 border border-primary-lavender/20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl mb-4 font-serif text-text-main">Membutuhkan Bantuan Khusus?</h2>
          <p className="text-text-muted">Tim kami siap membantu Anda memahami kondisi yang Anda alami secara lebih mendalam melalui sesi tanya jawab privat.</p>
        </div>
        <button className="btn-soft bg-primary-lavender text-white shadow-lg shadow-primary-lavender/20 px-10 whitespace-nowrap">
          Tanya Konselor
        </button>
      </div>
    </div>
  );
}
