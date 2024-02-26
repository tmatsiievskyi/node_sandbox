'use strict';

const dns = require('node:dns');

dns.resolve('some.domain', (err, data) => {
  if (err) {
    if (err.code === 'ECONNREFUSED') {
      console.log('No internet connection');
    } else {
      console.log('Web is dead');
    }
  }
  console.log({ data });
});

dns.resolveAny('github.com', (err, data) => {
  if (err) throw err;
  console.log({ data });
});
