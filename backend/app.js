const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys.js")
const passport = require('passport');

const app = express();

app.use(express.json());

// app.use(passport.initialize());
// require('./server/config/passport.js')(passport);
 
// database connection 
mongoose.connect(keys["mongoURI"], { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// routes
app.get('/', (req, res) => res.send('Hello, World!')); 
app.use(authRoutes);