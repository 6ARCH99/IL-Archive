import React from 'react';

const Leaderboard = () => {
  // Data dummy untuk peringkat 4-10 sesuai gambar
  const rankData = [
    { rank: 4, name: 'Kamu', points: '6,850', streak: '7 hari beruntun', isUser: true },
    { rank: 5, name: 'Dewi Lestari', points: '6,420', streak: '5 hari beruntun' },
    { rank: 6, name: 'Elara', points: '6,180', streak: '9 hari beruntun' },
    { rank: 7, name: 'Kian', points: '5,940', streak: '4 hari beruntun' },
    { rank: 8, name: 'Soren', points: '5,680', streak: '11 hari beruntun' },
    { rank: 9, name: 'Lyra', points: '5,420', streak: '6 hari beruntun' },
    { rank: 10, name: 'Orin', points: '5,150', streak: '8 hari beruntun' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] px-6 md:px-20 py-10 font-sans text-[#1A2E35]">
      {/* Header Halaman */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 font-serif">
          Leaderboard <span className="text-2xl">🏆</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Lihat peringkat pengguna terbaik dan raih posisi teratas!</p>
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase">Wilayah:</span>
          <select className="bg-[#1A3022] text-white text-xs font-bold py-2 px-4 rounded-full appearance-none cursor-pointer">
            <option>PROVINSI</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase">Periode:</span>
          <select className="bg-[#1A3022] text-white text-xs font-bold py-2 px-4 rounded-full appearance-none cursor-pointer">
            <option>MINGGU INI</option>
          </select>
        </div>
      </div>

      {/* Collection Progress Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-10 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-[#1A3022] text-sm">Collection Progress</h3>
          <p className="text-[10px] text-gray-400">Terus kumpulkan badge!</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-[#1A3022]">2/6</span>
          <p className="text-[10px] text-gray-400 font-bold uppercase">33% Complete</p>
        </div>
      </div>

      {/* Top Champions Podium */}
      <div className="relative bg-[#FFF9ED] rounded-[32px] border border-[#F2E8D5] p-10 mb-12">
        <div className="text-center mb-10">
          <span className="text-[#D99A29] font-bold text-sm flex items-center justify-center gap-2 font-serif">
            🏆 Top Champions 🏆
          </span>
        </div>
        
        <div className="flex justify-center items-end gap-4 md:gap-12">
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#C0C0C0] rounded-full flex items-center justify-center text-white font-bold mb-4 border-4 border-white shadow-sm">2</div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center w-32 md:w-40 shadow-sm">
              <p className="font-bold text-xs mb-1">Siti Nurhaliza</p>
              <p className="text-lg font-black text-[#1A3022]">7,890</p>
              <p className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-tighter">poin</p>
              <p className="text-[10px] font-bold text-orange-500">🔥 8 hari</p>
            </div>
          </div>

          {/* Rank 1 (Podium Tengah) */}
          <div className="flex flex-col items-center -translate-y-6">
            <span className="text-2xl mb-1">👑</span>
            <div className="w-16 h-16 bg-[#D99A29] rounded-full flex items-center justify-center text-white font-bold mb-4 border-4 border-white shadow-md text-xl">1</div>
            <div className="bg-white p-8 rounded-2xl border-2 border-[#D99A29] text-center w-36 md:w-48 shadow-lg relative">
              <p className="font-bold text-sm mb-1">Budi Santoso</p>
              <p className="text-2xl font-black text-[#1A3022]">8,450</p>
              <p className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-tighter">poin</p>
              <p className="text-xs font-bold text-orange-500">🔥 12 hari</p>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-[#CD7F32] rounded-full flex items-center justify-center text-white font-bold mb-4 border-4 border-white shadow-sm">3</div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center w-32 md:w-40 shadow-sm">
              <p className="font-bold text-xs mb-1">Ahmad Rizki</p>
              <p className="text-lg font-black text-[#1A3022]">7,320</p>
              <p className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-tighter">poin</p>
              <p className="text-[10px] font-bold text-orange-500">🔥 15 hari</p>
            </div>
          </div>
        </div>
      </div>

      {/* List Peringkat 4-10 */}
      <div className="space-y-3">
        <h4 className="font-bold text-[#1A3022] mb-4 font-serif">Peringkat 4-10</h4>
        {rankData.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              item.isUser 
                ? 'bg-[#FFF9E7] border-orange-200 shadow-sm scale-[1.01]' 
                : 'bg-white border-gray-50 hover:border-gray-200'
            }`}
          >
            <div className="flex items-center gap-5">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 text-xs font-bold">
                {item.rank}
              </span>
              <div>
                <p className="text-sm font-bold text-[#1A3022]">
                  {item.name} {item.isUser && <span className="text-[10px] text-orange-400 ml-1">(You)</span>}
                </p>
                <p className="text-[10px] font-bold text-orange-500">🔥 {item.streak}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-green-500 text-[10px]">📈</span>
               <span className="font-black text-[#1A3022]">{item.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;