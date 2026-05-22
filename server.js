const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from src/
app.use(express.static(path.join(__dirname, 'src')));

// Proxy endpoint: GET /proxy?url=<encoded-rss-url>
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  // Validate URL protocol
  let parsed;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return res.status(400).json({ error: 'Only http/https URLs are allowed' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(parsed.href, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SciNewsFeedReader/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Upstream returned ${response.status}`,
      });
    }

    const body = await response.text();
    res.set('Content-Type', response.headers.get('content-type') || 'text/xml');
    res.send(body);
  } catch (err) {
    const status = err.name === 'AbortError' ? 504 : 502;
    res.status(status).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log('Open any of these in your browser:');
  console.log(`  http://localhost:${PORT}/`);
  console.log(`  http://localhost:${PORT}/ai.html`);
  console.log(`  http://localhost:${PORT}/frontend.html`);
});
