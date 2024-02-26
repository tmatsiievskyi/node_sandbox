'use strict';

const dns = require('node:dns');

dns.lookupService('ip', 'port', (err, host, service) => {
  if (err) throw err;
  console.log({ host, service });
});
