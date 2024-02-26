const http = require('node:http');
const cluster = require('node:cluster');
const os = require('node:os');

const port = 3000;

const user = { name: 'Name' };
const pid = process.pid;

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

if (cluster.isPrimary) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const id = cluster.worker.id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
  http
    .createServer((req, res) => {
      const data = routing[req.url];
      const type = typeof data;
      const serializer = types[type];
      res.setHeader('Process-Id', pid);
      res.end(serializer(data, req, res));
    })
    .listen(port);
}
