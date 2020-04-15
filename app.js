const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')
// body parser update
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// Middlewares


// ROUTES
app.get('/', (req, res)=> {
  res.send("We are on home");
});

app.get('/posts', (req, res)=> {
  res.send("We are on posts");
});


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true },  () => {
  console.log("connected to DB !")
})


// listening the server
app.listen(3000);
