import { motion } from 'motion/react';
import { PlayCircle, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { videos } from '../data/videos';

const categories = ['Semua', 'Digital Safety', 'Mental Health', 'Self Care', 'Digital Awareness'];

export default function Video() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => activeCategory === 'Semua' || v.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="max-w-2xl">
          <div className="inline-block p-3 bg-primary-sage/20 text-primary-sage rounded-2xl mb-6">
            <PlayCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl mb-6">Video <span className="italic text-primary-sage">Edukasi</span></h1>
          <p className="text-lg text-text-muted">
            Konten video pilihan untuk membantu kamu memahami keamanan digital, pemulihan emosi, dan melawan victim blaming.
          </p>
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

      {filteredVideos.length === 0 && (
        <p className="text-center text-text-muted py-16">Tidak ada video untuk kategori ini.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredVideos.map((video, index) => (
          <motion.article
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] overflow-hidden card-shadow hover:translate-y-[-4px] transition-all duration-500 border border-transparent hover:border-primary-sage/10"
          >
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            <div className="p-8">
              <div className="inline-block px-3 py-1 bg-primary-sage/10 text-primary-sage text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                {video.category}
              </div>
              <h3 className="text-xl md:text-2xl mb-3">{video.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{video.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[3rem] bg-primary-lavender/10 border border-primary-lavender/20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl mb-4 font-serif text-text-main">Membutuhkan Bantuan Khusus?</h2>
          <p className="text-text-muted">Tim kami siap membantu kamu melalui sesi tanya jawab privat yang aman dan tanpa penghakiman.</p>
        </div>
        <a href="/counseling" className="btn-soft bg-primary-lavender text-white shadow-lg shadow-primary-lavender/20 px-10 whitespace-nowrap">
          Tanya Konselor
        </a>
      </div>
    </div>
  );
}
