import React from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {signUpUser} from '../actions/index';

class SignUp extends React.Component {
  render() {
    const {fields: {firstName, lastName, email, reEmail, password}, handleSubmit} = this.props; //got this from reduxForm wire at bottom
    return (
      <div>
        <div>hello from auth_signup.js</div>
        <form onSubmit={handleSubmit(this.props.signUpUser)}>
          <h3>Sign Up</h3>

          <div>
            <label>first name</label>
            <input type="text" {...firstName} /> {/* pass all props of firstName object onto input, such as event handlers */}
          </div>
          <div>
            <label>last name</label>
            <input type="text" {...lastName} />
          </div>
          <div>
            <label>email</label>
            <input type="text" {...email} />
          </div>
          <div>
            <label>enter email again</label>
            <input type="text" {...reEmail} />
          </div>
          <div>
            <label>new password</label>
            <input type="text" {...password} />
          </div>

          <Link to="/feed"><button type="submit">Sign Up</button></Link>
        </form>
      </div>
    )
  }
}

//has same behavior has {connect} from react-redux
export default reduxForm({
  //config for reduxForm
  form: 'SignUpUser',
  fields: ['firstName', 'lastName', 'email', 'reEmail', 'password']
}, null, {signUpUser})(SignUp);






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
