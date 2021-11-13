const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
const connectDB = require('./db');

connectDB();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

const PORT = 3001;

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log(`Server listening on port http://localhost:${PORT}`);
});
