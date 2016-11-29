import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';

import {signUpUser} from '../actions/index';

class SignUp extends React.Component {
  static contextTypes = {
    // will search all parents till find property router (index.js)
    // access by this.context.router
    router: PropTypes.object
  }

  // props from the form
  onSubmit(formprops) {
    // push method provided by the router
    this.props.signUpUser(formprops).then(() => {
      this.context.router.push('feed')
    })
  }

  renderRange(min, max){
    let options = [];
    if (min > max){
      for (let i = min; i >= max; i--){
        options.push(<option key={i}>{i}</option>)
      }
    } else {
      for (let i = min; i <= max; i++){
        options.push(<option key={i}>{i}</option>)
      }
    }
    return options;
  }

  render() {
    const {fields: {firstname, lastname, email, password}, handleSubmit} = this.props; //got this from reduxForm wire at bottom
    return (
      <div id="auth-main" className="main-gradient">
        <div className="auth-content-container" id="auth-main-content">

          <div id="auth-main-image-container">
              <img src="/assets/images/auth-page.png" />
              <h2>Thanks for stopping by!</h2>
              <h3>This is Henry's attempt at cloning Facebook.</h3>
          </div>

          <div id="auth-main-signup-form">
            {/*let redux form handle submits. call action creator if form is valid. object with fields as keys, passed as props to action creator */}
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <h1>Sign Up</h1>
              <h2>It's free and always will be</h2>
                {/* pass all props of firstname object onto input, such as event handlers */}
                <input id="auth-signup-firstname" placeholder="First name" className={`${firstname.touched && firstname.invalid ? 'bad-input' : ''}`} type="text" {...firstname} />
                <input id="auth-signup-lastname" placeholder="Last name" className={`${lastname.touched && lastname.invalid ? 'bad-input' : ''}`} type="text" {...lastname} />
                <input id="auth-signup-email" placeholder="Email" className={`${email.touched && email.invalid ? 'bad-input' : ''}`} type="text" {...email} />
                <input id="auth-signup-reenter-email" placeholder="Re-enter email" />
                <input id="auth-signup-password" placeholder="New Password" className={`${password.touched && password.invalid ? 'bad-input' : ''}`} type="text" {...password} />
                <h3>Birthday</h3>
                <select>
                  <option defaultvalue disabled="disabled">Month</option>
                  <option>Jan</option>
                  <option>Fed</option>
                  <option>Mar</option>
                  <option>Apr</option>
                  <option>May</option>
                  <option>Jun</option>
                  <option>Jul</option>
                  <option>Aug</option>
                  <option>Sep</option>
                  <option>Oct</option>
                  <option>Nov</option>
                  <option>Dec</option>
                </select>
                <select>
                  <option selected="selected" disabled="disabled">Day</option>
                  {this.renderRange(1,31)}
                </select>
                <select>
                  <option selected="selected" disabled="disabled">Year</option>
                  {this.renderRange(2016,31)}
                </select>
                <br></br>
                <input className="auth-signup-radio" type="radio" /><span>Female</span>
                <input className="auth-signup-radio" type="radio" /><span>Male</span>
                <br></br>
              <button id="auth-signup-button" type="submit">Sign Up</button>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

function validate(values){
  const errors = {};

  if (!values.firstname){
    errors.firstname = 'Enter a first name';
  }

  if (!values.lastname){
    errors.lastname = 'Enter a lastname';
  }

  if (!values.email){
    errors.email = 'Enter a email';
  }

  if (!values.password){
    errors.password = 'Enter a password';
  }

  // if a key in errors matches a field and has falsy value, form is invalid
  return errors;
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signUpUser}, dispatch);
}


//has same behavior has {connect} from react-redux
export default reduxForm({
  //config for reduxForm
  form: 'signUpUser',
  fields: ['firstname', 'lastname', 'email', 'password'],
  validate
}, null, mapDispatchToProps)(SignUp);



/* user types something in, record it in store
state === {
  form: {
    SignUpUser: {
      title: '...',
      categories: '...',
      content: '...'
    }
  }
}
*/
