const express = require('express');
const app = express();

app.use(express.static("public/"));

app.listen(2085, () => {
  console.log('Server is running on port 2085');
});