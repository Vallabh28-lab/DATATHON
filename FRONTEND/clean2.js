const fs = require('fs');
const file = 'c:\\\\Users\\\\HP\\\\Desktop\\\\Project\\\\ACCESSIBLE PLATFORM\\\\FRONTEND\\\\src\\\\index.css';
let content = fs.readFileSync(file, 'utf8');

const ttsStart = '  /* ═══════════ Text-to-Speech Reader ═══════════ */';
const ttsEnd = '  /* ═══════════ End TTS Reader Styles ═══════════ */';

const i1 = content.indexOf(ttsStart);
const i2 = content.indexOf(ttsEnd);

if (i1 !== -1 && i2 !== -1) {
  content = content.slice(0, i1) + content.slice(i2 + ttsEnd.length);
}

const canvasStart = '  /* NEW: Web Audio Canvas Visualizer Styles */';
const i3 = content.indexOf(canvasStart);

if (i3 !== -1) {
  // We want to delete to the end, but keep the final closing brace.
  const i4 = content.lastIndexOf('}');
  if (i4 !== -1) {
     content = content.slice(0, i3) + '}\n';
  }
}

fs.writeFileSync(file, content);
console.log('CSS purge complete');
