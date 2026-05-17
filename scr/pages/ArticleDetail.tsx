import { motion } from 'motion/react';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { articles } from '../data/articles';

const categoryColors: Record<string, string> = {
  'Digital Safety': 'bg-primary-sage/15 text-primary-sage',
  'Mental Health': 'bg-primary-blue/15 text-primary-blue',
  'Self Care': 'bg-primary-lavender/20 text-primary-lavender',
  'Digital Awareness': 'bg-amber-100 text-amber-700',
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) return <Navigate to="/education" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/education"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-sage transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Edukasi
        </Link>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-base-cream text-text-muted'}`}>
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Clock size={13} /> {article.readTime}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <User size={13} /> {article.author}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl leading-tight mb-8">{article.title}</h1>

        <div className="rounded-[2.5rem] overflow-hidden mb-12 card-shadow">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-72 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <article className="prose-custom space-y-5">
          {article.content.map((block, i) =>
            block.type === 'heading' ? (
              <h2 key={i} className="text-xl md:text-2xl font-bold text-text-main mt-10 mb-2">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="text-text-muted leading-relaxed text-base md:text-lg">
                {block.text}
              </p>
            )
          )}
        </article>

        <div className="mt-16 p-8 rounded-[2.5rem] bg-primary-sage/5 border border-primary-sage/10 text-center">
          <p className="text-text-muted mb-6">Butuh dukungan lebih lanjut? Konseling tersedia kapan pun kamu siap.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/counseling" className="btn-soft bg-primary-sage text-white px-8">
              Mulai Konseling
            </Link>
            <Link to="/assessment" className="btn-soft bg-white text-text-main border border-primary-sage/20 px-8">
              Cek Kondisi Emosi
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/education"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-sage transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Lihat artikel lainnya
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
