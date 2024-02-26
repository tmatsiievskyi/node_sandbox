'use strict';

const net = require('node:net');

const connection = (socket) => {
  console.dir({
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remoteFamily: socket.remoteFamily,
    remotePort: socket.remotePort,
    bufferSize: socket.bufferSize,
  });

  socket.write('Connected');

  socket.on('data', (data) => {
    console.log('Event: Data', data);
    console.log('Data:', data.toString());
  });

  socket.on('drain', () => {
    console.log('Event: Socket is free');
  });

  socket.on('end', () => {
    console.log('Event: End');
    console.dir({
      bytesRead: socket.bytesRead,
      bytesWritten: socket.bytesWritten,
    });
  });

  socket.on('error', (err) => {
    console.log('Event: Error');
    console.log(err);
  });

  socket.on('timeout', () => {
    console.log('Event: Timeout');
  });
};

const server = net.createServer();

server.on('connection', connection);

server.listen(2000);
