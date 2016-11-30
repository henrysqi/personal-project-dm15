import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';

import {loginUser} from '../../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onEmailChange(event){
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange(event){
    this.setState({
      password: event.target.value
    })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit(event){
    event.preventDefault();

    this.props.loginUser(this.state).then((res) => {
      this.context.router.push("feed")
    })
  }

  render() {
    return (
      <div id="auth-header" className="header-gradient">
        <div className="auth-content-container">
          <div id="auth-logo">
            facebook
          </div>
          <div id="auth-login-form">
            <form onSubmit={this.onFormSubmit}>
              <div id="auth-login-email">
                <p>Email</p>
                <input value={this.state.email} onChange={this.onEmailChange} size="20" type="text" />
              </div>
              <div id="auth-login-password">
                <p>Password</p>
                <input value={this.state.password} onChange={this.onPasswordChange} size="20" type="text" />
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

export default connect(null, mapDispatchToProps)(Login)
