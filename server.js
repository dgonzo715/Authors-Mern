const express = require('express');
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config');
const port = 8000;
app.use(cors()); // To allow communication between different ports
// For allowing POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
require('./server/routes/author.routes')(app); // Add routes for author model
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
