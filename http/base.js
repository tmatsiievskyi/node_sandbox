const http = require('node:http');

const user = { name: 'Name' };

const routing = {
  '/': '<h1>Home</h1>',
  '/user': user,
  '/user/name': () => user.name,
  '/api/m1': (req, res, cb) => {
    console.log(req.url + ' ' + res.statusCode);
    cb({ status: res.statusCode });
  },
  '/api/m2': (req) => ({
    user,
    url: req.url,
    cookie: req.headers.cookie,
  }),
};

const types = {
  object: ([data], cb) => cb(JSON.stringify(data)),
  undefined: (args, cb) => cb('not found'),
  function: ([fn, req, res], cb) => {
    if (fn.length === 3) fn(req, res, cb);
    else cb(JSON.stringify(fn(req, res)));
  },
};

const serve = (data, req, res) => {
  const type = typeof data;
  if (type === 'string') return res.end(data);
  const serializer = types[type];
  serializer([data, req, res], (ser) => serve(ser, req, res));
};

http
  .createServer((req, res) => {
    const data = routing[req.url];
    serve(data, req, res);
  })
  .listen(3000);
