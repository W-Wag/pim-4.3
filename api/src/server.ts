const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'http://localhost:3333'],
    },
  }),
);
app.use(express.json());
app.use(routes);
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor hospedado na porta ${port}`);
});
