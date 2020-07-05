const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const api = require('./routes/api');
const mongoose = require('mongoose');
const mongoUri =
  'mongodb://admin:admin@best-food-shard-00-00-grk0c.mongodb.net:27017,best-food-shard-00-01-grk0c.mongodb.net:27017,best-food-shard-00-02-grk0c.mongodb.net:27017/task-planner?ssl=true&replicaSet=best-food-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(
  mongoUri,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('DB connection successful');
    }
  }
);

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(PORT, () => {
  console.log('Listening at PORT ' + PORT);
});
