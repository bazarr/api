const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/api/test', (req, res) => {
  res.send('test passed');
});

app.listen(PORT, () => {
  console.log('Node app is running on port', PORT);
});
