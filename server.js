require('dotenv').config();

/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder */
app.use(express.static('website'));

/* Access API key from env*/
const apiKey = process.env.API_KEY;


app.get('/key', (req, res) => {
  res.send({ key: apiKey });
});

/* Spin up the server */
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(`Server is running on localhost: ${port}`);
}

/* GET route */
app.get('/all', (req, res) => {
  res.send(projectData);
});

/* POST route */
app.post('/add', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse }; // Update projectData
  res.send(projectData);
});
