'use strict';

const buffer = Buffer.from('Some String');

if (buffer.includes('Some')) {
  console.log(`"${buffer}" includes "Some"`);
}

const k = buffer.indexOf('Some');
console.log(`Index of "Some" is ${k}`);

console.log(`Slice 3-5 "${buffer.slice(3, 6)}"`);
