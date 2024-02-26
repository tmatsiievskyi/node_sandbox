'use strict';

const net = require('node:net');

const socket = new net.Socket();

const send = (message) => {
  console.log('Client >', message);
  socket.write(message);
};

socket.on('data', (data) => {
  console.log('Server >', data.toString(), data);
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

socket.on('connect', () => {
  send('Message 1');
  send('Message 2');
  send('Message 3');
});

socket.connect({
  port: 2000,
  host: '127.0.0.1',
});
