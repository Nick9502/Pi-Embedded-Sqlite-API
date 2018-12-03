var bodyParser = require('body-parser');

var {sequelize} = require('./config/sequelize')
var {HashData} = require('./models/HashData')
var {User} = require('./models/user')
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const dbPath = path.resolve(__dirname, 'embeddedPi.db')
const port = process.env.PORT || 3000;
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

app.post('/user/signup',(req, res) => {
	db.run(
		"INSERT INTO hashManager VALUES ($site, $username, $password,$function,$performance,date('now'),time('now'))",
		// parameters to SQL query:
		{
		  $site: req.body.site,
		  $username: req.body.username,
		  $password: req.body.password,
		  $function: req.body.password,
		  $performance: req.body.performance,
		},
		// callback function to run when the query finishes:
		(err) => {
		  if (err) {
			res.send({message: 'error in app.post(/users)'});
		  } else {
			res.send({message: 'successfully run app.post(/users)'});
		  }
		}
	  );
});
 
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});