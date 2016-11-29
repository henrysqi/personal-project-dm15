import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';

import {loginUser} from '../actions/index';

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(formprops){
    this.props.loginUser(formprops).then(() => {
      // console.log("from authlogin")
      // console.log(sessionStorage)
      this.context.router.push('feed')
    })
  }

  render() {
    const {fields: {email, password}, handleSubmit} = this.props;
    return (
      <div id="auth-header">
        <div className="auth-content-container">
          <div id="auth-logo">
            facebook
          </div>
          <div id="auth-signup-form">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div id="auth-login-email">
                <p>Email</p>
                <input size="20" type="text" {...email} />
              </div>
              <div id="auth-login-password">
                <p>Password</p>
                <input size="20" type="text" {...password} />
              </div>
              <div id="auth-login-button">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({loginUser}, dispatch);
}

export default reduxForm({
  //config for reduxForm
  form: 'loginUser',
  fields: ['email', 'password']
}, null, mapDispatchToProps)(Login);
