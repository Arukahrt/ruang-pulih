export type Video = {
  id: string;
  title: string;
  category: 'Digital Safety' | 'Mental Health' | 'Self Care' | 'Digital Awareness';
  youtubeId: string;
  description: string;
};

export const videos: Video[] = [
  {
    id: 'vid-1',
    title: 'Tips Cepat: Amankan Akunmu dari Pelecehan Online',
    category: 'Digital Safety',
    youtubeId: 'z6wu6bfu14Q',
    description: 'Langkah singkat yang bisa kamu lakukan sekarang untuk melindungi akun media sosialmu.',
  },
  {
    id: 'vid-2',
    title: 'Memulihkan Diri Setelah Cyberbullying',
    category: 'Mental Health',
    youtubeId: 'YPGomPg2qAA',
    description: 'Panduan pemulihan emosi bagi penyintas pelecehan dan perundungan online.',
  },
  {
    id: 'vid-3',
    title: 'Memahami dan Melawan Victim Blaming',
    category: 'Self Care',
    youtubeId: 'WDkRgOF8vog',
    description: 'Penjelasan mengapa victim blaming terjadi dan cara meresponsnya dengan tepat.',
  },
  {
    id: 'vid-4',
    title: 'Privasi Digital: Lindungi Diri dari Stalker Online',
    category: 'Digital Safety',
    youtubeId: 'ek1hg_ruHSw',
    description: 'Cara mengamankan privasi digital agar tidak mudah dilacak atau disalahgunakan.',
  },
];
