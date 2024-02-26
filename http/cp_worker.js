'use strict';

const http = require('node:http');

const BASE_PORT = 3000;

const pid = process.pid;
const id = parseInt(process.argv[2], 10);
const port = BASE_PORT + id;
const user = { name: 'Name' };

const routing = {
  '/': 'home',
  '/user': user,
  '/user/name': () => user.name,
};

const types = {
  object: (o) => JSON.stringify(o),
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
  function: (fn, par, client) => JSON.stringify(fn(client, par)),
};

console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
http
  .createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    res.setHeader('Process-Id', process.pid);
    res.end(serializer(data, req, res));
  })
  .listen(port);
