import React from 'react';

const HelpPage = ({ onBack }) => {
  const faqs = ["Bagaimana cara menukar poin?", "Berapa minimal sampah?", "Cara dapat poin lebih banyak?", "Poin saya hilang?", "Sampah ditolak?"];

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
          <h1 className="text-4xl font-bold text-[#1A3022] mb-2 font-serif">Bantuan</h1>
          <p className="text-gray-500 text-sm">Temukan jawaban untuk pertanyaan kamu</p>
        </header>

        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input type="text" placeholder="Cari bantuan..." className="w-full bg-white border border-gray-100 py-4 pl-12 pr-6 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-100 text-sm" />
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-bold text-[#1A3022] mb-6">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {faqs.map((q, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <span className="font-bold text-[#1A3022] text-sm">{q}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-[#1A3022] rounded-[32px] p-8 text-white relative overflow-hidden">
          <h3 className="text-xl font-bold mb-2">Butuh Bantuan Lebih Lanjut?</h3>
          <p className="text-green-100/70 text-sm mb-8">Tim support kami siap membantu 24/7</p>
          <div className="flex flex-col md:flex-row gap-4 relative z-10">
            <button className="flex-1 bg-white text-[#1A3022] py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2">Chat Kami</button>
            <button className="flex-1 bg-[#2D4A37] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/10">Email Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HelpPage;