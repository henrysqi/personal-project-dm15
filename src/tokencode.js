server.js
app.post('/auth', function(req,res,next){
  var accounts;
  var flag = true;
  db.return_all_accounts(function(err,result){
    accounts = result;
    for (var i = 0; i < accounts.length; i++){
      if (req.body.email === accounts[i].email && req.body.password === accounts[i].password){
        console.log(accounts[i])
        var payload = {email: req.body.email, password: req.body.password, userid: accounts[i].id}
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

index.js actions
export function signUpUser(props){
  const request = axios.post(`${ROOT_URL}api/users`, props).then((res) => {
    sessionStorage.setItem('myToken', res.data.token);
  })

  return {
    type: SIGN_UP_USER,
    payload: request
  }
}

export function loginUser(creds){
  const request = axios.post(`${ROOT_URL}auth`, creds).then((res) => {
    sessionStorage.setItem('myToken', res.data.token);
    console.log(res)
  })

  return {
    type: LOGIN_USER,
    payload: request
  }
}
