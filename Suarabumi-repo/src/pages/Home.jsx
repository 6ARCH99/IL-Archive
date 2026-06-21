import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { api } from '../services/api.js';

const formatNumber = (n) => n?.toLocaleString('id-ID') ?? '0';

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  const userName = user?.name || user?.fullName || 'Pengguna';

  useEffect(() => {
    api.getDashboard()
      .then((res) => setDashboard(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const points = dashboard?.points;
  const co2 = dashboard?.co2;
  const deposits = dashboard?.deposits;
  const chart = dashboard?.depositChartLast7Days ?? [];
  const maxChart = Math.max(...chart.map((d) => d.depositCount), 1);
  const challenges = dashboard?.activeChallenges ?? [];
  const activities = dashboard?.recentActivities ?? [];

  const memberSince = deposits?.memberSince
    ? new Date(deposits.memberSince).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="min-h-screen bg-[#F5F5F0] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <main className="pt-4">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#1A3022] font-serif mb-2">
              Selamat Datang, {userName}! 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Terus semangat jaga lingkungan. Kamu sudah berkontribusi banyak!
            </p>
            {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatsCard
              title="Total Poin"
              value={points ? formatNumber(points.total) : '—'}
              icon="🏆"
              sub={points ? `${points.progressPercent}% menuju level ${points.nextLevel}` : ''}
              progress={points?.progressPercent ?? 0}
              color="bg-white"
            />
            <StatsCard
              title="CO₂ Diselamatkan"
              value={co2 ? `${co2.totalSavedKg} kg` : '—'}
              icon="🌍"
              sub={co2 ? `+${co2.weeklyDeltaKg} kg minggu ini 🎉` : ''}
              trend
              color="bg-white"
            />
            <StatsCard
              title="Total Setor"
              value={deposits ? `${deposits.totalCount} kali` : '—'}
              icon="📦"
              sub={`Sejak ${memberSince}`}
              color="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1A3022] mb-8 font-serif">Aktivitas Setor — 7 Hari Terakhir</h3>
              <div className="flex items-end justify-between h-56 px-4">
                {chart.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-full">
                    <div
                      className="w-10 bg-[#6BA67E] rounded-t-lg transition-all hover:bg-[#2D4A37] cursor-pointer"
                      style={{ height: `${(day.depositCount / maxChart) * 100}%`, minHeight: day.depositCount ? '8%' : '4%' }}
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{day.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A3022] p-8 rounded-[32px] text-white shadow-xl">
              <h3 className="font-bold mb-6 font-serif text-lg">Aksi Cepat</h3>
              <div className="space-y-4">
                <div
                  onClick={() => navigate('/drop-point')}
                  className="bg-white/10 p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/20 border border-white/5 transition-all active:scale-95"
                >
                  <span className="text-2xl">📍</span>
                  <div className="text-left">
                    <p className="text-sm font-bold">Cari Drop Point</p>
                    <p className="text-[10px] opacity-60">Terdekat dari lokasimu</p>
                  </div>
                </div>
                <div
                  onClick={() => navigate('/penjemputan')}
                  className="bg-white/10 p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/20 border border-white/5 transition-all active:scale-95"
                >
                  <span className="text-2xl">📅</span>
                  <div className="text-left">
                    <p className="text-sm font-bold">Jadwalkan Penjemputan</p>
                    <p className="text-[10px] opacity-60">Gratis langsung ke rumah</p>
                  </div>
                </div>
                <div
                  onClick={() => navigate('/reward')}
                  className="bg-[#D99A29] p-5 rounded-2xl flex items-center gap-4 cursor-pointer text-[#1A3022] transition-all hover:scale-[1.03] active:scale-95 shadow-lg"
                >
                  <span className="text-2xl">💰</span>
                  <div className="text-left">
                    <p className="text-sm font-bold">Tukar Poin</p>
                    <p className="text-[10px] font-bold opacity-80">Ke GoPay, OVO, Dana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#1A3022] mb-6 font-serif">Challenge Aktif</h3>
              <div className="space-y-4">
                {challenges.length === 0 && (
                  <p className="text-sm text-gray-400">Belum ada challenge aktif.</p>
                )}
                {challenges.map((c) => (
                  <div key={c.id} className="p-4 bg-[#F9F9F6] rounded-2xl border border-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-bold text-[#2D4A37]">{c.title}</p>
                      <span className="text-xs text-gray-400">🎯</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-[#6BA67E] h-2 rounded-full"
                        style={{ width: `${c.progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold">
                      {c.progress} / {c.target} {c.unit} ({c.progressPercent}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#1A3022] font-serif">Aktivitas Terakhir</h3>
                <button onClick={() => navigate('/profile')} className="text-xs font-bold text-[#2D4A37] hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-4">
                {activities.map((act) => {
                  const icon = act.type === 'deposit' ? '📦' : act.type === 'redemption' ? '💰' : '🚚';
                  const minus = act.pointsDelta < 0;
                  return (
                    <div key={act.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F5F5F0] rounded-xl flex items-center justify-center text-lg">{icon}</div>
                        <div>
                          <p className="text-xs font-bold text-[#1A3022]">{act.title}</p>
                          <p className="text-[10px] text-gray-400">{act.description}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-black ${minus ? 'text-red-500' : 'text-[#2D4A37]'}`}>
                        {act.pointsDelta > 0 ? '+' : ''}{act.pointsDelta} poin
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
