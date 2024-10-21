const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost'; // Použi '0.0.0.0' pre nasadenie, 'localhost' pre lokálne

app.use(cors());

app.get('/words', (req, res) => {
  const words = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    text: `word ${i + 1}`
  }));
  res.json(words);
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
