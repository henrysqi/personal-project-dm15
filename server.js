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

function verify(req, res, next) {
  const token = req.get('Authorization');
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send();
    else {
      next();
    }
  })
}

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
              var currentUser = result[i];

              jwt.sign(payload, secret, {}, (err,token) => {
                if (err){
                  res.status(500).send(err)
                }
                else {
                  console.log('Returning to client')
                  res.send({
                    token: token,
                    msg: 'ok',
                    user: currentUser
                  })
                }
              })

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

/* feed page ========================================================================*/



/* search page ========================================================================*/
app.get('/api/search', function(req,res){
  if(req.query.search){
    db.get_search_results([req.query.search], function(err, result){
      if (err){
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  } else {
    db.get_search_results([""], function(err, result){
      if (err){
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  }
})

/* reusables ======================================================================*/
app.post('/api/posts', function(req, res){
  db.create_new_post([req.body.userid, req.body.text_content, req.body.pic_content, req.body.date], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/posts', function(req, res){
  db.get_all_posts(function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/name', function(req, res){
  if (req.query.id){
    db.get_user_name_by_id([req.query.id], function(err, result){
      if (err){
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  }
})

/* profile ========================================================================*/
app.get('/api/:id', function(req,res){
  db.get_user_profile_by_id([req.params.id], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/api/friends', function(req, res){
  db.friend_request([req.body.sender, req.body.receiver, false], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/friends/all', function(req, res){
  db.get_all_friends(function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.put('/api/friends', function(req, res){
  db.update_friends_resolved([req.body.sender, req.body.receiver], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})







/*  ========================================================================*/


app.listen(port, function(){
  console.log("listening on port", port)
})

module.exports = app;
