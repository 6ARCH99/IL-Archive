const StatsCard = ({ title, value, icon, sub, progress, trend }) => (
  <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-6">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-4xl font-bold mb-3">{value}</div>
    {progress ? (
      <>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div className="bg-tunas-green h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-[11px] mt-2 text-gray-400 font-medium">{sub}</p>
      </>
    ) : (
      <p className={`text-[11px] font-bold ${trend ? 'text-tunas-green' : 'text-gray-400'}`}>{sub}</p>
    )}
  </div>
);

export default StatsCard;