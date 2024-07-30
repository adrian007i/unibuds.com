// NPM DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const enableWs = require('express-ws');
const multer = require('multer');

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
app.use(cors({ origin: [ 'http://localhost:5173'] }));

// WEB SOCKET CLIENTS 
clients = app.locals.clients = {};

// CONNECT TO MONGOOSE DATABASE
mongoose.connect(process.env.mongoURI)

  //SETUP WEB SOCKET CONNECTION AT /wss
  .then(result => {
    app.ws('/:userKey', async function (ws, req) {

      // ensure user JWT and user ID is valid when authenticating 
      const userKey = req.params.userKey;
      let protect = await protectRaw(req.header('Authorization'));

      if (!protect.authenticated || userKey !== protect.user._id.toString()) {
        ws.close();
        return;
      }

      clients[userKey] = clients[userKey] || [];

      // Add the new client to the clients list
      clients[userKey].push(ws); 

      // Remove the client from the clients list when it disconnects
      ws.on('close', function () {
        clients[userKey] = clients[userKey].filter((client) => client !== ws); 
        console.log('client disconnected');
      });

      // }); 
    });
  })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));





// ROUTES
app.get('/',(req, res) => res.send('Hello, World!'));
app.use(authRoutes);
app.use(chatRoutes);  


// 90 days
const CACHE_AGE = 1000 * 60 * 60 * 24 * 90;

app.use('/uploads',express.static('uploads', {
  maxAge: CACHE_AGE  
}));