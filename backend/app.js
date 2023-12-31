const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const keys = require("./secrets/keys")
const app = express();

app.use(express.json());
 
// database connection 
mongoose.connect(keys["mongoURI"], { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.send('Hello, World!')); 
app.use(authRoutes);