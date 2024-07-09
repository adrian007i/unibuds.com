const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
// const chatRoutes = require('./routes/chatRoutes');
const keys = require("./config/keys.js")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const enableWs = require('express-ws')


const app = express();
enableWs(app);

app.use(express.json());
app.use(cookieParser());

// app.use(function (req, res, next) {
//   console.log('middleware');
//   req.testing = 'testing';
//   return next();
// });

// app.get('/', function(req, res, next){
//   console.log('get route', req.testing);
//   res.end();
// })


const allowed_origins = [ "http://127.0.0.1:5500"];

// database connection 
// mongoose.connect(keys["mongoURI"])
//   .then(result => {

//     app.ws('/', function (ws, req) {
//       // ws.on('message', function(msg) {
//       //   console.log(msg);
//       // });  
//       wss.clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           ws.send(message);
//         }
//       });
//     });

//   })
//   .then((result) => {
//     app.listen(4000)
//   })
//   .catch((err) => console.log(err));
 

app.listen(4000)

app.use(cors({
  origin: allowed_origins,
}));


// routes
app.get('/', (req, res) => res.send('Hello, World!'));
// app.use(authRoutes);
// app.use(chatRoutes);


const clients = {};
app.ws("/:key", function (ws, req) {
  const key = req.params.key;
  clients[key] = clients[key] || [];

  // Add the new client to the clients list
  clients[key].push(ws);

  // Remove the client from the clients list when it disconnects
  ws.on("close", function () {
    clients[key] = clients[key].filter((client) => client !== ws);
     
    console.log("client disconnected");
  });
}); 

app.ws("/:key", function (ws, req) {
  const key = req.params.key;
  clients[key] = clients[key] || [];

  // Add the new client to the clients list
  clients[key].push(ws);

  // Remove the client from the clients list when it disconnects
  ws.on("close", function () {
    clients[key] = clients[key].filter((client) => client !== ws);
    console.log("client disconnected");
  });
});

app.post("/api/send/:key", function (req, res) { 
  console.log(123)
  console.log( req.body);
  const { message } = req.body; 
  
  const key = "a"

  clients[key].forEach((client) => client.send(message));
  res.json({ success: true });
});
