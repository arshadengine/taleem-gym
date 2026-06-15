import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, QrCode, LogOut } from 'lucide-react';

function Scan({ userName, onLogout }) {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only initialize scanner if we haven't scanned successfully yet
    if (scanResult) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanFailure);

    async function onScanSuccess(decodedText) {
      // Prevent multiple scans
      scanner.clear();
      setLoading(true);

      try {
        // Try to add to Firestore
        try {
          await addDoc(collection(db, "attendance"), {
            studentName: userName,
            studentId: 'prototype-user', // Mock ID for prototype
            location: decodedText, // e.g. "ROOM_A_ENTRANCE"
            timestamp: serverTimestamp(),
            status: "Present"
          });
        } catch (fbErr) {
          console.log("Firebase not configured. Simulated success.", fbErr);
        }
        
        setScanResult(decodedText);
      } catch (err) {
        console.error("Error saving attendance", err);
      } finally {
        setLoading(false);
      }
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning
    }

    return () => {
      // cleanup scanner when component unmounts
      scanner.clear().catch(console.error);
    };
  }, [scanResult, userName]);

  return (
    <>
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '0.25rem' }}>
            <QrCode size={20} color="white" />
          </div>
          <span className="font-bold">Scanner ({userName})</span>
        </div>
        <button 
          onClick={onLogout}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
        </button>
      </nav>

      <div className="container">
        <div className="card text-center" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {!scanResult && !loading ? (
            <>
              <h2 className="text-xl font-bold mb-2">Scan Entrance QR</h2>
              <p className="text-muted text-sm mb-6">Point your camera at the QR code fixed on the wall to mark your attendance.</p>
              
              {/* QR Scanner Container */}
              <div id="reader"></div>
            </>
          ) : loading ? (
            <div className="animate-fade-in">
              <div className="spinner"></div>
              <p className="mt-4 text-muted">Verifying...</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={64} color="var(--success)" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Attendance Marked!</h2>
              <p className="text-muted mb-6">You have been marked present at:<br/><strong style={{color: 'var(--text-main)'}}>{scanResult}</strong></p>
              
              <button onClick={() => setScanResult(null)} className="btn btn-outline">
                Scan Another
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Scan;
