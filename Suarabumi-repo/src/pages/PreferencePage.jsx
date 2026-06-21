import React, { useState } from 'react';

const PreferencePage = ({ onBack }) => {
  const [showInLeaderboard, setShowInLeaderboard] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-[#1A3022] mb-8 group">
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-gray-100 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="font-medium">Kembali</span>
        </button>

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[#1A3022] mb-2 font-serif">Preferensi</h1>
          <p className="text-gray-500 text-sm">Sesuaikan pengalaman Tunas kamu</p>
        </header>

        <div className="space-y-6">
          {/* Bahasa */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#1A3022] mb-4">Bahasa</h2>
            <div className="p-4 bg-[#F9F9F6] rounded-2xl border border-gray-50 flex justify-between items-center cursor-pointer">
              <span className="font-medium text-[#1A3022]">Bahasa Indonesia</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          {/* Metode Penjemputan */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#1A3022] mb-4">Metode Penjemputan Default</h2>
            <div className="space-y-3">
              <div className="p-4 bg-[#F9F9F6] rounded-2xl border border-green-600 ring-1 ring-green-600">
                <h4 className="font-bold text-[#1A3022] text-sm">Jemput di Rumah</h4>
                <p className="text-gray-400 text-xs mt-0.5">Kurir datang ke lokasi kamu</p>
              </div>
              <div className="p-4 bg-[#F9F9F6] rounded-2xl border border-gray-50 opacity-60">
                <h4 className="font-bold text-[#1A3022] text-sm">Antar ke Drop Point</h4>
                <p className="text-gray-400 text-xs mt-0.5">Setor langsung ke titik pengumpulan</p>
              </div>
            </div>
          </div>

          {/* Privasi */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#1A3022] mb-4">Privasi</h2>
            <div className="flex items-center justify-between p-4 bg-[#F9F9F6] rounded-2xl border border-gray-50">
              <div>
                <h4 className="font-bold text-[#1A3022] text-sm">Tampilkan Profil di Leaderboard</h4>
                <p className="text-gray-400 text-[10px] mt-0.5">Nama dan peringkat kamu terlihat publik</p>
              </div>
              <button 
                onClick={() => setShowInLeaderboard(!showInLeaderboard)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${showInLeaderboard ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${showInLeaderboard ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreferencePage;