import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Holistic, Results } from '@mediapipe/holistic';
import { Camera as CameraUtils } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/holistic';

const SignLangTranslator = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holisticRef = useRef<Holistic | null>(null);
const cameraRef = useRef<CameraUtils | null>(null);
  const [isCamActive, setIsCamActive] = useState(false);
  const [predictedText, setPredictedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [showMesh, setShowMesh] = useState(true);
  const [handsDetected, setHandsDetected] = useState(false);

  // Mock translation map (replace with API)
  const mockPredict = (landmarks: any): string => {
    if (!landmarks) return '';
    // Simple demo: if wrist y < 0.5, predict 'HELLO'
    const avgY = landmarks[0].y;
    return avgY < 0.5 ? 'HELLO WORLD' : 'SIGN DETECTED';
  };

  const onResults = useCallback((results: Results) => {
    const canvasCtx = canvasRef.current!.getContext('2d')!;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
canvasCtx.drawImage((results.image as any).video || results.image as HTMLVideoElement, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

    if (results.leftHandLandmarks && showMesh) {
      drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, 
        {color: '#00ffff', lineWidth: showMesh ? 3 : 1});
      drawLandmarks(canvasCtx, results.leftHandLandmarks, 
        {color: '#00ffff', lineWidth: 2, radius: showMesh ? 4 : 2});
      setHandsDetected(true);
    }
    if (results.rightHandLandmarks && showMesh) {
      drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, 
        {color: '#00ffff', lineWidth: showMesh ? 3 : 1});
      drawLandmarks(canvasCtx, results.rightHandLandmarks, 
        {color: '#00ffff', lineWidth: 2, radius: showMesh ? 4 : 2});
      setHandsDetected(true);
    }

    // Predict
    const landmarks = results.leftHandLandmarks || results.rightHandLandmarks;
    if (landmarks) {
      const text = mockPredict(landmarks);
      const conf = Math.random() * 0.3 + 0.7; // 0.7-1.0
      if (text !== predictedText) {
        setPredictedText(text);
        setConfidence(conf);
        if ('vibrate' in navigator) navigator.vibrate(50);
      }
    }

    canvasCtx.restore();
  }, [predictedText, showMesh]);

  useEffect(() => {
    if (!holisticRef.current) {
      holisticRef.current = new Holistic({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });
      holisticRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        refineFaceLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      holisticRef.current.onResults(onResults);
    }
  }, [onResults]);

  const toggleCamera = async () => {
    if (isCamActive) {
      if (cameraRef.current) cameraRef.current.stop();
      setIsCamActive(false);
      setHandsDetected(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      videoRef.current!.srcObject = stream;
      await new Promise(r => videoRef.current!.onloadedmetadata = r);

      canvasRef.current!.width = videoRef.current!.videoWidth;
      canvasRef.current!.height = videoRef.current!.videoHeight;

      cameraRef.current = new CameraUtils(videoRef.current as HTMLVideoElement, {
        onFrame: async () => {
await holisticRef.current!.send({image: videoRef.current!});
        },
        width: 640,
        height: 480
      });
      cameraRef.current.start();
      setIsCamActive(true);
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleCamera();
      } else if (e.code === 'KeyH') {
        setShowMesh(!showMesh);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showMesh]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-8 text-white">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
          Sign to Text
        </h1>
        <p className="text-xl opacity-90 max-w-md mx-auto">
          Real-time Indian Sign Language recognition with MediaPipe Holistic
        </p>
        <div className="flex items-center gap-4 text-sm opacity-80">
          <span>Press SPACE to toggle camera | H for high-contrast mesh</span>
          <span className={handsDetected ? 'text-green-400 animate-pulse' : 'text-gray-500'}>
            {handsDetected ? '👋 Hands Detected' : 'No hands'}
          </span>
        </div>
      </div>

      {/* Glassmorphism Camera Viewport */}
      <div className="relative group">
        <div className="w-96 h-72 md:w-[500px] md:h-[400px] glass-card cyan-glow rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-500/50">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
        {!isCamActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl">
            <Camera className="w-24 h-24 text-cyan-400 opacity-50 animate-pulse" />
          </div>
        )}
      </div>

      {/* Controls Toggle */}
      <div className="flex items-center gap-6 p-6 glass-card rounded-2xl backdrop-blur-xl">
        <button
          onClick={toggleCamera}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
        >
          {isCamActive ? '⏹️ Stop Camera' : '📹 Start Camera'}
        </button>
        <button
          onClick={() => setShowMesh(!showMesh)}
          className="px-6 py-4 border-2 border-cyan-400 text-cyan-400 font-black rounded-xl hover:bg-cyan-500/10 backdrop-blur-sm transition-all"
        >
          {showMesh ? '🔒 Simple View' : '✨ High-Contrast Mesh'}
        </button>
      </div>

      {/* Confidence Gauge */}
      <div className="flex items-center gap-8 p-6 glass-card rounded-2xl max-w-md mx-auto">
        <div className="relative">
          <svg width="80" height="80" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
            <circle 
              cx="20" cy="20" r="16" 
              stroke="url(#gradient)" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeDasharray="100 100"
              strokeDashoffset={100 - (confidence * 100)}
              transform="rotate(-90 20 20)"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#00b0ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-cyan-400">
            {Math.round(confidence * 100)}%
          </div>
        </div>
        <div>
          <p className="text-sm opacity-75 uppercase tracking-wider font-bold">Confidence Score</p>
          <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {confidence > 0.8 ? 'Excellent' : confidence > 0.6 ? 'Good' : 'Fair'}
          </p>
        </div>
      </div>

      {/* Dynamic Translation Ribbon */}
      <AnimatePresence mode="wait">
        {predictedText && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            className="px-12 py-6 glass-card rounded-3xl backdrop-blur-2xl text-center shadow-2xl cyan-glow max-w-2xl mx-auto border-cyan-500/50"
          >
            <p className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent drop-shadow-xl">
              {predictedText}
            </p>
            <p className="text-sm opacity-75 mt-2 uppercase tracking-widest font-mono">Live Translation</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Instructions */}
      <div className="glass-card p-6 rounded-2xl text-sm max-w-md mx-auto text-center opacity-80">
        <p className="font-mono uppercase tracking-wider mb-2 font-bold">Keyboard Controls</p>
        <div className="flex justify-center gap-6 text-xs">
          <span>SPACE: Toggle Camera</span>
          <span>H: Mesh Toggle</span>
          <span>ESC: Stop All</span>
        </div>
      </div>
    </div>
  );
};

export default SignLangTranslator;

