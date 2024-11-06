const buffer1 = Buffer.from('Some');
const buffer2 = Buffer.from('String');
const buffer3 = Buffer.from('String');

console.dir({
  equals1: buffer1.equals(buffer1),
  equals2: buffer1.equals(buffer2),
  equals3: buffer2.equals(buffer3),
});

const bufs = [buffer1, buffer2];

bufs.sort(Buffer.compare).map((b) => b.toString());

const strs = bufs.map((b) => b.toString());

console.dir({ buffer1, buffer2, sorted: bufs, strs });
