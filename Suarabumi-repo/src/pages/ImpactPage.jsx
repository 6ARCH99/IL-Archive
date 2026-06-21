import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';

const ImpactPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getClimateImpact()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const impact = data?.impactMetrics;
  const trend = data?.contributionTrend6Months;
  const comparison = data?.comparison;
  const rank = data?.communityRank;

  const stats = impact
    ? [
        { label: 'Setara Menanam', value: `${impact.treesEquivalent} pohon`, sub: 'CO2 yang diserap', icon: '🌲', color: 'bg-[#E9F5EF]' },
        { label: 'Air Dihemat', value: `${impact.waterSavedLiters} Liter`, sub: 'Dari proses daur ulang', icon: '💧', color: 'bg-[#E9F5EF]' },
        { label: 'Energi Dihemat', value: `${impact.energySavedKwh} kWh`, sub: 'Listrik yang tidak terpakai', icon: '⚡', color: 'bg-[#FFF8E6]' },
      ]
    : [];

  const maxTrend = trend ? Math.max(...trend.weightKg, 1) : 1;

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-10">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#1A3022] font-serif mb-2 flex items-center gap-2">
            Dampak Iklimmu 🌍
          </h1>
          <p className="text-gray-500">Lihat kontribusi nyata kamu terhadap lingkungan.</p>
          {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((item, index) => (
            <div key={index} className="bg-white rounded-[32px] p-8 text-center shadow-sm border border-gray-100">
              <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl`}>
                {item.icon}
              </div>
              <div className="text-4xl font-bold text-[#1A3022] mb-1">{item.value}</div>
              <div className="font-bold text-[#1A3022] text-sm mb-1">{item.label}</div>
              <div className="text-xs text-gray-400">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1A3022]">Trend Kontribusi</h2>
              <p className="text-sm text-gray-400">Total sampah terpilah 6 bulan terakhir</p>
            </div>
            {trend && (
              <div className="bg-[#E9F5EF] text-[#2D4A37] text-[10px] font-bold px-3 py-1 rounded-full">
                {trend.changePercentFromLastMonth >= 0 ? '+' : ''}
                {trend.changePercentFromLastMonth}% dari bulan lalu
              </div>
            )}
          </div>

          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {trend?.labels.map((month, i) => (
              <div key={month} className="flex flex-col items-center flex-1 gap-2">
                <div
                  className="w-full max-w-[48px] bg-[#6BA67E] rounded-t-lg"
                  style={{ height: `${(trend.weightKg[i] / maxTrend) * 180}px`, minHeight: '8px' }}
                />
                <span className="text-[10px] text-gray-400 font-bold">{month}</span>
                <span className="text-[9px] text-[#2D4A37] font-bold">{trend.weightKg[i]} kg</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#F5F5F0] rounded-lg">👥</div>
              <div>
                <h3 className="font-bold text-[#1A3022]">Perbandingan Pengguna</h3>
                <p className="text-xs text-gray-400">Lihat posisi kamu di komunitas</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#FFF4E5] p-4 rounded-2xl flex justify-between items-center border border-[#FFE0B2]">
                <div>
                  <span className="bg-[#E67E22] text-white text-[10px] font-bold px-2 py-0.5 rounded mr-2">1</span>
                  <span className="font-bold text-[#1A3022]">Kamu</span>
                  {rank && (
                    <p className="text-[10px] text-orange-600 font-bold ml-6">{rank.label} pengguna</p>
                  )}
                </div>
                <div className="font-bold text-[#1A3022]">{comparison?.userKgPerMonth ?? '—'} kg/bulan</div>
              </div>
              <div className="bg-[#F5F5F0] p-4 rounded-2xl flex justify-between items-center">
                <span className="font-bold text-gray-500 text-sm">Rata-rata Komunitas</span>
                <div className="font-bold text-gray-500">{comparison?.communityAvgKgPerMonth ?? '—'} kg/bulan</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A3022] rounded-[32px] p-8 text-white">
            <h3 className="font-bold text-xl mb-4 font-serif">Bagikan Pencapaian</h3>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              {impact
                ? `"Aku sudah menyelamatkan lingkungan setara dengan menanam ${impact.treesEquivalent} pohon! 🌳"`
                : 'Inspirasi teman-temanmu!'}
            </p>
            <div className="flex gap-2 text-[10px] font-bold opacity-60 mb-6">
              <span>#TunasAction</span>
              <span>#ClimateHero</span>
            </div>
            <div className="flex gap-3">
              {['WhatsApp', 'Instagram', 'Twitter'].map((s) => (
                <button key={s} className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
