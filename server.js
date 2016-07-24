const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Node app is running on port', PORT);
});
