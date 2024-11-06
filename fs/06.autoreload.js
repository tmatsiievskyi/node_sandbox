const fs = require('node:fs');

const load = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(`Data length: ${data.length}`);
    console.log(data);
  });
};

const watch = (path) => {
  fs.watch(path, () => {
    load(path);
  });
};

const path = './01.readFileSync.js';
load(path);
watch(path);
