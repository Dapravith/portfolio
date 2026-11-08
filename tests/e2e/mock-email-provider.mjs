// Stand-in for the Resend API during end-to-end tests.
// POST /emails → 200 {id}; a message containing "PROVIDER_FAIL" → 500.
// GET /last → the last accepted payload, so tests can assert what was sent.
import { createServer } from 'node:http';

const port = Number(process.env.MOCK_EMAIL_PORT ?? 3399);
let last = null;

createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') return res.end('ok');
  if (req.method === 'GET' && req.url === '/last') {
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify(last));
  }
  if (req.method === 'POST' && req.url === '/emails') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const payload = JSON.parse(body || '{}');
      res.setHeader('content-type', 'application/json');
      if (String(payload.text ?? '').includes('PROVIDER_FAIL')) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ message: 'simulated failure' }));
      }
      last = { ...payload, authorization: req.headers.authorization };
      res.end(JSON.stringify({ id: `mock_${Date.now()}` }));
    });
    return;
  }
  res.statusCode = 404;
  res.end();
}).listen(port, '127.0.0.1', () => console.log(`mock email provider on ${port}`));
