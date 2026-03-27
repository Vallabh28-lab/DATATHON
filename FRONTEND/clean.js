const fs = require('fs');
const file = 'c:\\\\Users\\\\HP\\\\Desktop\\\\Project\\\\ACCESSIBLE PLATFORM\\\\FRONTEND\\\\src\\\\index.css';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// 1-indexed lines 545 to 569 -> 0-indexed indices 544 to 568
lines.splice(544, 25);

// 1-indexed lines 278 to 468 -> 0-indexed indices 277 to 467
lines.splice(277, 191);

fs.writeFileSync(file, lines.join('\n'));
