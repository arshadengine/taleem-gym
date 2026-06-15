import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      window.deferredPrompt = e; // Expose globally
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Global install function for manual buttons
    window.triggerPWAInstall = async () => {
      if (!window.deferredPrompt) {
        alert('To install the app on your device:\n\nAndroid: Tap the browser menu (⋮) and select "Install app" or "Add to Home screen".\n\niOS: Tap the Share button (square with arrow) and select "Add to Home Screen".');
        return;
      }
      window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        window.deferredPrompt = null;
        setIsVisible(false);
      }
    };

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    window.triggerPWAInstall();
  };

  if (!isVisible) return null;

  return (
    <div className="animate-scale-in" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: 'calc(100% - 40px)',
      maxWidth: '400px'
    }}>
      <div className="glass-card" style={{
        padding: '1rem 1.5rem',
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: 'none',
        borderRadius: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: '#000',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Download size={20} color="white" />
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.02em' }}>INSTALL TALEEM GYM</div>
          <div style={{ fontSize: '0.65rem', fontWeight: '700', opacity: 0.6 }}>Fast access from your home screen</div>
        </div>

        <button 
          onClick={handleInstallClick}
          style={{
            background: '#000',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.7rem',
            fontWeight: '900',
            cursor: 'pointer',
            letterSpacing: '0.05em'
          }}
        >
          INSTALL
        </button>

        <button 
          onClick={() => setIsVisible(false)}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.25rem',
            cursor: 'pointer',
            opacity: 0.4
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default InstallPWA;
