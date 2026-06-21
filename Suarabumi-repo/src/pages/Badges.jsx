import React from 'react';

const Badges = () => {
  const earnedBadges = [
    { id: 1, name: 'Pemula', icon: '🌱', type: 'DAY', progress: '5/5', status: '✓ Complete', date: 'Earned recently' },
    { id: 2, name: 'Konsisten', icon: '⭐', type: 'WEEK', progress: '7/7', status: '✓ Complete', date: 'Earned recently' },
    { id: 3, name: 'Inspirator', icon: '🎯', type: 'WEEK', progress: '8/8', status: '✓ Complete', date: 'Earned recently' },
    { id: 4, name: 'Eco Warrior', icon: '🌿', type: 'DAY', progress: '6/6', status: '✓ Complete', date: 'Earned recently' },
    { id: 5, name: 'Green Champion', icon: '♻️', type: 'WEEK', progress: '9/9', status: '✓ Complete', date: 'Earned recently' },
    { id: 6, name: 'Earth Protector', icon: '🌎', type: 'DAY', progress: '3/3', status: '✓ Complete', date: 'Earned recently' },
  ];

  const lockedBadges = [
    { id: 7, name: 'Champion', icon: '🏆', type: 'MONTH', progress: '2/10', percent: '20%', remaining: '8 more to unlock' },
    { id: 8, name: 'Legend', icon: '👑', type: 'MONTH', progress: '0/15', percent: '0%', remaining: '15 more to unlock' },
    { id: 9, name: 'Hero', icon: '💚', type: 'MONTH', progress: '0/20', percent: '0%', remaining: '20 more to unlock' },
    { id: 10, name: 'Climate Hero', icon: '🌍', type: 'MONTH', progress: '1/12', percent: '8%', remaining: '11 more to unlock' },
    { id: 11, name: 'Sustainability Star', icon: '✨', type: 'WEEK', progress: '4/5', percent: '80%', remaining: '1 more to unlock' },
    { id: 12, name: 'Waste Warrior', icon: '🗑️', type: 'WEEK', progress: '0/7', percent: '0%', remaining: '7 more to unlock' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] px-6 md:px-20 py-10 font-sans text-[#1A2E35]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 font-serif">
          Badges <span className="text-2xl">🎖️</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Kumpulkan badge dan tunjukkan pencapaianmu!</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-10 flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-bold text-[#1A3022] text-sm">Koleksi Badge</h3>
          <p className="text-[10px] text-gray-400">Terus kumpulkan badge dan raih pencapaian!</p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-500" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="text-right ml-10">
          <span className="text-3xl font-black text-[#1A3022]">6/12</span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">50% complete</p>
        </div>
      </div>

      {/* Badge Terkumpul Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold font-serif flex items-center gap-2">
            Badge Terkumpul <span className="text-sm">✨</span>
          </h2>
          <span className="text-[10px] font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">6 Badges</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {earnedBadges.map((badge) => (
            <div key={badge.id} className="bg-[#E6F4EA] rounded-[20px] p-5 border border-green-200 text-center relative group hover:shadow-md transition-all">
              <span className="absolute top-3 left-3 bg-green-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">{badge.type}</span>
              <div className="text-4xl mb-3 mt-2">{badge.icon}</div>
              <h4 className="font-bold text-xs text-[#1A3022] mb-1">{badge.name}</h4>
              <div className="flex items-center justify-between text-[9px] font-bold text-green-700 mb-2">
                <span>{badge.progress}</span>
                <span>{badge.status}</span>
              </div>
              <p className="text-[8px] text-gray-400 italic border-t border-green-200 pt-2">{badge.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Badge Terkunci Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold font-serif flex items-center gap-2">
            Badge Terkunci <span className="text-sm">🔒</span>
          </h2>
          <span className="text-[10px] font-bold text-gray-400">6 Remaining</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lockedBadges.map((badge) => (
            <div key={badge.id} className="bg-white/50 rounded-[20px] p-5 border border-dashed border-gray-200 text-center grayscale opacity-70">
              <span className="absolute top-3 left-3 bg-gray-300 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">{badge.type}</span>
              <div className="text-4xl mb-3 mt-2">{badge.icon}</div>
              <h4 className="font-bold text-xs text-gray-500 mb-1">{badge.name}</h4>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1">
                <div className="bg-gray-300 h-full" style={{ width: badge.percent }}></div>
              </div>
              <div className="flex justify-between text-[8px] font-bold text-gray-400 mb-2">
                <span>{badge.progress}</span>
                <span>{badge.percent}</span>
              </div>
              <p className="text-[8px] text-gray-400 pt-2 border-t border-gray-100">{badge.remaining}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <div className="bg-[#E6F4EA]/40 rounded-[24px] p-8 border border-green-100">
        <h4 className="font-bold text-[#1A3022] mb-4 flex items-center gap-2">
          <span className="text-lg">💡</span> Tips Mendapatkan Badge
        </h4>
        <ul className="space-y-3">
          {[
            'Setor sampah secara rutin untuk mendapatkan badge harian dan mingguan',
            'Ikuti challenge dan raih bonus badge eksklusif',
            'Ajak teman bergabung dan dapatkan badge referral',
            'Capai target bulanan untuk unlock badge premium'
          ].map((tip, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span> {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Badges;