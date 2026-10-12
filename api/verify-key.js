const crypto = require('node:crypto');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const expected = process.env.ACCESS_KEY;
  if (!expected) {
    return res.status(503).json({
      ok: false,
      error: 'Access-key login is not configured. Add ACCESS_KEY in Vercel Project Settings → Environment Variables.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const provided = typeof body?.accessKey === 'string' ? body.accessKey : '';
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  const matches = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!matches) {
    return res.status(401).json({ ok: false, error: 'Invalid access key.' });
  }

  return res.status(200).json({ ok: true });
};
