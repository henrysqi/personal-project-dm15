import React from 'react';
import Login from './auth_login';
import Signup from './auth_signup';
import Footer from './auth_footer';

class Auth extends React.Component {
  render() {
    return (
      <div>
        <Login />
        <Signup />
        <Footer />
      </div>
    )
  }
}

export default Auth;
