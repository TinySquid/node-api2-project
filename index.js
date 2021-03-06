//Get .env config
require('dotenv').config();
//Get Express
const express = require('express');
//Get CORS
const cors = require('cors');

//API ROUTES
const apiRoutes = require('./api/apiRoutes');

//PORT
const port = process.env.PORT || 4000;

//Create server
const server = express();

//Body Parser
server.use(express.json());

//CORS
server.use(cors());

//USE API ROUTES
server.use('/api', apiRoutes);

//START SERVER
server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});