var bodyParser = require('body-parser');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors')
const app = express();
const dbPath = path.resolve(__dirname, 'embeddedPi.db')
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to SQLite Database Successfully');
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
	console.log(req.body);
	site = req.body.site;
	username = req.body.username;
	password= req.body.password;
	hashFunc = req.body.hashFunc
	performance=req.body.performance;
	var stmt = db.prepare("INSERT INTO hashManager(site,username,password,hashFunc,performance,currentdate,currentime) VALUES (?,?,?,?,?,date('now'),time('now'))")
	stmt.run(site,username,password,hashFunc,performance)
	stmt.finalize();
});
 
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
