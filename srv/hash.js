'use strict';

import crypto from 'node:crypto';

const hash = (data, bytes = 16) =>
  new Promise((res, rej) => {
    const salt = crypto.randomBytes(16).toString('base64');
    crypto.scrypt(data, salt, 64, (err, result) => {
      if (err) rej(err);
      res(salt + ':' + result.toString('base64'));
    });
  });

export { hash };
