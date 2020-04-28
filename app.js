const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoute = require('./routes/posts');
const artisansRoute = require('./routes/artisans');
const positionsRoute = require('./routes/positions');
var MongoClient = require('mongodb').MongoClient;

require('dotenv/config')

// Middlewares
app.use(cors())
app.use(bodyParser.json())

app.use('/posts', postsRoute) // post middleware
app.use('/artisans', artisansRoute) // post middleware
app.use('/positions', positionsRoute) // post middleware
app.use(express.json())


// ROUTES
app.get('/', (req, res) => {
  res.send("We are on home");
});

// Connect to DB // process.env.DB_CONNECTION
mongoose.connect("mongodb://localhost:51511/test",  { useNewUrlParser: true, useUnifiedTopology: true } , function(err, result) {
  if (err) {
    throw err;
  }
  console.log("connected to DB !")
})

// listening the server
app.listen(3000);

