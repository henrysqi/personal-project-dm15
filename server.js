var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var jwt = require('jsonwebtoken');

var config = require('./config')

var app = express();
var port = 3000;
var secret = config.jwtSecret;

app.use(bodyParser.json());
app.use(cors());

var db = massive.connect({connectionString: config.connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
  }
)

app.post('/api/users', function(req, res, next){
  db.sign_up_user([req.body.firstname, req.body.lastname, req.body.email, req.body.password], function(err, result){
    if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
  })
})

app.post('/auth', function(req,res,next){
  if (req.body.email === "johndoe@email.com" && req.body.password === "password123"){
    var payload = {email: req.body.email, password: req.body.password}
    jwt.sign(payload, secret, {}, (err,token) => {
      if (err) throw err;
      else {
        console.log('Returning to client')
        res.send({
          token: token,
          msg: 'ok',
          user: 1
        })
      }
    })
    console.log(req.session)
  } else {
    console.log("wrong input")
  }


})



app.listen(port, function(){
  console.log("listening on port", port)
})

module.exports = app;
