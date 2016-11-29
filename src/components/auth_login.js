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
      <div id="auth-footer">
        <div id="auth-logo">
          Facebook
        </div>
        <div id="signup-form">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div>
              <label>email</label>
              <input type="text" {...email} />
            </div>
            <div>
              <label>new password</label>
              <input type="text" {...password} />
            </div>
            <button type="submit">Login</button>
          </form>
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
