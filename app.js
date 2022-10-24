const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(express.static('public'));

app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
// Create connection
const data = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "ticket_events",
});
// Connect to the database
data.getConnection((err, connection) => {
  if (err) throw err;
  console.log('MySql connected...' + connection.threadId)
});

// Router
const routes = require('./server/routes/ticket');
app.use('/', routes);

app.listen(port, () => {
  console.log(`server is working - port ${port}`);
});