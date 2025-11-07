import { Gift } from "lucide-react";

const RewardCard = ({ reward, setShowModal, setLockerId }) => {
  const handleClaim = (e) => {
    e.stopPropagation();
    setLockerId(reward.lockerId);
    setShowModal(); // Just call the function without arguments
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-purple-400/40 transition-all duration-300 cursor-pointer hover:-translate-y-2 group">
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20">
        <img 
          src={reward.heroImage} 
          alt={reward.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            HOT
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg line-clamp-1">{reward.shortName}</h3>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <p className="text-gray-300 text-xs sm:text-sm mb-2 line-clamp-1">{reward.provider}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-yellow-400">
            <span className="mr-1 text-sm">⭐</span>
            <span className="font-bold text-sm">{reward.rating}</span>
          </div>
          <p className="text-gray-400 text-xs">{reward.claimed} claimed</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-purple-500/20 text-center">
            <p className="text-gray-400 text-xs mb-0.5">Value</p>
            <p className="font-bold text-xs text-purple-300">{reward.value}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-purple-500/20 text-center">
            <p className="text-gray-400 text-xs mb-0.5">Time</p>
            <p className="font-bold text-xs text-blue-300">{reward.time}</p>
          </div>
        </div>
        
        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
        >
          <Gift className="w-4 h-4" />
          Earn Now
        </button>
      </div>
    </div>
  );
};
export default RewardCard;