'use strict';

const os = require('node:os');
const net = require('node:net');
const http = require('node:http');
const cluster = require('node:cluster');
const cpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master pid: ${process.pid}`);
  console.log(`Starting ${cpus} forks`);

  const workers = [];

  for (let i = 0; i < cpus; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }

  const ipToInt = (ip) => {
    console.log(ip);
    return ip.split('.').reduce((res, item) => res * 256 + parseInt(item), 0);
  };

  const balancer = (socket) => {
    const ip = ipToInt(socket.remoteAddress);
    const id = ip % cpus;
    const worker = workers[id];
    if (worker) worker.send({ name: 'socket' }, socket);
  };

  const server = new net.Server({ pauseOnConnect: true }, balancer);
  server.listen(3000);
} else {
  console.log(`Worker pid: ${process.pid}`);

  const dispatcher = (req, res) => {
    console.log(req.url);
    res.setHeader('Process-Id', process.pid);
    res.end(`Worker ${process.pid}`);
  };

  const server = http.createServer(dispatcher);
  server.listen(null);

  process.on('message', (message, socket) => {
    if (message.name === 'socket') {
      socket.server = server;
      server.emit('connection', socket);
      socket.resume();
    }
  });
}