const express = require('express');
const { setupRoutes } = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

setupRoutes(app);

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use((req, res) => {
  const msg = `Page not found: ${req.url}`;
  console.warn(msg);
  res.status(404).send(msg);
});

app.listen(5050, () => {
  console.log('API available on http://localhost:5050');
});
