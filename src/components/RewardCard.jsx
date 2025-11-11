import { Gift, Star, Users, Download } from "lucide-react";

const RewardCard = ({ reward, setShowModal, setLockerId }) => {
  const handleClaim = (e) => {
    e.stopPropagation();
    setLockerId(reward.lockerId);
    setShowModal();
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 shadow-lg hover:shadow-2xl hover:border-purple-400/40 transition-all duration-500 cursor-pointer hover:-translate-y-2 group">
      {/* Image Section */}
      <div className="relative h-70 sm:h-65 overflow-hidden">
        <img 
          src={reward.heroImage} 
          alt={reward.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Hot Badge */}
        {reward.badge && 
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            {reward.badge}
          </span>
        </div>
        }
        
        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-2xl line-clamp-1 tracking-tight">
            {reward.title}
          </h3>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Description */}
        <div className="mb-4">
          {reward.description && (
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {reward.description}
            </p>
          )}
        </div>
        
        {/* Feature Tags */}
        {reward.tags && reward.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {reward.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-purple-600/40 backdrop-blur-sm text-purple-100 text-xs px-3 py-1.5 rounded-lg border border-purple-500/40 font-medium transition-colors hover:bg-purple-600/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm">{reward.rating}</span>
          </div>
          
          <div className="flex items-center gap-1 text-blue-400">
            <Users className="w-4 h-4" />
            <span className="text-gray-300 text-xs font-medium">{reward.users}</span>
          </div>
          
          <div className="text-gray-400 text-xs font-medium bg-white/5 px-2 py-1 rounded-lg">
            {reward.size}
          </div>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] group/btn"
        >
          <div className="relative">
            <Gift className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
            <Download className="w-3 h-3 absolute -top-1 -right-1" />
          </div>
          <span className="text-sm tracking-wide">Download Now</span>
        </button>
      </div>
    </div>
  );
};

export default RewardCard;