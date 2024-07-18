const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const validUrl = require('valid-url');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const imageUrl = $('meta[property="og:image"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const description = $('meta[property="og:description"]').attr('content');

    if (!imageUrl) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ imageUrl, title, description, postUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching the post' });
  }
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
