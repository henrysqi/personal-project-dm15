import React from 'react';
import Login from './auth_login';
import Signup from './auth_signup';

class Auth extends React.Component {
  render() {
    return (
      <div>
        <Login />
        <Signup />
      </div>
    )
  }
}

export default Auth;
