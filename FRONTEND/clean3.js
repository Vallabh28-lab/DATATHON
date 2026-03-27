const fs = require('fs');
console.log('Starting exact line slice purge');
const file = 'src/index.css';
let lines = fs.readFileSync(file, 'utf8').split('\n');
console.log('Initial lines: ' + lines.length);

// Remove Web Audio canvas block (lines 545-569) -> array index 544
lines.splice(544, 25);

// Remove TTS block (lines 278-468) -> array index 277
lines.splice(277, 191);

console.log('Final lines: ' + lines.length);
fs.writeFileSync(file, lines.join('\n'));
console.log('Wrote file');
