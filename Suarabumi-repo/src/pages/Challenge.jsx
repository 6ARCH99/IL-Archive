import React from 'react';

const Challenge = () => {
  const activeChallenges = [
    { title: 'Bike to Work', desc: 'Gunakan sepeda untuk commute', time: '5 hari', points: '+400 pts' },
    { title: 'Zero Waste Lunch', desc: 'Makan siang tanpa sampah plastik', time: '7 hari', points: '+350 pts' },
    { title: 'Reusable Bag Challenge', desc: 'Selalu bawa tas belanja sendiri', time: '14 hari', points: '+600 pts' },
  ];

  // Data Tambahan untuk Challenge Tersedia (Sesuai Gambar)
  const availableChallenges = [
    { title: 'Composting Champion', level: 'Medium', desc: 'Mulai kompos sampah organik di rumah', time: '30 hari', joined: '45 joined', points: '+1000 pts', color: 'text-orange-400 bg-orange-50' },
    { title: 'Eco Shopping Week', level: 'Easy', desc: 'Belanja tanpa kemasan plastik', time: '7 hari', joined: '89 joined', points: '+500 pts', color: 'text-blue-400 bg-blue-50' },
    { title: 'Water Warrior', level: 'Easy', desc: 'Hemat air dengan shower maksimal 5 menit', time: '14 hari', joined: '62 joined', points: '+700 pts', color: 'text-blue-400 bg-blue-50' },
    { title: 'Green Commuter', level: 'Hard', desc: 'Gunakan transportasi umum setiap hari', time: '21 hari', joined: '34 joined', points: '+900 pts', color: 'text-red-400 bg-red-50' },
    { title: 'DIY Repair Challenge', level: 'Medium', desc: 'Perbaiki barang rusak daripada beli baru', time: '10 hari', joined: '28 joined', points: '+600 pts', color: 'text-orange-400 bg-orange-50' },
    { title: 'Plant a Tree', level: 'Easy', desc: 'Tanam minimal 3 pohon di sekitarmu', time: '1 hari', joined: '156 joined', points: '+800 pts', color: 'text-blue-400 bg-blue-50' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Budi Santoso', points: '8,450' },
    { rank: 2, name: 'Siti Nurhaliza', points: '7,890' },
    { rank: 3, name: 'Ahmad Rizki', points: '7,320' },
    { rank: 4, name: 'Kamu', points: '6,850', isUser: true },
    { rank: 5, name: 'Dewi Lestari', points: '6,420' },
  ];

  const badges = [
    { name: 'Pemula', icon: '🌱', active: true },
    { name: 'Konsisten', icon: '⭐', active: true },
    { name: 'Inspirator', icon: '🎯', active: true },
    { name: 'Champion', icon: '🏆', active: false },
    { name: 'Legend', icon: '👑', active: false },
    { name: 'Hero', icon: '💚', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] px-6 md:px-20 py-10 font-sans text-[#1A2E35]">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          Challenge <span className="text-2xl">🎯</span>
        </h1>
        <p className="text-gray-500 mt-2">Ikuti tantangan seru dan raih poin bonus!</p>
      </div>

      {/* Challenge Unggulan */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-12">
        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
          Challenge Unggulan
        </span>
        <h2 className="text-3xl font-bold mt-4 font-serif">Pilah 10 kg Minggu Ini</h2>
        <p className="text-sm text-gray-400 mt-1">128 orang bergabung · Berakhir dalam 2 hari</p>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span>Progress: 6.5 / 10 kg</span>
            <span className="text-green-600">65%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div className="bg-[#86BC8A] h-full w-[65%] rounded-full transition-all duration-1000"></div>
          </div>
        </div>

        <button className="mt-8 bg-[#1A2E35] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#2d4a37] transition-all">
          Ikut Sekarang · +500 poin
        </button>
      </section>

      {/* Challenge Aktif */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-6 font-serif">Challenge Aktif</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeChallenges.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 relative group">
              <span className="absolute top-6 right-6 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Active</span>
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
              <div className="flex items-center justify-between mt-6 text-[11px] font-bold">
                <span className="text-gray-400 flex items-center gap-1">🕒 {item.time}</span>
                <span className="text-green-600">{item.points}</span>
              </div>
              <button className="w-full mt-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold group-hover:bg-[#E9F5EF] group-hover:text-[#2D4A37] transition-all">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge Tersedia (Bagian Baru yang Ditambahkan) */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-6 font-serif">Challenge Tersedia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableChallenges.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-sm w-2/3">{item.title}</h4>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${item.color}`}>
                  {item.level}
                </span>
              </div>
              <p className="text-gray-400 text-[11px] mb-4 h-8">{item.desc}</p>
              <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-4">
                <span>📅 {item.time}</span>
                <span>👥 {item.joined}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="font-bold text-green-600 text-xs">{item.points}</span>
                <button className="bg-[#1A2E35] text-white px-4 py-2 rounded-lg text-[10px] font-bold hover:opacity-90">
                  Ikut Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Leaderboard */}
        <section>
          <div className="flex items-center gap-2 mb-6">
             <span className="bg-green-100 p-2 rounded-lg text-green-700 text-lg">🏆</span>
             <h3 className="text-xl font-bold font-serif">Leaderboard</h3>
          </div>
          <div className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-50">
            {leaderboard.map((user, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-4 rounded-2xl mb-2 transition-all ${user.isUser ? 'bg-[#FFF9E7] border border-orange-200' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold ${
                    user.rank === 1 ? 'bg-orange-400 text-white' : 
                    user.rank === 2 ? 'bg-gray-300 text-white' : 
                    user.rank === 3 ? 'bg-orange-200 text-white' : 'text-gray-400'
                  }`}>
                    {user.rank}
                  </span>
                  <span className="font-bold text-sm text-[#1A2E35]">{user.name}</span>
                </div>
                <span className="font-bold text-sm text-[#1A2E35]">{user.points}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Badges */}
        <section>
          <div className="flex items-center gap-2 mb-6">
             <span className="bg-green-100 p-2 rounded-lg text-green-700 text-lg">🏅</span>
             <h3 className="text-xl font-bold font-serif">Badges</h3>
          </div>
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 grid grid-cols-3 gap-6">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center group cursor-help">
                <div className={`w-16 h-20 flex items-center justify-center rounded-2xl text-2xl mb-2 transition-all duration-300 ${
                  badge.active ? 'bg-[#E9F5EF] scale-100' : 'bg-gray-50 grayscale opacity-40 scale-95'
                } group-hover:scale-105`}>
                  {badge.icon}
                </div>
                <span className={`text-[10px] font-bold tracking-tight ${badge.active ? 'text-[#2D4A37]' : 'text-gray-300'}`}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Challenge;