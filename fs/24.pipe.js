const fs = require('fs');

const rs = fs.createReadStream('01.readFileSync.js', 'utf-8');
const ws = fs.createWriteStream('copy.js', 'utf-8');

rs.pipe(ws);

rs.on('end', () => {
  console.log('Done');
});
