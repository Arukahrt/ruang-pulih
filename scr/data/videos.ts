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
    title: '18 Mei 2026',
    category: 'Digital Awareness',
    youtubeId: 'z6wu6bfu14Q',
    description: 'Konten dari Handoko Murti seputar isu kekerasan seksual digital.',
  },
  {
    id: 'vid-2',
    title: 'Jangan Menyalahkan Korban',
    category: 'Self Care',
    youtubeId: 'YPGomPg2qAA',
    description: 'Edukasi dari Kemdikbud tentang pentingnya tidak menyalahkan korban kekerasan seksual.',
  },
  {
    id: 'vid-3',
    title: 'Apa Itu Pelecehan Seksual?',
    category: 'Digital Awareness',
    youtubeId: 'WDkRgOF8vog',
    description: 'Penjelasan dari Aliansi Satu Visi tentang definisi dan bentuk-bentuk pelecehan seksual.',
  },
  {
    id: 'vid-4',
    title: 'Yuk, Tangkal Kekerasan Seksual',
    category: 'Digital Safety',
    youtubeId: 'ek1hg_ruHSw',
    description: 'Panduan dari Rifka Annisa tentang cara mencegah dan merespons kekerasan seksual.',
  },
];
