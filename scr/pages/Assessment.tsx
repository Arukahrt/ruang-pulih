import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Info, Shield, Lock, AlertTriangle, Users, BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

type Question = {
  id: number;
  text: string;
  type: 'likert' | 'choice';
  options?: string[];
};

function AssessmentIllustration() {
  const satellites = [
    { x: 140, y: 42, color: '#FF8A65' },
    { x: 216, y: 86, color: '#9b8ec4' },
    { x: 216, y: 174, color: '#7eb5cc' },
    { x: 140, y: 218, color: '#6b8f71' },
    { x: 64, y: 174, color: '#52A08E' },
    { x: 64, y: 86, color: '#e88fb5' },
  ];
  return (
    <svg viewBox="0 0 280 260" className="w-full max-w-xs mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="140" cy="130" r="115" fill="#6b8f71" fillOpacity="0.05" />
      <circle cx="140" cy="130" r="87" fill="#6b8f71" fillOpacity="0.05" />
      {satellites.map((s, i) => (
        <line key={i} x1="140" y1="130" x2={s.x} y2={s.y} stroke={s.color} strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
      {satellites.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="21" fill="white" />
          <circle cx={s.x} cy={s.y} r="21" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1.5" strokeOpacity="0.35" />
          <text x={s.x} y={s.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="700" fill={s.color}>{i + 1}</text>
        </g>
      ))}
      <circle cx="140" cy="130" r="36" fill="#6b8f71" />
      <path d="M127 130 L136 141 L154 119" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const categoryInfo = [
  { icon: AlertTriangle, color: '#FF8A65', bg: '#FF8A650F', title: 'Pengalaman Kekerasan Digital', desc: 'Apakah kamu pernah mengalami situasi tidak nyaman di ruang digital?' },
  { icon: Users,         color: '#9b8ec4', bg: '#9b8ec40F', title: 'Stigmatisasi Korban',           desc: 'Bagaimana respons lingkungan sekitarmu terhadap korban?' },
  { icon: Brain,         color: '#7eb5cc', bg: '#7eb5cc0F', title: 'Dampak Psikologis',              desc: 'Bagaimana kondisi emosional yang kamu rasakan saat ini?' },
  { icon: BookOpen,      color: '#6b8f71', bg: '#6b8f710F', title: 'Pengetahuan & Kesadaran',        desc: 'Seberapa paham kamu tentang keamanan dan hak digitalmu?' },
  { icon: ShieldCheck,   color: '#52A08E', bg: '#52A08E0F', title: 'Perlindungan Diri',              desc: 'Seberapa siap kamu melindungi diri di ruang digital?' },
  { icon: Heart,         color: '#e88fb5', bg: '#e88fb50F', title: 'Kebutuhan Layanan',              desc: 'Dukungan apa yang paling kamu butuhkan sekarang?' },
];

const assessmentCategories = [
  {
    id: 'experience',
    title: 'Pengalaman Kekerasan Digital',
    questions: [
      { id: 1, text: "Saya pernah menerima pesan yang membuat saya tidak nyaman di media sosial", type: 'likert' },
      { id: 2, text: "Saya pernah mendapatkan komentar yang menyinggung secara pribadi", type: 'likert' },
      { id: 3, text: "Saya pernah menerima pesan bernuansa seksual tanpa persetujuan saya", type: 'likert' },
      { id: 4, text: "Saya merasa ada orang yang melewati batas saat berkomunikasi secara online", type: 'likert' },
      { id: 5, text: "Saya pernah dipaksa merespon pesan yang tidak saya inginkan", type: 'likert' },
      { id: 6, text: "Saya pernah mengalami perlakuan tidak pantas di platform digital", type: 'likert' },
      { id: 7, text: "Saya sulit menghindari interaksi yang mengganggu di media sosial", type: 'likert' },
      { id: 8, text: "Saya pernah merasa dilecehkan secara verbal di dunia digital", type: 'likert' },
      { id: 9, text: "Saya pernah merasa privasi saya dilanggar saat berinteraksi online", type: 'likert' },
      { id: 10, text: "Saya merasa media sosial bisa menjadi tempat yang tidak aman", type: 'likert' }
    ]
  },
  {
    id: 'stigma',
    title: 'Stigmatisasi Korban',
    questions: [
      { id: 11, text: "Korban sering disalahkan atas kejadian yang dialaminya", type: 'likert' },
      { id: 12, text: "Lingkungan sering meremehkan pengalaman korban", type: 'likert' },
      { id: 13, text: "Saya pernah melihat korban disudutkan di media sosial", type: 'likert' },
      { id: 14, text: "Komentar netizen sering memperparah kondisi korban", type: 'likert' },
      { id: 15, text: "Korban dianggap berlebihan saat menceritakan pengalaman", type: 'likert' },
      { id: 16, text: "Masyarakat kurang empati terhadap korban", type: 'likert' },
      { id: 17, text: "Saya takut bercerita karena khawatir disalahkan", type: 'likert' },
      { id: 18, text: "Stigma membuat korban memilih diam", type: 'likert' }
    ]
  },
  {
    id: 'psychological',
    title: 'Dampak Psikologis',
    questions: [
      { id: 19, text: "Saya merasa cemas saat menerima pesan dari orang asing", type: 'likert' },
      { id: 20, text: "Saya merasa takut saat menggunakan media sosial", type: 'likert' },
      { id: 21, text: "Saya menjadi lebih tertutup setelah pengalaman buruk online", type: 'likert' },
      { id: 22, text: "Saya merasa tidak percaya diri setelah menerima komentar negatif", type: 'likert' },
      { id: 23, text: "Saya sering memikirkan kembali pengalaman buruk di media sosial", type: 'likert' },
      { id: 24, text: "Saya merasa terganggu secara emosional akibat interaksi digital", type: 'likert' },
      { id: 25, text: "Saya merasa tidak aman saat berkomunikasi online", type: 'likert' },
      { id: 26, text: "Pengalaman digital memengaruhi kondisi mental saya", type: 'likert' }
    ]
  },
  {
    id: 'knowledge',
    title: 'Pengetahuan & Kesadaran',
    questions: [
      { id: 27, text: "Saya memahami apa itu online sexual harassment", type: 'likert' },
      { id: 28, text: "Saya dapat membedakan interaksi sehat dan tidak sehat", type: 'likert' },
      { id: 29, text: "Saya mengetahui batasan dalam berkomunikasi online", type: 'likert' },
      { id: 30, text: "Saya memahami pentingnya menjaga privasi digital", type: 'likert' },
      { id: 31, text: "Saya tahu langkah yang harus dilakukan jika mengalami pelecehan", type: 'likert' },
      { id: 32, text: "Saya memahami bahwa korban tidak boleh disalahkan", type: 'likert' }
    ]
  },
  {
    id: 'protection',
    title: 'Perlindungan Diri',
    questions: [
      { id: 33, text: "Saya tahu cara memblokir akun yang mengganggu", type: 'likert' },
      { id: 34, text: "Saya tahu cara melaporkan akun yang melakukan pelecehan", type: 'likert' },
      { id: 35, text: "Saya berani menolak interaksi yang tidak nyaman", type: 'likert' },
      { id: 36, text: "Saya berusaha menjaga keamanan diri di media sosial", type: 'likert' }
    ]
  },
  {
    id: 'needs',
    title: 'Kebutuhan Layanan',
    questions: [
      { id: 37, text: "Saya membutuhkan tempat yang aman untuk bercerita", type: 'likert' },
      { id: 38, text: "Saya lebih nyaman jika bisa melapor secara anonim", type: 'likert' },
      { id: 39, text: "Saya membutuhkan layanan konseling secara online", type: 'likert' },
      { id: 40, text: "Saya merasa penting adanya ruang aman di media sosial", type: 'likert' }
    ]
  }
];

const allQuestions = assessmentCategories.flatMap(c => c.questions.map(q => ({ ...q, categoryId: c.id })));

const likertOptions = [
  { label: 'Sangat Sesuai', value: 4 },
  { label: 'Sesuai', value: 3 },
  { label: 'Tidak Sesuai', value: 1 },
  { label: 'Sangat Tidak Sesuai', value: 0 },
];

export default function Assessment() {
  const [step, setStep] = useState(0); // 0 intro, 1..N questions
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestionIdx = step - 1;
  const currentQuestion = allQuestions[currentQuestionIdx];
  const progress = (step / allQuestions.length) * 100;

  const handleNext = () => {
    if (step < allQuestions.length) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const categoryNarrative: Record<string, { low: string; mid: string; high: string }> = {
    experience: {
      low: 'Kamu tampaknya belum banyak terpapar pengalaman kekerasan digital secara langsung. Tetap waspada dan kenali tanda-tandanya sejak dini.',
      mid: 'Kamu pernah mengalami beberapa situasi yang tidak nyaman di ruang digital. Penting untuk tidak mengabaikan perasaan tersebut.',
      high: 'Kamu menunjukkan banyak pengalaman yang berpotensi menjadi kekerasan digital. Kamu tidak sendirian, dan apa yang kamu rasakan adalah valid.',
    },
    stigma: {
      low: 'Lingkungan sekitarmu tampak cukup suportif dan tidak banyak menyalahkan korban. Terus jaga perspektif yang sehat ini.',
      mid: 'Kamu mungkin pernah menyaksikan atau merasakan stigma di sekitarmu. Stigma itu nyata dan tidak seharusnya kamu tanggung sendiri.',
      high: 'Kamu sangat merasakan beban stigma, baik dari lingkungan maupun dari dalam dirimu sendiri. Kamu berhak untuk didengar dan dipercaya.',
    },
    psychological: {
      low: 'Kondisi emosionalmu relatif stabil. Terus rawat kesehatan mentalmu dengan cara yang menurutmu menyenangkan.',
      mid: 'Ada beberapa dampak emosional yang kamu rasakan akibat interaksi digital. Wajar untuk merasa seperti ini — dan ada dukungan yang bisa membantumu.',
      high: 'Kamu menanggung beban emosional yang cukup berat. Ini adalah sinyal penting untuk mencari ruang aman dan berbicara dengan seseorang yang bisa dipercaya.',
    },
    knowledge: {
      low: 'Pengetahuanmu tentang kekerasan digital dan cara melindungi diri masih bisa dikembangkan lebih jauh. Halaman Edukasi kami bisa jadi titik awal yang baik.',
      mid: 'Kamu sudah memiliki pemahaman dasar tentang keamanan digital, namun masih ada ruang untuk belajar lebih banyak.',
      high: 'Kamu memiliki kesadaran yang baik tentang isu kekerasan digital. Pengetahuanmu ini bisa menjadi kekuatan untuk dirimu dan orang sekitarmu.',
    },
    protection: {
      low: 'Kemampuan perlindungan dirimu di dunia digital masih perlu diperkuat. Coba pelajari langkah-langkah praktis di halaman Edukasi kami.',
      mid: 'Kamu sudah memiliki beberapa kemampuan untuk melindungi diri, namun belum sepenuhnya percaya diri. Terus berlatih dan cari informasi lebih lanjut.',
      high: 'Kamu tahu cara menjaga diri di ruang digital. Kemampuan ini sangat berharga — tetap percaya pada instingmu.',
    },
    needs: {
      low: 'Saat ini kamu mungkin merasa cukup baik-baik saja. Tetapi ingat, mencari dukungan adalah tanda kekuatan, bukan kelemahan.',
      mid: 'Kamu merasakan kebutuhan akan dukungan di beberapa area. Ada baiknya mulai menjajaki layanan yang tersedia untukmu.',
      high: 'Kamu sangat membutuhkan ruang aman untuk bercerita dan mendapat dukungan. Kami ada untuk kamu — jangan ragu untuk menghubungi konselor kami.',
    },
  };

  const getCategoryNarrative = (catId: string, score: number, maxScore: number) => {
    const ratio = score / maxScore;
    const narr = categoryNarrative[catId];
    if (!narr) return '';
    if (ratio > 0.6) return narr.high;
    if (ratio > 0.3) return narr.mid;
    return narr.low;
  };

  const calculateDetailedResults = () => {
    const scores: Record<string, number> = {};
    allQuestions.forEach(q => {
      const val = answers[q.id] || 0;
      scores[q.categoryId] = (scores[q.categoryId] || 0) + val;
    });

    const totalScore = (Object.values(answers) as number[]).reduce((a, b) => a + b, 0);
    const maxPossible = allQuestions.length * 4;
    const ratio = totalScore / maxPossible;

    let status = { level: 'Rendah', color: 'text-primary-sage bg-primary-sage/10', icon: CheckCircle2 };
    if (ratio > 0.7) status = { level: 'Tinggi', color: 'text-red-500 bg-red-50', icon: AlertCircle };
    else if (ratio > 0.3) status = { level: 'Sedang', color: 'text-primary-blue bg-primary-blue/10', icon: Info };

    return { status, scores, ratio };
  };

  if (isFinished) {
    const { status, scores } = calculateDetailedResults();
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 card-shadow"
        >
          <div className="text-center mb-12">
            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6", status.color)}>
              <status.icon size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Hasil Analisis Emosional Anda</h2>
            <div className={cn("inline-block px-8 py-2 rounded-full font-bold uppercase tracking-widest text-sm", status.color)}>
              Tingkat Urgensi: {status.level}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {assessmentCategories.map(cat => {
              const maxScore = cat.questions.length * 4;
              const catScore = scores[cat.id] || 0;
              const pct = (catScore / maxScore) * 100;
              const barColor = pct > 60 ? 'bg-red-400' : pct > 30 ? 'bg-primary-blue' : 'bg-primary-sage';
              return (
                <div key={cat.id} className="p-6 bg-base-cream rounded-3xl space-y-3">
                  <h4 className="font-bold text-text-main">{cat.title}</h4>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full ${barColor}`}
                    />
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {getCategoryNarrative(cat.id, catScore, maxScore)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-primary-sage/5 border border-primary-sage/10 rounded-3xl p-8 mb-12">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-primary-sage">
              <Shield size={20} /> Langkah Selanjutnya untuk Kamu
            </h4>
            <p className="text-text-muted leading-relaxed mb-6">
              {status.level === 'Tinggi'
                ? 'Hasil asesmenmu menunjukkan bahwa kamu mungkin sedang menanggung beban yang cukup berat. Kamu tidak harus menghadapinya sendirian — konselor kami siap mendengarkan tanpa menghakimi.'
                : status.level === 'Sedang'
                ? 'Ada beberapa area yang perlu perhatian lebih. Mulai dari membaca artikel edukasi atau berbicara ringan dengan konselor bisa jadi langkah kecil yang bermakna.'
                : 'Kondisimu saat ini relatif baik. Terus jaga dirimu dengan memperluas pengetahuan tentang keamanan digital dan kesehatan mental.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/counseling" className="btn-soft bg-primary-sage text-white px-8">Hubungi Konselor</Link>
              <Link to="/education" className="btn-soft bg-white text-text-main border border-primary-sage/20 px-8">Lihat Materi Edukasi</Link>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted">Data ini bersifat rahasia dan anonim. Hasil ini bukan pengganti diagnosa medis.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header: Illustration + Text */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
              <div className="lg:w-72 flex-shrink-0">
                <AssessmentIllustration />
              </div>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-sage/10 text-primary-sage text-sm font-semibold mb-6">
                  <Brain size={15} /> Asesmen Kondisi Emosional
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Pahami Kondisi Dirimu <span className="italic text-primary-sage">Lebih Dalam</span>
                </h1>
                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                  Asesmen ini dirancang untuk memetakan kondisi emosionalmu secara menyeluruh dan memberikan rekomendasi dukungan yang tepat. Privasi terjamin — sepenuhnya anonim.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-text-muted mb-8">
                  <div className="flex items-center gap-2"><Lock size={15} /> 100% Anonim</div>
                  <div className="flex items-center gap-2"><Info size={15} /> ~30 Menit</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={15} /> 40 Pertanyaan</div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="btn-soft bg-primary-sage text-white px-10 py-4 text-lg shadow-xl shadow-primary-sage/20 inline-flex items-center gap-3 group"
                >
                  Mulai Asesmen <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 6 Category Cards */}
            <div>
              <p className="text-center text-xs font-bold text-text-muted uppercase tracking-widest mb-6">
                Asesmen ini mencakup 6 aspek utama
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categoryInfo.map((cat, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl" style={{ backgroundColor: cat.bg }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.color + '25' }}>
                      <cat.icon size={20} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black" style={{ color: cat.color }}>{i + 1}</span>
                        <h4 className="text-sm font-bold text-text-main">{cat.title}</h4>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentQuestionIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center bg-white rounded-[3rem] p-8 md:p-16 card-shadow relative overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-base-cream">
              <motion.div 
                className="h-full bg-primary-sage"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center mb-12">
              <span className="text-xs font-bold text-primary-sage uppercase tracking-widest">Pertanyaan {step} / {allQuestions.length}</span>
              <button 
                onClick={handleBack}
                className="text-text-muted hover:text-text-main flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <ArrowLeft size={16} /> Kembali
              </button>
            </div>

            <h2 className="text-2xl md:text-4xl leading-tight mb-16 text-text-main font-serif">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.type === 'likert' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {likertOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all duration-300 text-center font-medium",
                        answers[currentQuestion.id] === opt.value
                          ? "bg-primary-sage/10 border-primary-sage text-primary-sage scale-[0.98]"
                          : "bg-base-cream border-transparent text-text-muted hover:border-primary-sage/30 hover:bg-white"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all duration-300 text-left font-medium flex justify-between items-center",
                        answers[currentQuestion.id] === idx
                          ? "bg-primary-sage/10 border-primary-sage text-primary-sage"
                          : "bg-base-cream border-transparent text-text-muted hover:border-primary-sage/30 hover:bg-white"
                      )}
                    >
                      {opt}
                      {answers[currentQuestion.id] === idx && <CheckCircle2 size={20} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 flex justify-end">
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion.id] === undefined}
                className="btn-soft bg-primary-sage text-white disabled:opacity-50 disabled:grayscale px-10 inline-flex items-center gap-2 group"
              >
                {step === allQuestions.length ? 'Lihat Hasil' : 'Lanjutkan'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
