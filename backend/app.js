const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys.js")
const cookieParser  = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
 
const allowed_origins = ["http://localhost:3000"];

// database connection 
mongoose.connect(keys["mongoURI"], { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

  app.use(cors({
    origin: allowed_origins,
  }));

// routes
app.get('/', (req, res) => res.send('Hello, World!')); 
app.use(authRoutes);