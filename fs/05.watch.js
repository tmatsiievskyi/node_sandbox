const fs = require('fs');

fs.watch('./05.watch.js', (event, file) => {
  console.dir({ event, file });
});
