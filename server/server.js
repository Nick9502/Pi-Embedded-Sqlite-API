var bodyParser = require('body-parser');

var {sequelize} = require('./config/sequelize')
var {HashData} = require('./models/HashData')
var {User} = require('./models/user')
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'embeddedPi.db')
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to the chinook database.');
  });

app.get('/user/:username',(req, res) => {
	const uname = req.params.username;
	db.all(`SELECT * FROM hashManager WHERE username = $username`,
	  {
		$username: uname
	  },
	  (err, rows) => {
		console.log(rows);
		if (rows.length > 0) {
		  res.send(rows[0]);
		} else {
		  res.send({}); // failed, so return an empty object instead of undefined
		}
	  }
	);
});
 
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});