'use strict';

const http = require('node:http');

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

const crud = { get: 'read', post: 'create', put: 'update', delete: 'delete' };

const httpServer = (routing, port) =>
  http
    .createServer(async (req, res) => {
      const { url, method, socket } = req;
      const [name, id] = url.substring(1).split('/');

      const entity = routing[name];
      if (!entity) return res.end('Not Found');
      const handler = entity[crud[method.toLowerCase()]];
      if (!handler) return res.end('Not found');

      const src = handler.toString();
      const signature = src.substring(0, src.indexOf(')'));
      console.dir({ method, url, handler, src, signature }, { depth: null });
      const args = [];
      if (signature.includes('(id')) args.push(id);
      if (signature.includes('{')) args.push(await receiveArgs(req));
      const result = await handler(...args);

      res.end(JSON.stringify(result.rows));
    })
    .listen(port, () => console.log(`HTTP on port ${port}`));

module.exports = httpServer;
