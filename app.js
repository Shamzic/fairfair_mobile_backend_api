const express = require('express');
const app = express();
const mongoose = require('mongoose')

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
mongoose.connect('mongodb://admin:tototo1@ds235833.mlab.com:35833/rest',  { useNewUrlParser: true, useUnifiedTopology: true },  () => {
  console.log("connected to DB !")
})


// listening the server
app.listen(3000);
