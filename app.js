const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoute = require('./routes/posts');
const artisansRoute = require('./routes/artisans');
const positionsRoute = require('./routes/positions');


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

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true },  () => {
  console.log("connected to DB !")
})

// listening the server
app.listen(3000);

