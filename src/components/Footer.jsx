const Footer = () => {
  return (
    <footer className="relative mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="bg-gradient-to-b from-[#1a0a3e]/30 to-[#0a0520]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm font-medium">
                © 2025 RewardZone. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs max-w-md">
                Earn free rewards by completing simple tasks. All trademarks belong to their respective owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer