'use strict';

const fs = require('node:fs');

fs.readFile('01.readFileSync.js', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(`File size: ${data.length}`);
  const lines = data.split('\n').filter((line) => !!line);
  const content = lines.join('\n');
  fs.writeFile('01.readFileSync.txt', content, (err) => {
    if (err) throw err;
    console.log(`New file size: ${content.length}`);
  });
});

console.log('Read file async');
