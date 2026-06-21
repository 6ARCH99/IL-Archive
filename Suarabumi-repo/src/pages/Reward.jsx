import React, { useState } from 'react';
import RewardCard from '../components/RewardCard';

const Reward = () => {
  const [activeTab, setActiveTab] = useState('tukar');

  const historyData = [
    { title: 'Setor Sampah', date: '28 Mar 2026', points: '+450', type: 'in' },
    { title: 'Tukar ke GoPay', date: '25 Mar 2026', points: '-2000', type: 'out' },
    { title: 'Bonus Referral', date: '22 Mar 2026', points: '+500', type: 'in' },
    { title: 'Setor Sampah', date: '20 Mar 2026', points: '+380', type: 'in' },
  ];

  return (
    <div className="min-h-screen bg-tunas-bg p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-tunas-light rounded-[40px] shadow-sm overflow-hidden border border-gray-200/50">
        
        <main className="p-6 md:p-10">
          {/* Header Poin - Statis */}
          <div className="bg-tunas-dark rounded-[32px] p-8 text-white mb-10 shadow-xl shadow-tunas-dark/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <p className="text-[10px] font-bold opacity-60 tracking-widest uppercase mb-2">REWARD CENTRE</p>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-6xl font-bold">2,450</h1>
                  <span className="text-sm opacity-80">Poin tersedia</span>
                </div>
              </div>
              <div className="flex gap-8 border-l border-white/10 pl-8">
                <div>
                  <p className="text-[10px] opacity-60 font-bold mb-1 uppercase">Poin Masuk</p>
                  <p className="text-xl font-bold">12,450</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-60 font-bold mb-1 uppercase">Poin Terpakai</p>
                  <p className="text-xl font-bold">10,000</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex justify-between text-[11px] font-bold mb-3">
                <p>Butuh 50 poin lagi untuk reward Rp 25,000</p>
                <p>98%</p>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div className="bg-tunas-orange h-full w-[98%] rounded-full transition-all duration-500"></div>
              </div>
            </div>
          </div>

          {/* Menu Navigasi Tab */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { id: 'tukar', label: 'Tukar', icon: '💰' },
              { id: 'riwayat', label: 'Riwayat', icon: '⏳' },
              { id: 'referral', label: 'Referral', icon: '👥' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all border shadow-sm ${
                  activeTab === tab.id 
                  ? 'bg-tunas-dark text-white border-tunas-dark' 
                  : 'bg-white text-tunas-dark border-gray-100 hover:bg-gray-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 min-h-[400px]">
              
              {/* CONTENT: TUKAR */}
              {activeTab === 'tukar' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-tunas-dark mb-2">Tukar Poin ke E-Wallet</h2>
                    <p className="text-gray-400 text-sm">Pilih platform e-wallet favoritmu</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <RewardCard amount="Rp 5,000" points="500" />
                    <RewardCard amount="Rp 10,000" points="1,000" />
                    <RewardCard amount="Rp 25,000" points="2,500" isLocked />
                    <RewardCard amount="Rp 50,000" points="5,000" isLocked />
                  </div>
                </div>
              )}

              {/* CONTENT: RIWAYAT */}
              {activeTab === 'riwayat' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-2xl font-bold text-tunas-dark mb-6">Riwayat Penukaran Poin</h2>
                  <div className="space-y-4">
                    {historyData.map((item, index) => (
                      <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${item.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {item.type === 'in' ? '📈' : '📉'}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-tunas-dark">{item.title}</p>
                            <p className="text-[10px] text-gray-400 font-medium">{item.date}</p>
                          </div>
                        </div>
                        <p className={`font-bold text-base ${item.type === 'in' ? 'text-tunas-green' : 'text-orange-500'}`}>
                          {item.points}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTENT: REFERRAL */}
              {activeTab === 'referral' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-center sm:text-left">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-tunas-dark mb-2">Ajak Teman, Dapat Bonus! 🎁</h2>
                    <p className="text-gray-400 text-sm">Bagikan kodemu dan dapatkan bonus poin instan.</p>
                  </div>
                  
                  <div className="bg-white rounded-[32px] border border-gray-100 p-10 text-center mb-8 shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Kode Unikmu</p>
                    <h3 className="text-5xl font-black text-tunas-dark mb-8 tracking-tighter">PUTRA24</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <button className="bg-tunas-dark text-white px-10 py-3 rounded-2xl text-xs font-bold hover:opacity-90 transition-all">Salin Kode</button>
                      <button className="bg-gray-50 text-tunas-dark px-10 py-3 rounded-2xl text-xs font-bold border border-gray-100 hover:bg-gray-100 transition-all">Bagikan</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { val: '12', label: 'Diajak' },
                      { val: '8', label: 'Gabung' },
                      { val: '800', label: 'Poin' }
                    ].map(stat => (
                      <div key={stat.label} className="bg-tunas-green/10 border border-tunas-green/20 p-4 rounded-2xl">
                        <p className="text-xl font-black text-tunas-dark">{stat.val}</p>
                        <p className="text-[9px] font-bold text-tunas-green uppercase">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (Statis) */}
            <div className="space-y-6">
              <div className="bg-tunas-orange/10 p-8 rounded-[32px] border border-tunas-orange/20">
                <h3 className="text-tunas-orange font-bold mb-4 flex items-center gap-2 text-sm">💡 Tips Poin</h3>
                <ul className="text-[11px] text-tunas-dark space-y-4 font-medium leading-relaxed">
                  <li>• Setor sampah rutin setiap minggu</li>
                  <li>• Ikuti challenge mingguan</li>
                  <li>• Ajak teman bergabung</li>
                </ul>
              </div>

              <div className="bg-[#E7F7EF] p-8 rounded-[32px] border border-green-100">
                <h3 className="text-tunas-dark font-bold mb-2 text-sm">Poin = Uang Nyata</h3>
                <p className="text-tunas-green font-bold text-xs mb-3">1 poin = Rp 10</p>
                <p className="text-[10px] text-gray-400 leading-relaxed italic">Proses pencairan 1x24 jam ke e-wallet pilihanmu.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reward;