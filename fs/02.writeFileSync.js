'use strict';

const fs = require('node:fs');

const data = fs.readFileSync('01.readFileSync.js', 'utf8');
const lines = data.split('\n').filter((line) => !!line);
fs.writeFileSync('01.readFileSync.txt', lines.join('\n'));
