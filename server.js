var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var connString = require('./config')

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(cors());

var db = massive.connect({connectionString: connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
  }
)
//////////////////////////////////////////////////////////////////////////
app.post('/api/users', function(req, res, next){
  db.sign_up_user([req.body.firstname, req.body.lastname, req.body.email, req.body.password], function(err, result){
    if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
  })
})


//////////////////////////////////////////////////////////////////////////
app.listen(port, function(){
  console.log("listening on port", port)
})

module.exports = app;
