'use strict';

const path = require('node:path');
const fsp = require('node:fs').promises;
const httpServer = require('./core/http.js');
const staticServer = require('./core/static.js');
const wsServer = require('./core/ws.js');

const HTTP_PORT = 8000;
const STATIC_PORT = 8001;
const WS_PORT = 8002;

const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = require(filePath);
  }
  httpServer(routing, HTTP_PORT);
  wsServer(routing, WS_PORT);
  staticServer('./static', STATIC_PORT);
})();
