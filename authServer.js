const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoute = require('./routes/users');

// Middlewares
app.use(cors())
app.use(bodyParser.json())

app.use('/users', usersRoute) // post middleware
app.use(express.json())

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true, useUnifiedTopology: true },  () => {
  console.log("connected to DB !")
})


// listening the server
app.listen(4000);

