import React from 'react';
import { Smartphone, Monitor, Laptop } from 'lucide-react';

const DeviceSelectionModal = ({ isOpen, onDeviceSelect, onClose }) => {
  if (!isOpen) return null;

  const devices = [
    { 
      id: 'android', 
      name: 'Android Device', 
      description: 'Smartphones & Tablets',
      icon: Smartphone,
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-600/20'
    },
    { 
      id: 'ios', 
      name: 'iOS Device', 
      description: 'iPhone & iPad',
      icon: Smartphone,
      gradient: 'from-purple-400 to-blue-500',
      bgGradient: 'from-purple-500/20 to-blue-600/20'
    },
    { 
      id: 'windows', 
      name: 'Desktop Computer', 
      description: 'Windows & macOS',
      icon: Monitor,
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-600/20'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex justify-center items-center p-4">
      <div className="relative max-w-md w-full">
        {/* Background Glow Effect - Same as loading modal */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
        
        {/* Main Modal Container - Same gradient as loading modal */}
        <div className="relative bg-gradient-to-br from-[#1a0a3e]/95 to-[#0a0520]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          
          {/* Header - Same style as loading modal */}
          <div className="relative px-6 py-5 border-b border-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <div className="relative">
              <h2 className="text-xl font-semibold text-white">Select Your Device</h2>
              <p className="text-purple-200/80 text-sm mt-1">Choose your device to continue</p>
            </div>
          </div>
          
          {/* Device Options */}
          <div className="px-6 py-6">
            <div className="space-y-3">
              {devices.map((device) => {
                const IconComponent = device.icon;
                return (
                  <button
                    key={device.id}
                    onClick={() => onDeviceSelect(device.id)}
                    className="w-full cursor-pointer p-4 rounded-xl border-2 border-purple-500/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${device.bgGradient} border border-purple-500/30 group-hover:border-purple-400/50 transition-colors`}>
                        <IconComponent className="w-5 h-5 text-white" />
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
                    
                    {/* Selection Indicator */}
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-white transition-all duration-300"></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Footer - Same style as loading modal */}
          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 border-t border-purple-500/20">
            <p className="text-xs text-gray-400 text-center">
              Select the device you're using to claim your reward
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceSelectionModal;