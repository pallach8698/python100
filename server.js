// Простой статический сервер без зависимостей.
// Поддерживает: node server.js --port 7100 --host 127.0.0.1
const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function argValue(names, fallback) {
  for (let i = 0; i < args.length; i++) {
    const eq = args[i].indexOf('=');
    const key = eq === -1 ? args[i] : args[i].slice(0, eq);
    if (['--port', '-p', '--host', '-h'].includes(key)) {
      const val = eq === -1 ? args[i + 1] : args[i].slice(eq + 1);
      if (names.includes(key) && val) return val;
    }
  }
  return fallback;
}
const port = Number(argValue(['--port', '-p'], process.env.PORT || 7100));
const host = argForHost();
function argForHost() {
  for (let i = 0; i < args.length; i++) {
    const eq = args[i].indexOf('=');
    const key = eq === -1 ? args[i] : args[i].slice(0, eq);
    if (key === '--host') return eq === -1 ? args[i + 1] : args[i].slice(eq + 1);
  }
  return '127.0.0.1';
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8',
};

const root = __dirname;
http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const file = path.normalize(path.join(root, urlPath));
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('404 Not Found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, host, () => {
  console.log(`Сервер запущен: http://${host}:${port}/`);
});
