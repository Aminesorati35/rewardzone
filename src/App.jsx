import { useState } from "react";
import Navbar from "./components/Navbar";
import rewards from "./data/rewards";
import RewardCard from "./components/RewardCard";
import LoadingModal from "./components/LoadingModal";
import DeviceSelectionModal from "./components/DeviceSelectionModal";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [lockerId, setLockerId] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [filteredGame, setFilteredGame] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  
  const games = ["all", ...new Set(rewards.map((el) => el.gameName))];
  
  // Filter rewards based on selected game and search term
  const filteredRewards = rewards.filter((reward) => {
    const matchesGame = filteredGame === "all" || reward.gameName === filteredGame;
    const matchesSearch = reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.gameName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGame && matchesSearch;
  });

  const handleClaimClick = (lockerId) => {
    setLockerId(lockerId);
    setShowDeviceModal(true);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setShowDeviceModal(false);
    setShowModal(true);
  };

  const handleModalComplete = () => {
    setShowModal(false);
    console.log("Loading locker:", lockerId, "for device:", selectedDevice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0520] via-[#1a0a3e] to-[#0a0520] text-white">
      <Navbar />
      
      <section className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
            Featured Scripts & Rewards
          </h2>
        </div>
        
        {/* Enhanced Filter Section */}
        <div className="mb-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Get the Latest Scripts & Rewards
            </h3>

          </div>

          {/* Filter Buttons */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Filter by Game</h4>
            <div className="flex flex-wrap gap-2">
              {games.map((game, index) => (
                <button
                  key={index}
                  onClick={() => setFilteredGame(game)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 border cursor-pointer ${
                    filteredGame === game
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 shadow-lg shadow-purple-500/25"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                  }`}
                >
                  {game === "all" ? <span> <FontAwesomeIcon icon={faGamepad}/>  All Games</span> : game}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Indicator */}
          {filteredGame !== "all" && (
            <div className="mt-4 flex items-center gap-2 text-sm text-purple-300">
              <span>Showing rewards for:</span>
              <span className="font-semibold">{filteredGame}</span>
              <button
                onClick={() => setFilteredGame("all")}
                className="ml-2 px-2 py-1 text-xs bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredRewards.length} of {rewards.length} rewards
            {filteredGame !== "all" && ` for ${filteredGame}`}
          </p>
        </div>
        
        {/* Rewards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredRewards.map((reward) => (
            <RewardCard 
              key={reward.id} 
              reward={reward} 
              setShowModal={() => handleClaimClick(reward.lockerId)} 
              setLockerId={setLockerId} 
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredRewards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No rewards found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
      
      <DeviceSelectionModal 
        isOpen={showDeviceModal}
        onDeviceSelect={handleDeviceSelect}
        onClose={() => setShowDeviceModal(false)}
      />
      
      <LoadingModal 
        isOpen={showModal} 
        onComplete={handleModalComplete} 
        device={selectedDevice}
        lockerId={lockerId}
      />
      
      <Footer />
    </div>
  );
}

export default App;