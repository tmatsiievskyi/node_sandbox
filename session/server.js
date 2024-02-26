const http = require('node:http');

const Client = require('./client.js');
const Session = require('./session.js');

const routing = {
  '/': async (client) => '<h1>Home</h1>',
  '/start': async (client) => {
    return `Session token is: ${client.token}`;
  },
  '/destroy': async (client) => {
    const result = `Session destroyed ${client.token}`;
    return result;
  },
  '/api/m1': async (client) => {
    if (client.session) {
      client.session.set('method1', 'called');
      return { data: 'ok' };
    } else {
      return { data: 'access is denied' };
    }
  },
  '/api/m2': async (client) => ({
    url: client.req.url,
    headers: client.req.headers,
  }),
  '/api/m3': async (client) => {
    if (client.session) {
      return [...client.session.entries()]
        .map(([key, value]) => `<b>${key}</b>: ${value}<br>`)
        .join();
    }
    return 'No session found';
  },
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
};

http
  .createServer((req, res) => {
    const client = new Client(req, res);
    const { method, url, headers } = req;
    console.log(`${method} ${url}, ${headers.cookies}`);
    const handler = routing[url];
    res.on('finish', () => {
      if (client.session) client.session.save();
    });
    if (!handler) {
      res.statusCode = 404;
      res.end('Not found 404');
      return;
    }
    handler(client).then(
      (data) => {
        const type = typeof data;
        const serializer = types[type];
        const result = serializer(data);
        client.sendCookie();
        res.end(result);
      },
      (err) => {
        res.statusCode = 500;
        res.end('Internal Server Error 500');
        console.log(err);
      }
    );
  })
  .listen(3000);
