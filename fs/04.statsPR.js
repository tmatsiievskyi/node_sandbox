'use strict';

const fs = require('node:fs').promises;

const fileNames = ['01.readFileSync.js', 'n-untitled.js', '03.async.js'];
const promises = fileNames.map((fileName) => fs.lstat(fileName));
Promise.allSettled(promises).then(console.dir);
