import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Info, Shield, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

type Question = {
  id: number;
  text: string;
  type: 'likert' | 'choice';
  options?: string[];
};

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
  { label: 'Sangat Tidak Sesuai', value: 0 },
  { label: 'Tidak Sesuai', value: 1 },
  { label: 'Ragu-ragu', value: 2 },
  { label: 'Sesuai', value: 3 },
  { label: 'Sangat Sesuai', value: 4 },
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
    setTimeout(() => handleNext(), 300);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {assessmentCategories.map(cat => (
              <div key={cat.id} className="p-6 bg-base-cream rounded-3xl">
                <h4 className="font-bold text-text-main mb-2">{cat.title}</h4>
                <div className="h-2 bg-white rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(scores[cat.id] / (cat.questions.length * 4)) * 100}%` }}
                    className="h-full bg-primary-sage"
                  />
                </div>
                <p className="text-xs text-text-muted italic">Kondisi berdasarkan jawaban Anda</p>
              </div>
            ))}
          </div>

          <div className="bg-primary-sage/5 border border-primary-sage/10 rounded-3xl p-8 mb-12">
             <h4 className="font-bold mb-4 flex items-center gap-2 text-primary-sage">
               <Shield size={20} /> Langkah Pemulihan Selanjutnya
             </h4>
             <p className="text-text-muted leading-relaxed mb-6">
               Berdasarkan skor Anda, kami merekomendasikan untuk {status.level === 'Tinggi' ? 'segera mendiskusikan hal ini dengan konselor profesional melalui fitur Konseling Online.' : 'mempelajari tips regulasi emosi di halaman Edukasi kami.'}
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
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-[80vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary-sage/10 text-primary-sage rounded-3xl flex items-center justify-center mx-auto mb-10">
              <Brain size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl mb-6">Asesmen <span className="italic">Kondisi Emosional</span></h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">
              Asesmen ini dirancang untuk memetakan kondisi emosional Anda dan memberikan rekomendasi dukungan yang tepat. Privasi Anda terjamin dan partisipasi dilakukan secara anonim.
            </p>
            <button 
              onClick={() => setStep(1)}
              className="btn-soft bg-primary-sage text-white px-12 py-4 text-xl shadow-xl shadow-primary-sage/20 inline-flex items-center gap-4 group"
            >
              Mulai Asesmen <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-text-muted">
              <div className="flex items-center gap-2"><Lock size={16} /> 100% Anonim</div>
              <div className="flex items-center gap-2"><Info size={16} /> Estimasi 30 Menit</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentQuestionIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] p-8 md:p-16 card-shadow relative overflow-hidden"
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
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
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

            {currentQuestion.type === 'choice' && (
              <div className="mt-12 flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={answers[currentQuestion.id] === undefined}
                  className="btn-soft bg-primary-sage text-white disabled:opacity-50 disabled:grayscale px-10"
                >
                  Lanjutkan
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
