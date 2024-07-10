// NPM DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const enableWs = require('express-ws')

// CUSTOM IMPORTS
const authRoutes = require('./routes/authRoutes');
// const authRoutes = require('./routes/authRoutes');

// CONFIGURE SECRETS USING DOTENV
require('dotenv').config();

// INITIALIZE EXPRESS SERVER WITH ws
const app = express();
enableWs(app);

app.use(express.json());
app.use(cookieParser());

// ALLOW FRONT ENDS TO ACCESS THE APP 
app.use(cors({ origin: ['http://127.0.0.1:5500', 'HTTPS://127.0.0.1:3000'] }));

// WEB SOCKET CLIENTS 
const clients = new Map();

// CONNECT TO MONGOOSE DATABASE
mongoose.connect(process.env.mongoURI)
  
  //SETUP WEB SOCKET CONNECTION AT /
  .then(result => {app.ws('/', function (ws, req) {
      // todo
    });
  })
  // START THE SERVER
  .then((result) => app.listen(4000)) 
  .catch((err) => console.log(err));

 



// ROUTES
app.get('/', (req, res) => res.send('Hello, World!'));
app.use(authRoutes);
// app.use(chatRoutes);



// app.ws("/:key", function (ws, req) {
//   const key = req.params.key;
//   clients[key] = clients[key] || [];

//   // Add the new client to the clients list
//   clients[key].push(ws);

//   // Remove the client from the clients list when it disconnects
//   ws.on("close", function () {
//     clients[key] = clients[key].filter((client) => client !== ws);

//     console.log("client disconnected");
//   });
// });
 
// app.post("/api/send/:key", function (req, res) {
//   console.log(123)
//   console.log(req.body);
//   const { message } = req.body;

//   const key = "a"

//   clients[key].forEach((client) => client.send(message));
//   res.json({ success: true });
// });
