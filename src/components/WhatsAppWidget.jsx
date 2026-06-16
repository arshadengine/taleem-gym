import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('0:23');

  useEffect(() => {
    // Generate actual current time for the chat bubble timestamp
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    setTimeStr(`${hours}:${minutes} ${ampm}`);
  }, [isOpen]);

  const handleStartChat = () => {
    const url = "https://wa.me/917720803644?text=Hi%2C%20I%20have%20an%20enquiry%20about%20Taleem%20Gym%20memberships%20and%20packages.";
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ fontFamily: 'Open Sans, sans-serif' }}>
      
      {/* 1. Chat Widget Window Popup */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '105px',
          right: '30px',
          width: '350px',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
          zIndex: 9999,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'whatsapp-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)'
        }} className="whatsapp-chat-window">
          
          {/* Header */}
          <div style={{
            background: '#095e54',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'relative'
          }}>
            {/* Avatar with Gym Logo */}
            <div style={{
              width: '45px',
              height: '45px',
              background: '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
              padding: '2px'
            }}>
              <img 
                src="https://taleemthefitnesszone.in/images/logoo.png" 
                alt="Taleem Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Header Text */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{
                color: '#ffffff',
                margin: 0,
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'none',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Taleem The Fitness Zone
              </h3>
              <span style={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: '11px',
                fontWeight: '400',
                marginTop: '2px'
              }}>
                Typically replies within a day
              </span>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px',
                opacity: 0.8,
                transition: 'opacity 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.opacity = 1}
              onMouseOut={e => e.currentTarget.style.opacity = 0.8}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div style={{
            background: '#efeae2',
            padding: '24px 20px',
            flex: 1,
            position: 'relative',
            maxHeight: '220px',
            overflowY: 'auto'
          }}>
            {/* Timestamp */}
            <div style={{
              textAlign: 'center',
              fontSize: '11px',
              color: '#8b98a1',
              marginBottom: '15px',
              textTransform: 'uppercase'
            }}>
              {timeStr}
            </div>

            {/* Message Bubble */}
            <div style={{
              background: '#ffffff',
              padding: '12px 16px',
              borderRadius: '0px 10px 10px 10px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              maxWidth: '85%',
              position: 'relative'
            }}>
              {/* Message Content */}
              <div style={{ color: '#111b21', fontSize: '13px', lineHeight: '1.5', fontWeight: '500' }}>
                Hi there 👋
              </div>
              <div style={{ color: '#111b21', fontSize: '13px', lineHeight: '1.5', fontWeight: '500', marginTop: '4px' }}>
                How can I help you?
              </div>

              {/* Chat bubble tail */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-8px',
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 8px 10px 0',
                borderColor: 'transparent #ffffff transparent transparent'
              }}></div>
            </div>
          </div>

          {/* Footer Area with Start Chat Button */}
          <div style={{
            padding: '16px 20px',
            background: '#ffffff',
            borderTop: '1px solid #f0f0f0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* Action button */}
            <button 
              onClick={handleStartChat}
              style={{
                background: '#4FCE5D',
                color: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 5px rgba(79,206,93,0.3)',
                transition: 'all 0.3s ease',
                width: '100%',
                outline: 'none'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#25D366';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(37,211,102,0.4)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#4FCE5D';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(79,206,93,0.3)';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.48 4.957 1.482 5.568 0 10.1-4.526 10.104-10.093.002-2.697-1.046-5.234-2.952-7.143-1.906-1.91-4.437-2.962-7.143-2.964-5.57 0-10.104 4.526-10.107 10.097-.001 1.831.503 3.619 1.467 5.181l-.962 3.513 3.636-.954zm11.13-7.234c-.266-.134-1.577-.779-1.821-.867-.245-.089-.423-.134-.6.134-.177.267-.689.867-.844 1.046-.156.177-.312.2-.578.066-.266-.134-1.123-.414-2.139-1.32-.79-.705-1.324-1.577-1.48-1.844-.155-.266-.016-.41.118-.543.12-.12.266-.312.4-.467.135-.156.179-.267.268-.445.09-.178.045-.334-.022-.467-.067-.134-.6-1.446-.823-1.98-.217-.52-.454-.45-.6-.458-.137-.008-.297-.01-.457-.01-.16 0-.423.06-.644.3-.22.24-.844.824-.844 2.01 0 1.185.863 2.33 1.085 2.63.22.3.1.268.3.4.156.096.312.164.48.243l.534.254c.677.319 1.344.417 2.004.319.467-.07.962-.382 1.099-.752.137-.37.137-.687.096-.752-.04-.066-.178-.106-.444-.24z" />
              </svg>
              Start Chat
            </button>

            {/* Widget branding */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#8b98a1',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              <i className="fa fa-history"></i>
              <span>Free WhatsApp Chat Widget</span>
            </div>
          </div>
        </div>
      )}      {/* 2. Floating WhatsApp Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'transparent',
          zIndex: 9999,
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="whatsapp-float-trigger"
        title="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <defs>
            <linearGradient id="waGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2ae06a" />
              <stop offset="100%" stopColor="#1bb753" />
            </linearGradient>
          </defs>
          
          {/* Outer white bubble outline (conforms to speech bubble shape) */}
          <path 
            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z" 
            fill="#ffffff" 
          />
          
          {/* Inner green bubble + handset cutout (aligns perfectly) */}
          <path 
            d="M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.577-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.091-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" 
            fill="url(#waGradient)" 
          />
        </svg>
      </button>

      {/* Embedded Animations */}
      <style>{`
        @keyframes whatsapp-pop {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes whatsapp-pulse {
          0% {
            filter: drop-shadow(0 4px 8px rgba(37, 211, 102, 0.4));
          }
          50% {
            filter: drop-shadow(0 6px 16px rgba(37, 211, 102, 0.8));
          }
          100% {
            filter: drop-shadow(0 4px 8px rgba(37, 211, 102, 0.4));
          }
        }
        .whatsapp-float-trigger {
          animation: whatsapp-pulse 2s infinite;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
        }
        .whatsapp-float-trigger svg {
          width: 60px;
          height: 60px;
          transition: all 0.3s ease;
        }
        .whatsapp-float-trigger:hover {
          transform: scale(1.08) !important;
          animation: none;
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35)) !important;
        }
        @media (max-width: 768px) {
          .whatsapp-chat-window {
            bottom: 95px !important;
            right: 20px !important;
            width: 310px !important;
          }
          .whatsapp-float-trigger {
            bottom: 20px !important;
            right: 20px !important;
          }
          .whatsapp-float-trigger svg {
            width: 55px;
            height: 55px;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppWidget;
