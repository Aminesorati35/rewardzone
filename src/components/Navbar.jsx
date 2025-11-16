import { Gift, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-[#0a0520]/80 border-b border-purple-800/50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                RewardZone
              </h1>
              <p className="text-[10px] text-gray-400 -mt-1">Get Free Script + Rewards</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
              <span className="text-xs font-bold text-purple-400">5.2M+</span>
              <span className="text-xs text-gray-400 ml-1">Rewards Claimed</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;