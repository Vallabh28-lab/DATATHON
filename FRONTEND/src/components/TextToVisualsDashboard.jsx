import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

const SAMPLE_ANCHORS = [
  {
    id: 1,
    label: "Water Cycle Overview",
    generatedAltText: "A heavily saturated visual diagram depicting the Earth's water cycle. Bright blue arrows point directly upward from a vast, dark blue ocean to visually represent evaporation. Fluffy white clouds gather prominently at the top sky area, representing condensation. Thick grey rain droplets fall aggressively over a large green mountain range to represent precipitation.",
    imageUrl: "https://placehold.co/800x600/0f172a/00ffff?text=Water+Cycle+Diagram"
  },
  {
    id: 2,
    label: "Cell Structure",
    generatedAltText: "Detailed 3D diagram of a biological cell showing the nucleus and mitochondria. A rigid, rectangular dark green cell wall heavily outlines the entire shape. Directly inside is a massive pale blue central vacuole taking up most of the space. To the bottom left side sits a distinct purple circular nucleus.",
    imageUrl: "https://placehold.co/800x600/0f172a/00ffff?text=Plant+Cell+Structure"
  }
];

// --- STEP 6 LOGIC: EARCON FEEDBACK ENGINE ---
let globalAudioCtx = null;
let lastFocusTime = 0;

const initAudio = () => {
  if (!globalAudioCtx) {
    globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume();
  }
};

const playFocusClick = () => {
  const now = Date.now();
  if (now - lastFocusTime < 100) return; // Debounce rapid focus shifts
  lastFocusTime = now;

  // STEP 7 LOGIC: Tactile Pulse Verification
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  try {
    initAudio();
    const osc = globalAudioCtx.createOscillator();
    const gain = globalAudioCtx.createGain();
    
    // Subtle Click sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, globalAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, globalAudioCtx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, globalAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, globalAudioCtx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(globalAudioCtx.destination);
    
    osc.start();
    osc.stop(globalAudioCtx.currentTime + 0.1);
  } catch (err) {
    // Graceful fail out for restrictive autoplay browsers
  }
};

const playSuccessChime = () => {
  if (navigator.vibrate) navigator.vibrate([50, 50, 50]); // Success vibration
  try {
    initAudio();
    // Arpeggiator sequence for "Success"
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = globalAudioCtx.createOscillator();
      const gain = globalAudioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = globalAudioCtx.currentTime + (i * 0.1);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      
      osc.connect(gain);
      gain.connect(globalAudioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch (err) {}
};


export default function TextToVisualsDashboard({ focusMode, theme }) {
  const [focusedVisualId, setFocusedVisualId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // STEP 7 LOGIC: Global "Search & Describe" Hooks
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not interrupt valid text-inputs if any are ever added to the page
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      
      if (e.code === 'KeyD' || e.key === 'd') {
        if (focusedVisualId) {
          const activeVisual = SAMPLE_ANCHORS.find(v => v.id === focusedVisualId);
          if (activeVisual && window.speechSynthesis) {
            window.speechSynthesis.cancel(); // Halt whatever was currently being narrated
            const utterance = new SpeechSynthesisUtterance(activeVisual.generatedAltText);
            
            // Apply tactile pulse mirroring speech initialization
            if (navigator.vibrate) navigator.vibrate(50);
            
            window.speechSynthesis.speak(utterance);
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedVisualId]);


  const handleSimulatedGeneration = () => {
    setIsGenerating(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setIsGenerating(false);
      playSuccessChime(); // Broadcast the acoustic success earcon payload
    }, 1500);
  };

  const renderImageWithMandatoryAlt = (visual) => {
    const fallbackAlt = `Generated visual for ${visual.label}`;
    const secureAltNode = visual.generatedAltText ? visual.generatedAltText.trim() : fallbackAlt;
    const finalAltString = secureAltNode === "" ? fallbackAlt : secureAltNode;

    return (
      <img 
        src={visual.imageUrl} 
        alt={finalAltString}
        aria-labelledby={`visual-label-${visual.id}`}
        className="w-full h-full object-cover filter contrast-125 saturate-150"
      />
    );
  };

  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFF00] p-8 md:p-16 max-w-5xl mx-auto font-sans selection:bg-[#FFFF00] selection:text-[#000000]">
      <header className="mb-16 border-b-8 border-[#FFFF00] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Visual Anchor List
          </h1>
          <p className="sr-only">
            You are currently in the Visual Anchor List. Use standard document scrolling or tab navigation to move between fully described visual items. Focus an item and press D to hear its description.
          </p>
        </div>

        {/* Action Button wired to Step 6 Chime Hook */}
        <button
          onClick={handleSimulatedGeneration}
          disabled={isGenerating}
          onFocus={playFocusClick}
          className="flex items-center justify-center gap-4 bg-[#000000] text-[#FFFF00] border-[8px] border-[#FFFF00] p-6 lg:p-8 rounded-[2.5rem] text-2xl md:text-3xl font-black uppercase tracking-wider focus:outline-none focus:ring-[12px] focus:ring-white hover:bg-[#FFFF00] hover:text-[#000000] transition-colors disabled:opacity-50"
        >
          <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
          {isGenerating ? 'Generating...' : 'Simulate Visuals'}
        </button>
      </header>

      <section aria-label="Generated Visuals" className="pb-32">
        <ol className="space-y-16 list-none m-0 p-0" role="list">
          {SAMPLE_ANCHORS.map((visual, index) => (
            <li 
              key={visual.id}
              tabIndex={0}
              onFocus={() => {
                setFocusedVisualId(visual.id);
                playFocusClick(); // Step 6 focus click sound & Step 7 vibrate
              }}
              className="flex flex-col gap-8 focus:outline-none focus:ring-[16px] focus:ring-white p-8 md:p-12 rounded-[3.5rem] transition-all border-[16px] border-[#FFFF00] bg-[#000000] hover:bg-[#111111] overflow-hidden break-words shadow-[0_15px_40px_-10px_rgba(255,255,0,0.15)] mb-12 block"
            >
              <h2 
                id={`visual-label-${visual.id}`}
                className="text-4xl md:text-5xl font-black bg-[#000000] text-[#FFFF00] border-b-[8px] border-[#FFFF00] pb-6 uppercase tracking-wide leading-snug break-words"
              >
                Output {index + 1}: {visual.label}
              </h2>

              <figure 
                className="w-full relative rounded-3xl overflow-hidden border-8 border-slate-800 bg-slate-950 aspect-video flex flex-col items-center justify-center"
              >
                {renderImageWithMandatoryAlt(visual)}
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay opacity-30">
                  <ImageIcon className="w-1/3 h-1/3 text-white" />
                </div>
              </figure>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
