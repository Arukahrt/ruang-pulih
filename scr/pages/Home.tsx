import { motion } from 'motion/react';
import { Shield, MessageCircle, Brain, BookOpen, ArrowRight, Heart, Users, Lock, Clock, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const services = [
  {
    title: 'Konseling Online',
    description: 'Bicara dengan konselor berpengalaman dalam ruang aman dan privat.',
    icon: MessageCircle,
    color: 'bg-primary-blue',
    path: '/counseling'
  },
  {
    title: 'Asesmen Emosional',
    description: 'Pahami kondisi emosional Anda melalui screening awal yang informatif.',
    icon: Brain,
    color: 'bg-primary-sage',
    path: '/assessment'
  },
  {
    title: 'Laporan Anonim',
    description: 'Ceritakan pengalaman Anda tanpa rasa takut akan identitas Anda.',
    icon: Lock,
    color: 'bg-primary-lavender',
    path: '/report'
  },
  {
    title: 'Edukasi Digital',
    description: 'Pelajari cara melindungi diri dan berinteraksi sehat di media sosial.',
    icon: BookOpen,
    color: 'bg-primary-sage',
    path: '/education'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-12">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-sage/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-sage/10 text-primary-sage text-xs font-semibold uppercase tracking-wider mb-6">
              <Heart size={14} />
              <span>Ruang Aman Untukmu</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Tempat Aman untuk <span className="text-primary-sage">Pulih</span> dan <span className="text-primary-blue italic">Didengar</span>
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Ruang Pulih Online mendukung Anda dalam menghadapi pelecehan seksual online dan stigmatisasi melalui layanan digital yang aman, anonim, dan penuh empati.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/counseling" className="btn-soft bg-primary-sage text-white shadow-xl shadow-primary-sage/20 px-8 py-4 text-lg">
                Mulai Berbagi
              </Link>
              <Link to="/education" className="btn-soft bg-white text-text-main border border-primary-sage/20 hover:bg-primary-sage/5 px-8 py-4 text-lg">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden card-shadow bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&h=500&q=80"
                alt="Safe healing space"
                className="rounded-[2.8rem] w-full h-[500px] object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute bottom-8 left-8 right-8 glass-morphism rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-sage text-white p-3 rounded-2xl">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Keamanan Prioritas Kami</h4>
                    <p className="text-sm text-text-muted">Data dan privasi Anda sepenuhnya terlindungi secara end-to-end.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Abstract shapes behind image */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-lavender/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary-blue/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-6">Layanan Yang Kami <span className="italic">Berikan</span></h2>
            <p className="text-text-muted max-w-2xl mx-auto">Kami menyediakan berbagai layanan responsif dan edukatif untuk membantu proses pemulihan dan pencegahan Anda.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="group p-8 rounded-[2.5rem] bg-base-cream/50 border border-primary-sage/5 hover:bg-white hover:border-primary-sage/20 hover:card-shadow transition-all duration-500 flex flex-col"
              >
                <div className={`w-14 h-14 ${service.color} text-white rounded-2xl flex items-center justify-center mb-8 transform transition-transform group-hover:rotate-6`}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                <Link to={service.path} className="flex items-center text-primary-sage font-semibold group/link">
                  Selengkapnya <ArrowRight size={18} className="ml-2 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-base-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=400&h=256&q=80" className="rounded-3xl h-64 w-full object-cover" alt="Support" crossOrigin="anonymous" />
                <img src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=400&h=160&q=80" className="rounded-3xl h-40 w-full object-cover" alt="Support" crossOrigin="anonymous" />
              </div>
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=400&h=160&q=80" className="rounded-3xl h-40 w-full object-cover" alt="Support" crossOrigin="anonymous" />
                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=256&q=80" className="rounded-3xl h-64 w-full object-cover" alt="Support" crossOrigin="anonymous" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl mb-8">Memahami Isu <span className="text-primary-sage">Digital</span></h2>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                Pelecehan seksual online, cyberbullying, sextortion, dan stigmatisasi korban terus meningkat, terutama di kalangan remaja dan mahasiswa. Hal ini seringkali menyebabkan ketakutan, trauma, dan keinginan untuk menarik diri dari sosial.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Heart, text: "Empati dan Pemulihan Tanpa Menghakimi" },
                  { icon: Lock, text: "Privasi dan Keamanan Identitas Terjamin" },
                  { icon: Users, text: "Komunitas Pendukung yang Saling Menguatkan" }
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-sage shadow-sm">
                      <point.icon size={20} />
                    </div>
                    <span className="font-medium text-text-main">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Preview Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4">Artikel <span className="italic text-primary-sage">Edukasi</span></h2>
              <p className="text-text-muted max-w-xl">Bacaan ringan namun bermakna untuk memahami isu digital, melindungi diri, dan merawat kesehatan mental.</p>
            </div>
            <Link to="/education" className="flex items-center gap-2 text-primary-sage font-semibold whitespace-nowrap group">
              Lihat Semua Artikel <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-base-cream/50 rounded-[2.5rem] overflow-hidden hover:bg-white hover:card-shadow transition-all duration-500 border border-transparent hover:border-primary-sage/10"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-sage">
                    {article.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-3 uppercase font-bold tracking-widest">
                    <Clock size={12} /> {article.readTime}
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary-sage transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{article.excerpt}</p>
                  <Link
                    to={`/education/${article.id}`}
                    className="flex items-center gap-2 text-primary-sage text-sm font-semibold group/link"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Jurnal Referensi Banner */}
      <section className="py-16 bg-base-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-[3rem] p-10 md:p-14 card-shadow border border-primary-lavender/10">
            <div className="w-16 h-16 bg-primary-lavender/20 text-primary-lavender rounded-3xl flex items-center justify-center flex-shrink-0">
              <BookMarked size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Jurnal Referensi Akademik</h3>
              <p className="text-text-muted leading-relaxed">Kumpulan jurnal ilmiah terpilih seputar pelecehan seksual online, psikologi korban, hukum siber, dan pemulihan trauma — untuk pemahaman yang lebih dalam.</p>
            </div>
            <Link to="/jurnal" className="btn-soft bg-primary-lavender text-white shadow-lg shadow-primary-lavender/20 px-10 whitespace-nowrap flex-shrink-0">
              Lihat Jurnal
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-primary-sage rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-sage/30">
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl text-white mb-8">Anda Tidak Sendirian. <br/><span className="italic opacity-90 text-primary-lavender">Cerita Anda Aman di Sini.</span></h2>
              <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto">
                Berikan diri Anda kesempatan untuk pulih. Kami sedia mendengarkan kapan pun Anda merasa siap.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/counseling" className="btn-soft bg-white text-primary-sage hover:bg-base-cream shadow-lg text-lg px-10">
                  Konsultasi Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
