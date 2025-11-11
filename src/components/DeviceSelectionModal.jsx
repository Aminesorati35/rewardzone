import React, { useState } from 'react';
import { Smartphone, Monitor, Laptop } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faDesktop, faMobileAndroid, faTabletAndroid } from '@fortawesome/free-solid-svg-icons';

const DeviceSelectionModal = ({ isOpen, onDeviceSelect, onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  if (!isOpen) return null;

  const devices = [
    { 
      id: 'android', 
      name: 'Android Device', 
      description: 'Smartphones & Tablets',
      icon: faTabletAndroid,
      iconType: 'fontawesome',
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-600/20'
    },
    { 
      id: 'ios', 
      name: 'iOS Device', 
      description: 'iPhone & iPad',
      icon: faAppleAlt,
      iconType: 'fontawesome',
      gradient: 'from-purple-400 to-blue-500',
      bgGradient: 'from-purple-500/20 to-blue-600/20'
    },
    { 
      id: 'windows', 
      name: 'Desktop Computer', 
      description: 'Windows & macOS',
      icon: faDesktop,
      iconType: 'fontawesome',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-600/20'
    }
  ];

  const handleDeviceClick = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const handleConfirm = () => {
    if (selectedDevice) {
      onDeviceSelect(selectedDevice);
      setSelectedDevice(null);
    }
  };

  const handleClose = () => {
    setSelectedDevice(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex justify-center items-center p-4">
      <div className="relative max-w-md w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
        
        <div className="relative bg-gradient-to-br from-[#1a0a3e]/95 to-[#0a0520]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          
          <div className="relative px-6 py-5 border-b border-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <div className="relative">
              <h2 className="text-xl font-semibold text-white">Select Your Device</h2>
              <p className="text-purple-200/80 text-sm mt-1">Choose your device to continue</p>
            </div>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-3">
              {devices.map((device) => {
                const iconComponent = device.icon;
                const isSelected = selectedDevice === device.id;
                
                return (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceClick(device.id)}
                    className={`w-full cursor-pointer p-4 rounded-xl border-2 bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-between group ${
                      isSelected 
                        ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25' 
                        : 'border-purple-500/20 hover:border-purple-400/40'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${device.bgGradient} border transition-colors ${
                        isSelected ? 'border-purple-400' : 'border-purple-500/30 group-hover:border-purple-400/50'
                      }`}>
                        <FontAwesomeIcon icon={iconComponent} className="text-2xl h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-white group-hover:text-gray-100 transition-colors">
                          {device.name}
                        </h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                          {device.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border-2 transition-colors flex items-center justify-center ${
                      isSelected 
                        ? 'border-purple-400 bg-purple-400' 
                        : 'border-white/30 group-hover:border-white/60'
                    }`}>
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-white scale-100' : 'bg-transparent group-hover:bg-white scale-50'
                      }`}></div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="cursor-pointer flex-1 py-3 px-4 rounded-xl border-2 border-purple-500/30 bg-transparent text-white hover:bg-white/5 hover:border-purple-400/40 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedDevice}
                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300 ${
                  selectedDevice
                    ? 'cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 border-purple-400 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02]'
                    : 'bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 border-t border-purple-500/20">
            <p className="text-xs text-gray-400 text-center">
              {selectedDevice 
                ? `Selected: ${devices.find(d => d.id === selectedDevice)?.name}` 
                : "Select the device you're using to claim your reward"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceSelectionModal;