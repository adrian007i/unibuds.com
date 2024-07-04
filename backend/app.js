const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require('./routes/chatRoutes')
const keys = require("./config/keys.js")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const enableWs = require('express-ws')


const app = express();
enableWs(app);

app.use(express.json());
app.use(cookieParser());

const allowed_origins = ["http://localhost:3000"];

// database connection 
mongoose.connect(keys["mongoURI"])
  .then(result => {
    app.ws('/echo', (ws, req) => {
      ws.on('message', msg => {
        ws.send(msg)
      })

      ws.on('close', () => {
        console.log('WebSocket was closed')
      })
    })
  })
  .then((result) => {
    app.listen(4000)
  })
  .catch((err) => console.log(err));

app.use(cors({
  origin: allowed_origins,
}));



// routes
app.get('/', (req, res) => res.send('Hello, World!'));
app.use(authRoutes);
app.use(chatRoutes);

