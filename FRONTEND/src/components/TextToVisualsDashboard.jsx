import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Download, Maximize2 } from 'lucide-react';

const SAMPLE_VISUALS = [
  {
    id: 1,
    label: "Water Cycle Overview",
    description: "A diagram depicting the Earth's water cycle, including evaporation, condensation, and precipitation.",
    imageUrl: "https://placehold.co/800x600/e2e8f0/475569?text=Water+Cycle+Diagram"
  },
  {
    id: 2,
    label: "Structure of a Plant Cell",
    description: "Detailed 3D diagram of a biological cell showing the nucleus, rigid cell wall, and central vacuole.",
    imageUrl: "https://placehold.co/800x600/e2e8f0/475569?text=Plant+Cell+Structure"
  }
];

export default function TextToVisualsDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-32 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 pt-16 pb-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner">
              <ImageIcon size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                Text to Visuals
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                Generate diagrams and visual aids from lesson text
              </p>
            </div>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            <Sparkles size={20} className={isGenerating ? "animate-spin" : ""} />
            {isGenerating ? "Processing..." : "Generate New Visual"}
          </button>
        </div>
      </header>

      {/* Main Grid Floor */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SAMPLE_VISUALS.map((visual) => (
            <div 
              key={visual.id}
              className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden isolate">
                <img 
                  src={visual.imageUrl} 
                  alt={visual.description}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-10">
                  <button 
                    className="bg-white/95 text-slate-900 p-4 rounded-full hover:bg-white hover:scale-110 transition-all shadow-xl"
                    aria-label="Expand image"
                  >
                    <Maximize2 size={24} />
                  </button>
                  <button 
                    className="bg-indigo-600/95 text-white p-4 rounded-full hover:bg-indigo-500 hover:scale-110 transition-all shadow-xl"
                    aria-label="Download image"
                  >
                    <Download size={24} />
                  </button>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {visual.label}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {visual.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
