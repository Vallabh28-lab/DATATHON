import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, Image as ImageIcon, Search, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { extractKeyword } from '../services/api';

const TextToVisualsDashboard = () => {
  const [inputText, setInputText] = useState(`Web accessibility encompasses all disabilities that affect access to the Web, including auditory, cognitive, neurological, physical, speech, and visual disabilities. Screen readers convert digital text into synthesized speech or Braille output for visually impaired students.`);
  const [keywords, setKeywords] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [gridRef, setGridRef] = useState(null);
  const textareaRef = useRef(null);
  const gridItemsRef = useRef([]);

  // Generate visual anchors from text
  const generateVisuals = useCallback(async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setKeywords([]);
    setImages({});
    setSelectedIndex(-1);
    
    try {
      // Split text into sentences/keywords and batch extract
      const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const batchPromises = sentences.slice(0, 12).map(async (sentence) => { // Limit to 12 for performance
        try {
          const response = await extractKeyword(sentence.trim());
          return response.data?.keyword || '';
        } catch {
          return sentence.split(' ').slice(0, 3).join(' '); // Fallback keyword
        }
      });
      
      const extractedKeywords = (await Promise.all(batchPromises)).filter(kw => kw.trim());
      setKeywords(extractedKeywords.slice(0, 12).map(kw => kw.trim()));
      
      // Generate image URLs (loremflickr fallback)
      const newImages = {};
      extractedKeywords.forEach(kw => {
        newImages[kw] = `https://loremflickr.com/400/300/${encodeURIComponent(kw)}?random=${Math.random()}`;
      });
      setImages(newImages);
      
    } catch (error) {
      console.error('Failed to generate visuals:', error);
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  // Highlight keyword in textarea
  const highlightKeyword = useCallback((keyword) => {
    if (!textareaRef.current) return;
    
    // Simple highlight by adding class via contentEditable or range (simplified)
    setInputText(prev => prev.replace(
      new RegExp(`\\b${keyword}\\b`, 'gi'), 
      match => `<mark class="bg-yellow-400 text-black px-1 rounded font-bold">${match}</mark>`
    ));
  }, []);

  // Haptic feedback
  const triggerHaptic = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  // Image click handler
  const handleImageClick = useCallback((index, keyword) => {
    setSelectedIndex(index);
    highlightKeyword(keyword);
    triggerHaptic();
  }, [highlightKeyword, triggerHaptic]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keywords.length === 0) return;
      
      let newIndex = selectedIndex;
      switch(e.key) {
        case 'ArrowRight': newIndex = Math.min(selectedIndex + 1, keywords.length - 1); break;
        case 'ArrowLeft': newIndex = Math.max(selectedIndex - 1, 0); break;
        case 'ArrowDown': newIndex = Math.min(selectedIndex + 3, keywords.length - 1); break;
        case 'ArrowUp': newIndex = Math.max(selectedIndex - 3, 0); break;
        case 'Enter':
        case ' ': 
          if (selectedIndex >= 0) {
            gridItemsRef.current[selectedIndex]?.focus();
            triggerHaptic();
          }
          e.preventDefault();
          break;
      }
      
      if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
        gridItemsRef.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, keywords.length, triggerHaptic]);

  useEffect(() => {
    if (selectedIndex >= 0 && keywords[selectedIndex]) {
      highlightKeyword(keywords[selectedIndex]);
    }
  }, [selectedIndex, keywords, highlightKeyword]);

  const VisualCard = ({ keyword, index, imageUrl, isSelected }) => (
    <div
      ref={el => { gridItemsRef.current[index] = el; }}
      role="gridcell"
      tabIndex={0}
      aria-label={`Visual anchor for "${keyword}". ${isSelected ? 'Selected' : 'Click to select'}`}
      aria-selected={isSelected}
      onClick={() => handleImageClick(index, keyword)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleImageClick(index, keyword);
        }
      }}
      className={`
        group relative aspect-video rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer
        transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400/50
        ${isSelected 
          ? 'ring-4 ring-cyan-400/70 shadow-2xl shadow-cyan-500/60 scale-105 bg-white/20' 
          : 'hover:shadow-2xl hover:shadow-cyan-500/40 hover:bg-white/10'
        }
        bg-white/5 backdrop-blur-xl border border-cyan-400/30 shadow-xl shadow-cyan-500/25
      `}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Visual representation of ${keyword}`}
          className="w-full h-full object-cover rounded-2xl group-hover:brightness-110 transition-all duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 flex flex-col items-center justify-center animate-pulse">
          <ImageIcon className="w-16 h-16 text-cyan-400/60 mb-2" />
          <span className="text-sm font-bold text-white/70 uppercase tracking-wider">Loading {keyword}...</span>
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/70 to-transparent rounded-xl p-3">
        <span className="text-xs font-black text-cyan-200 uppercase tracking-widest truncate">
          {keyword}
        </span>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-cyan-500/20 animate-ping rounded-3xl" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto flex flex-col gap-8 text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🎯 Visual Anchor Engine
          </h1>
          <p className="text-xl text-cyan-100/80 font-medium max-w-xl leading-relaxed">
            Extract semantic keywords and generate immersive visual anchors. Click to highlight connections.
          </p>
        </div>
        <button
          onClick={generateVisuals}
          disabled={loading || !inputText.trim()}
          className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-cyan-400/50 
                     hover:bg-white/20 hover:border-cyan-400/80 hover:shadow-2xl hover:shadow-cyan-500/40
                     disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black text-lg uppercase 
                     tracking-widest transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
          aria-label="Generate visual anchors from text"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Generate Anchors
            </>
          )}
        </button>
      </div>

      {/* Input Text */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 p-8">
        <label className="block text-sm font-black text-cyan-200 uppercase tracking-wider mb-4">
          📝 Study Text (paste notes here)
        </label>
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your study notes, lecture transcripts, or reading material..."
          rows={6}
          className="w-full p-6 bg-white/10 backdrop-blur-xl border border-cyan-400/40 rounded-2xl 
                     text-lg font-medium text-white placeholder:text-cyan-300/70 
                     focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400/70
                     resize-vertical transition-all shadow-inner shadow-cyan-500/10"
          aria-label="Input text for visual anchor generation"
        />
      </div>

      {/* Instructions */}
      {!keywords.length && !loading && (
        <div className="text-center py-16 text-cyan-100/60">
          <ImageIcon className="w-24 h-24 mx-auto mb-6 opacity-40" />
          <h3 className="text-2xl font-black mb-2">Ready to Generate</h3>
          <p className="max-w-md mx-auto text-lg opacity-80">
            Enter text above and click "Generate Anchors" to extract keywords and create visual representations.
          </p>
        </div>
      )}

      {/* Visual Grid */}
      {keywords.length > 0 && (
        <div role="grid" aria-label="Visual anchors grid" className="space-y-6">
          <div className="flex items-center gap-4 text-sm font-black text-cyan-200 uppercase tracking-wider">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Found {keywords.length} visual anchors • 
            Use ←→↑↓ arrows or Tab to navigate • Enter/Space to select
          </div>
          
          <div 
            ref={setGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
            style={{ '--rows': Math.ceil(keywords.length / 4) }}
          >
            {keywords.map((keyword, index) => (
              <VisualCard
                key={`${keyword}-${index}`}
                keyword={keyword}
                index={index}
                imageUrl={images[keyword]}
                isSelected={selectedIndex === index}
              />
            ))}
            
            {/* Loading Skeletons if partial */}
            {loading && Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={`skeleton-${i}`}
                className="aspect-video rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 
                           animate-pulse shadow-xl border border-cyan-400/30"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-6 text-sm text-cyan-100/70 pt-8 border-t border-cyan-400/20">
          <span>✅ {Object.keys(images).length} visuals generated</span>
          <span>🎯 {keywords.length} keywords extracted</span>
          <span>⌨️ Keyboard navigation enabled</span>
          <span className="ml-auto flex items-center gap-2">
            Regenerate <ArrowLeft className="w-4 h-4 rotate-180" />
          </span>
        </div>
      )}
    </div>
  );
};

export default TextToVisualsDashboard;

