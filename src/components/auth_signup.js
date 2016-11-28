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

  render() {
    const {fields: {firstname, lastname, email, password}, handleSubmit} = this.props; //got this from reduxForm wire at bottom
    return (
      <div>
        <div>hello from auth_signup.js</div>
        {/*let redux form handle submits. call action creator if form is valid. object with fields as keys, passed as props to action creator */}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Sign Up</h3>

          <div>
            <label>first name</label>
            {/* pass all props of firstname object onto input, such as event handlers */}
            <input className={`${firstname.touched && firstname.invalid ? 'bad-input' : ''}`} type="text" {...firstname} />
          </div>
          <div>
            <label>last name</label>
            <input className={`${lastname.touched && lastname.invalid ? 'bad-input' : ''}`} type="text" {...lastname} />
          </div>
          <div>
            <label>email</label>
            <input className={`${email.touched && email.invalid ? 'bad-input' : ''}`} type="text" {...email} />
          </div>
          <div>
            <label>new password</label>
            <input className={`${password.touched && password.invalid ? 'bad-input' : ''}`} type="text" {...password} />
          </div>

          <button type="submit">Sign Up</button>
        </form>
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
