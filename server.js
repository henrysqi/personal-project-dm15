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

      db.return_all_accounts(function(err, result){
        if (err){
          res.status(500).send(err);
        } else {
          for (var i = 0; i < result.length; i++){
            if (req.body.email === result[i].email && req.body.password === result[i].password){
              var payload = {"email": req.body.email, "password": req.body.password, "userid": result[i].id}
              res.send(payload)
            }
          }
        }
      })

		}
  })
})

app.post('/auth', function(req,res,next){
  var flag = true;
  db.return_all_accounts(function(err,result){
    if (err){
      res.status(500).send(err);
    } else {
      for (var i = 0; i < result.length; i++){
        if (req.body.email === result[i].email && req.body.password === result[i].password){
          flag = false;
          var payload = {"email": req.body.email, "password": req.body.email, "userid": result[i].id}
          var currentUser = result[i];

          jwt.sign(payload, secret, {}, (err,token) => {
            if (err){
              res.status(500).send(err)
            }
            else {
              console.log('Returning to client')
              console.log(currentUser)
              res.send({
                token: token,
                msg: 'ok',
                user: currentUser
              })
            }
          })

        }
      }
      if (flag) {
        console.log("wrong input")
      }
    }
  })
})

/* ========================================================================*/


/* ========================================================================*/


app.listen(port, function(){
  console.log("listening on port", port)
})

module.exports = app;
