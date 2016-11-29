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

/* auth page ==========================================================================*/

app.post('/api/users', function(req, res, next){
  var rb = req.body;
  db.sign_up_user([rb.firstname, rb.lastname, rb.email, rb.password, rb.gender, rb.bdaymonth, rb.bdayday, rb.bdayyear], function(err, result){
    if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
  })
})

app.post('/auth', function(req,res,next){
  var accounts;
  var flag = true;
  db.return_all_accounts(function(err,result){
    accounts = result;
    for (var i = 0; i < accounts.length; i++){
      if (req.body.email === accounts[i].email && req.body.password === accounts[i].password){
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
        flag = false;
      }
    }
     if (flag) {
      console.log("wrong input")
    }
  })
})

/* ========================================================================*/


/* ========================================================================*/


app.listen(port, function(){
  console.log("listening on port", port)
})

module.exports = app;
