import http from 'node:http';

const urls = ['http://127.0.0.1:5173/', 'http://localhost:5173/', 'http://[::1]:5173/'];

function fetchUrl(u) {
  return new Promise((resolve) => {
    const req = http.get(u, { headers: { Accept: 'text/html' } }, (res) => {
      const out = { url: u, status: res.statusCode, headers: res.headers, body: '' };
      res.on('data', (c) => (out.body += c));
      res.on('end', () => resolve(out));
    });
    req.on('error', (e) => resolve({ url: u, error: e.message }));
  });
}

(async () => {
  for (const u of urls) {
    const r = await fetchUrl(u);
    console.error('---', r.url, '---');
    if (r.error) {
      console.error('ERR', r.error);
    } else {
      console.error('STATUS', r.status);
      console.error('HEADERS', JSON.stringify(r.headers));
      console.log('BODY_START');
      console.log(r.body.slice(0, 4000));
      console.log('BODY_END');
    }
  }
})();
