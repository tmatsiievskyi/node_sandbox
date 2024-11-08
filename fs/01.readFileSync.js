'use strict';

const fs = require('fs');
const buffer = fs.readFileSync('readFileSync.js', 'utf-8');
const src = buffer.toString();

console.log('Buffer length ' + buffer.length);
console.log(buffer);
console.log(src);

const lines = src.split('\n').filter((line) => !!line);
console.dir(lines);
