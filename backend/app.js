// NPM DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const enableWs = require('express-ws');
const multer = require('multer');
const storeMessage = require('./controllers/webSockets');

// CUSTOM IMPORTS
const { protectRaw } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

// CONFIGURE SECRETS USING DOTENV
require('dotenv').config();

// INITIALIZE EXPRESS SERVER WITH ws
const app = express();
enableWs(app);

app.use(express.json());
app.use(cookieParser());


// ALLOW FRONT ENDS TO ACCESS THE APP 
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5500'] }));

// WEB SOCKET CLIENTS 
clients = new Map();

// CONNECT TO MONGOOSE DATABASE
mongoose.connect(process.env.mongoURI)

  //SETUP WEB SOCKET CONNECTION AT /wss
  .then(result => {
    app.ws('/web_socket_endpoint', async function (ws, req) { 
      console.log(123);
      
      // ensure user JWT and user ID is valid when authenticating 
      let protect = await protectRaw(req.query.auth);
       console.log(protect); 
       
      if (!protect.authenticated) {
        ws.close();
        return;
      }

      const userKey = protect.user._id.toString();

      // IF CLIENT IS NOT ALREADY CONNECTED
      if (!clients[userKey])
        clients[userKey] = ws;

      // CLIENT ALREADY CONNECTED
      ws.on('message', function (msg) {
        console.log(msg);
        
        const data = JSON.parse(msg);
        
        
        if (clients[data.reciever]) {

          clients[data.reciever].send(data.body);
          storeMessage(data, protect.user._id , true);

        } else {
          storeMessage(data, protect.user._id, false);
        }
      });

      // Remove the client from the clients list when it disconnects
      ws.on('close', function () {
        clients[userKey] = undefined;
      });

    });

    app
  })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));





// ROUTES
app.get('/', (req, res) => res.send('Hello, World!'));
app.use(authRoutes);
app.use(chatRoutes);


// 90 days
const CACHE_AGE = 1000 * 60 * 60 * 24 * 90;

app.use('/uploads', express.static('uploads', {
  maxAge: CACHE_AGE
}));