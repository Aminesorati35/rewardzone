import { useState } from "react";
import Navbar from "./components/Navbar";
import rewards from "./data/rewards";
import RewardCard from "./components/RewardCard";
import LoadingModal from "./components/LoadingModal";
import DeviceSelectionModal from "./components/DeviceSelectionModal"; // Make sure this is imported
import Footer from "./components/Footer";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [lockerId, setLockerId] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleClaimClick = (lockerId) => {
    setLockerId(lockerId);
    setShowDeviceModal(true); // Show device selection first
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setShowDeviceModal(false);
    setShowModal(true); // Then show loading modal
  };

  const handleModalComplete = () => {
    setShowModal(false);
    // Here you would call your locker script
    console.log("Loading locker:", lockerId, "for device:", selectedDevice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0520] via-[#1a0a3e] to-[#0a0520] text-white">
      <Navbar />
      
      <section className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent">
            Featured Rewards
          </h2>
          <p className="text-gray-400">Claim free rewards in minutes</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {rewards.map((reward) => (
            <RewardCard 
              key={reward.id} 
              reward={reward} 
              setShowModal={() => handleClaimClick(reward.lockerId)} 
              setLockerId={setLockerId} 
            />
          ))}
        </div>
      </section>
      
      {/* Add the Device Selection Modal */}
      <DeviceSelectionModal 
        isOpen={showDeviceModal}
        onDeviceSelect={handleDeviceSelect}
        onClose={() => setShowDeviceModal(false)}
      />
      
      <LoadingModal 
  isOpen={showModal} 
  onComplete={handleModalComplete} 
  device={selectedDevice}
  lockerId={lockerId} // Add this line
/>
      <Footer />
    </div>
  );
}

export default App;