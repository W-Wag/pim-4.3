const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const app = express();

helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: ["'self'", 'http://localhost:3000'],
  },
});
app.use(cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(express.json());
app.use(routes);
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor hospedado na porta ${port}`);
});
