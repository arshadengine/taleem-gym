import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useGym } from '../../context/GymContext';
import { CheckCircle2, XCircle, Loader2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
  const { markAttendance } = useGym();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('gym_user'));
  const scannerRef = useRef(null);

  const isProcessingRef = useRef(false);

  const requestPermission = async () => {
    try {
      // Force native prompt via direct interaction
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop it instantly so html5-qrcode can take over cleanly
      stream.getTracks().forEach(t => t.stop());
      
      setTimeout(() => {
        setError(null);
        setScanning(true);
      }, 300);
    } catch (err) {
      let errorMsg = err?.message || err;
      if (errorMsg.includes('NotAllowedError') || errorMsg.includes('Permission denied')) {
        setError('CAMERA ACCESS DENIED');
      } else {
        setError(`Camera Error: ${errorMsg}`);
      }
    }
  };

  useEffect(() => {
    if (!scanning) return;
    isProcessingRef.current = false; // Reset lock when scan starts

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isSecure = window.location.protocol === 'https:';

    if (!isSecure && !isLocal) {
      setError('SECURE CONNECTION REQUIRED: Please use an HTTPS link to access the camera.');
      setScanning(false);
      return;
    }

    const html5QrCode = new Html5Qrcode('reader');
    scannerRef.current = html5QrCode;

    const onScanSuccess = (decodedText) => {
      if (isProcessingRef.current) return;
      if (decodedText === 'TALEEM_GYM' || decodedText.includes('taleem')) {
        isProcessingRef.current = true; // Lock immediately to prevent multiple scans
        if (html5QrCode.isScanning) {
          html5QrCode.stop().then(() => {
             markAttendance(user).then(response => {
              setResult({
                success: response.success,
                message: response.message
              });
              setScanning(false);
            });
          }).catch(console.error);
        }
      } else {
        setError('Invalid QR Code. Please scan the official Gym QR.');
      }
    };

    html5QrCode.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      onScanSuccess,
      () => {} // ignore empty frames
    ).catch((err) => {
      let errorMsg = err?.message || err;
      if (errorMsg.includes('NotReadableError') || errorMsg.includes('Could not start video')) {
        setError('CAMERA IN USE: Another app is using your camera, or it is locked.');
      } else if (errorMsg.includes('NotAllowedError') || errorMsg.includes('Permission denied')) {
        setError('CAMERA ACCESS DENIED');
      } else {
        setError(`Camera Error: ${errorMsg}`);
      }
      setScanning(false);
    });

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, [scanning, markAttendance, user]);


  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '0.05em', fontWeight: '900' }}>ATTENDANCE</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em' }}>SCAN ENTRANCE QR CODE</p>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1.5rem' }}>
        {scanning ? (
          <>
            <div id="reader" style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid #333', minHeight: '250px' }}></div>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--text-dim)' }}>
              <div className="pulse-dot"></div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em' }}>READY TO SCAN...</span>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '2rem', width: '100%', fontSize: '0.7rem' }} onClick={() => setScanning(false)}>STOP SCANNING</button>
          </>
        ) : (
          <div className="animate-scale-in" style={{ padding: '1rem' }}>
            {result ? (
              <div style={{ padding: '1rem' }}>
                <div style={{ width: '100px', height: '100px', background: result.success ? '#fff' : 'rgba(255, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: result.success ? 'none' : '1px solid #ff4444', boxShadow: result.success ? '0 0 40px rgba(255,255,255,0.1)' : 'none' }}>
                  {result.success ? <CheckCircle2 size={50} color="black" /> : <XCircle size={50} color="#ff4444" />}
                </div>
                <h2 style={{ color: result.success ? '#fff' : '#ff4444', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: '900', fontSize: '1.75rem' }}>
                  {result.success ? 'SUCCESS' : 'NOTICE'}
                </h2>
                <p style={{ marginBottom: '3rem', color: 'var(--text-dim)', fontWeight: '600' }}>{result.message}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '1.25rem' }} onClick={() => setResult(null)}>SCAN AGAIN</button>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '1.25rem' }} onClick={() => navigate('/member')}>DASHBOARD</button>
                </div>
              </div>
            ) : (
              <div style={{ padding: '1rem' }}>
                <div style={{ width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', border: '1px solid #333' }}>
                  <Camera size={50} color="#fff" />
                </div>
                <h2 style={{ letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: '900', fontSize: '1.75rem' }}>CAMERA ACCESS</h2>
                
                {error?.includes('DENIED') || error?.includes('Permission denied') ? (
                  <div style={{ textAlign: 'left', background: 'rgba(255, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255, 68, 68, 0.2)', marginBottom: '2rem' }}>
                    <div style={{ color: '#ff4444', fontWeight: '800', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>HOW TO UNBLOCK:</div>
                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: '0.75rem', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: '600' }}>
                      <li>1. Tap the <strong>Lock Icon</strong> 🔒 in the address bar.</li>
                      <li>2. Tap <strong>Permissions</strong> or <strong>Site Settings</strong>.</li>
                      <li>3. Set <strong>Camera</strong> to <strong>"Allow"</strong>.</li>
                      <li>4. Refresh this page.</li>
                    </ul>
                  </div>
                ) : (
                  <p style={{ marginBottom: '3rem', color: 'var(--text-dim)', fontWeight: '600', lineHeight: '1.6' }}>
                    {error || 'Grant camera permission to scan the gym entrance QR code.'}
                  </p>
                )}
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '1.25rem' }} onClick={() => navigate('/member')}>BACK</button>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '1.25rem' }} onClick={requestPermission}>ACTIVATE CAMERA</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#050505', borderRadius: '1.5rem', border: '1px solid #111' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          <Camera size={24} color="#fff" />
          <div>
            <div style={{ fontWeight: '800', marginBottom: '0.5rem', fontSize: '0.9rem' }}>CAMERA ACCESS TIPS</div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: '600' }}>
              <li>• Ensure you have granted camera permissions in your browser.</li>
              <li>• Access the site via <strong>HTTPS</strong> for camera activation.</li>
              <li>• If blocked, reset site permissions in your browser settings.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
