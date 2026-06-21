const RewardCard = ({ amount, points, isLocked }) => (
  <div className={`p-6 rounded-3xl border ${isLocked ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer'}`}>
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-xl font-bold text-tunas-dark">{amount}</h4>
      {isLocked && <span className="text-xs font-bold text-gray-400">Terkunci</span>}
    </div>
    <p className={`text-sm font-bold ${isLocked ? 'text-gray-400' : 'text-tunas-green'}`}>{points} poin</p>
  </div>
);

export default RewardCard;