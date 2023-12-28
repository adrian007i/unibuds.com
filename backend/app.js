const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json())
 
// database connection
const dbURI = "mongodb+srv://root:password@cluster0.l1cwdbp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.send('Hello, World!')); 
app.use(authRoutes);