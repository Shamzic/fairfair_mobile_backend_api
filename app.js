const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoute = require('./routes/posts');
require('dotenv/config');


// Middlewares
app.use(cors());
app.use('/posts', postsRoute); // post middleware
app.use(bodyParser.json());



// ROUTES
app.get('/', (req, res)=> {
  res.send("We are on home");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true },  () => {
  console.log("connected to DB !")
})

// listening the server
app.listen(3000);
