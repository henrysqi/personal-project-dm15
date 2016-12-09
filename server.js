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

/* socketio =================================================================== */
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3001, function(){
  console.log('listening on 3001')
})

var usersCount = 0;

// array of users objects with their id and socket
var users = {};
// users = {
//   '4': socket,
//   '11': socket
// }

// var roomId = "";

io.on('connection', function(socket){
  // io.emit('newMessageBack', "from line 51")

  usersCount++;
  console.log(usersCount + " connected")



  // add logged in user to the users object @@@@@@@@@@@@@@@@@@@@@@@@@@@@
  socket.on('newUser', function(body){
    users[body.id] = socket;
    console.log(Object.keys(users))
  })

  // create a new room when user clicks on friend in message list @@@@@@@@@@@@@@@@@@@@@@@
  // var roomId = ""
  // socket.on('createRoom', function(body){
  //   console.log(body);
  //
  //   var roomId = "";
  //
  //   if (body.currentUser < body.otherUser){
  //     roomId = body.currentUser + "." + body.otherUser;
  //   } else {
  //     roomId = body.otherUser + "." + body.currentUser;
  //   }
  //   console.log(roomId)

    //find users, join both sockets to that room id @@@@@@@@@@@@@@@@@@@@@@@@@@

    // users[body.currentUser].join(roomId);
    // users[body.otherUser].join(roomId);

    // undefined if only log in as asd. what if users {} doesnt have otheruser?
    // logged in user only joins the room himself?

  // })


  socket.on('newMessage', function(body){
    console.log("event triggered")
    console.log(body)
    // console.log(roomId)
    // console.log("after room id")
    io.emit(body.roomId, body);

    // io.to(roomId).emit('newMessageBack', body)

    // io.emit('newMessageBack', "from line 94")  workss

  })


  socket.on('disconnect', function(){
    usersCount--;
    console.log(usersCount + " connected")
  })

})


/* twitter api ==================================================*/
var Twit = require('twit');

var T = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

app.get('/api/twitter/trending', function(req, res){
  T.get('trends/place', {id: 1}, function(err, data, response){
    res.send(data)
  })
})

/* messages ========================================================================*/
app.post('/api/messages', function(req, res){
  var rb = req.body;
  db.create_new_message([rb.sender, rb.receiver, rb.text_content, rb.sender_firstname, rb.sender_lastname, rb.receiver_firstname, rb.receiver_lastname, rb.sender_profile_pic, rb.receiver_profile_pic], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/messages', function(req, res){
  db.get_all_messages(function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})




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
                  // console.log('Returning to client')
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
      if (flag){
        res.send("wrong input")
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
  db.create_new_post([req.body.userid, req.body.text_content, req.body.pic_content, req.body.date, req.body.vid_content], function(err, result){
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

app.post('/api/:id/pictures', function(req, res){
  db.create_new_picture([req.params.id, req.body.pic_content], function (err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/pictures', function(req, res){
  db.get_all_pictures(function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.put('/api/:postid/likes', function(req, res){
  db.update_likes([Number(req.params.postid)], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/api/comments', function(req, res){
  db.create_new_comment([req.body.postid, req.body.userid, req.body.text_content], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/comments', function(req, res){
  db.get_all_comments(function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
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

app.delete('/api/friends', function(req, res){
  db.delete_friends([req.body.pair], function(err, result){
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.put('/api/:id/profilepic', function(req, res){
  db.update_profile_pic([req.params.id, req.body.profilepic], function(err, result) {
    if (err){
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  })
})

app.put('/api/:id/coverphoto', function(req, res){
  db.update_cover_photo([req.params.id, req.body.coverphoto], function(err, result){
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
