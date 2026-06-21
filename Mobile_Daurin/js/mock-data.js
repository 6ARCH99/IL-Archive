export const user = {
  name: 'Putra Pratama',
  username: 'PUTRA SAPUTRA',
  initials: 'PP',
  points: 2450,
  pointsDeltaWeek: 150,
  co2Kg: 8.3,
  depositsMonth: 14,
  streak: 12,
  level: 5,
  levelTitle: 'Eco Warrior',
  levelProgress: 0.65,
  nextRewardPoints: 550,
  nextRewardIdr: 25000,
  referralCode: 'PUTRA24',
  friendsInvited: 8,
  bonusPoints: 1600,
  domisili: 'Jakarta Selatan',
};

export const chartData = [3, 5, 2, 4, 6, 3, 5];
export const chartLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export const activeChallenges = [
  { id: '1', title: 'Kumpulkan 10 Botol Plastik', progress: 7, target: 10, daysLeft: 5, points: 200 },
];

export const availableChallenges = [
  { id: '2', title: 'Bike to Work', desc: 'Use bicycle for commute', days: 5, points: 400, progress: 0, target: 5 },
  { id: '3', title: 'Pilah 10 kg Minggu Ini', desc: '128 orang bergabung', days: 2, points: 500, progress: 0, target: 10, featured: true },
];

export const completedChallenges = [
  { id: '4', title: 'Bike to Work', desc: 'Use bicycle for commute', progress: 2, target: 5, status: 'incomplete', month: 'Maret 2025' },
];

export const transactions = [
  { month: 'Maret 2025', items: [
    { desc: 'Tukar 500 poin ke Gopay', status: 'Berhasil', delta: -500, date: '29 Mar', type: 'redeem' },
    { desc: 'Tukar 300 poin ke Ovo', status: 'Berhasil', delta: -300, date: '29 Mar', type: 'redeem' },
    { desc: 'Bonus Referral dari Ahmad', status: 'Berhasil', delta: 200, date: '29 Mar', type: 'earn' },
  ]},
  { month: 'Februari 2025', items: [
    { desc: 'Tukar 500 poin ke Gopay', status: 'Berhasil', delta: -500, date: '15 Feb', type: 'redeem' },
    { desc: 'Deposit plastik - 0.5kg', status: 'Berhasil', delta: 150, date: '10 Feb', type: 'earn' },
  ]},
];

export const referralFriends = [
  { name: 'Ahmad Rizky', initial: 'A', date: '20 Mar 2025', points: 200 },
  { name: 'Siti Nurhaliza', initial: 'S', date: '15 Mar 2025', points: 200 },
  { name: 'Budi Santoso', initial: 'B', date: '10 Mar 2025', points: 200 },
];

export const dropPoints = [
  { id: '1', name: 'EcoHub Batam Center', address: 'Jl. Engku Putri No. 15', distance: '0.8 km', rating: 4.8, hours: '08:00 - 20:00', open: true },
  { id: '2', name: 'Recycle Station Harbour Bay', address: 'Harbour Bay Residences', distance: '2.5 km', rating: 4.9, hours: '10:00 - 18:00', open: false },
  { id: '3', name: 'Green Point Nagoya', address: 'Jl. Nagoya Hill', distance: '3.1 km', rating: 4.6, hours: '09:00 - 17:00', open: true },
];

export const recentDeposits = [
  { type: 'Plastic', weight: '2.5 kg', when: 'Today' },
  { type: 'Paper', weight: '3.2 kg', when: 'Yesterday' },
  { type: 'Metal', weight: '1.8 kg', when: '2 days ago' },
];

export const scanResult = {
  item: 'Botol Plastik PET',
  confidence: 94.5,
  co2: 0.3,
  points: 50,
  category: 'Anorganik',
  steps: [
    'Kosongkan dan bilas botol dari sisa cairan',
    'Lepaskan label dan tutup botol (pisahkan)',
    'Remas botol untuk menghemat ruang',
    'Masukkan ke tempat sampah anorganik atau drop point terdekat',
  ],
};

export const pickupSchedule = {
  date: '31 Mar 2026',
  time: '09:00 - 12:00',
  address: 'Jl. Melati No. 15, Jakarta Selatan',
  weight: '8 kg',
  status: 'Terjadwal',
};

export const faqItems = [
  { q: 'Apa itu DAURIN?', a: 'DAURIN adalah aplikasi yang mengubah pemilahan sampah rumah tangga menjadi kebiasaan berhadiah. Scan sampah, setor, kumpulkan poin, dan tukar dengan saldo e-wallet.' },
  { q: 'Bagaimana cara mendapatkan poin?', a: 'Kamu mendapat poin setiap kali menyetor sampah di drop point, menjadwalkan penjemputan, menyelesaikan tantangan, atau mengajak teman dengan kode referral.' },
  { q: 'Dimana lokasi drop point terdekat?', a: 'Buka tab Deposit, pilih Drop Point, dan izinkan akses lokasi. Aplikasi akan menampilkan drop point terdekat di peta dan daftar.' },
  { q: 'Jenis sampah apa saja yang diterima?', a: 'Organik, Anorganik (plastik, kertas, logam), dan B3 (baterai, obat kadaluarsa). Gunakan fitur scan AI untuk klasifikasi.' },
  { q: 'Bagaimana cara menukar poin dengan reward?', a: 'Buka tab Reward, masukkan jumlah poin di tab Aktif, pilih GoPay/OVO/DANA, lalu konfirmasi penukaran.' },
  { q: 'Apakah ada biaya untuk menggunakan DAURIN?', a: 'Tidak ada biaya pendaftaran atau penggunaan. Penukaran poin ke e-wallet juga gratis.' },
  { q: 'Bagaimana cara mengajak teman?', a: 'Di tab Reward > Selesai, salin atau bagikan kode referral unikmu. Teman yang mendaftar dan setor pertama kali memberimu +200 poin.' },
  { q: 'Apa itu badge dan bagaimana cara mendapatkannya?', a: 'Badge adalah lencana pencapaian dari tantangan. Selesaikan tantangan dengan reward badge untuk mengumpulkannya di halaman Collection.' },
];

export const leaderboard = {
  topThree: [
    { rank: 2, name: 'Andi', points: 2120, region: 'Kepulauan Riau' },
    { rank: 1, name: 'Putra', points: 2450, region: 'Batam', isMe: true },
    { rank: 3, name: 'Siti', points: 1890, region: 'Batam' },
  ],
  rows: [
    { rank: 4, name: 'Kian', streak: 6, points: 1820, delta: 60 },
    { rank: 5, name: 'Soren', streak: 5, points: 1740, delta: 60 },
    { rank: 6, name: 'Lyra', streak: 4, points: 1680, delta: 60 },
    { rank: 7, name: 'Orin', streak: 3, points: 1600, delta: 60 },
    { rank: 8, name: 'Mirael', streak: 2, points: 1550, delta: 60 },
  ],
};

export const badges = [
  { icon: '🛍️', name: 'Reusable bag', freq: 'DAY', pct: 100, locked: false },
  { icon: '🚲', name: 'Bike to work', freq: 'WEEK', pct: 100, locked: false },
  { icon: '🥤', name: 'No straws', freq: 'WEEK', pct: 100, locked: false },
  { icon: '🌱', name: 'Compost', freq: 'DAY', pct: 100, locked: false },
  { icon: '💡', name: 'Lights off', freq: 'DAY', pct: 50, locked: false },
  { icon: '💧', name: 'Refill bottle', freq: 'DAY', pct: 0, locked: true },
];

export const domisiliOptions = ['Jakarta', 'Jakarta Selatan', 'Jakarta Barat', 'Bandung', 'Surabaya', 'Batam'];
export const genderOptions = ['Laki-laki', 'Perempuan', 'Lainnya'];
