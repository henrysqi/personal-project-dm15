import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';

import {signUpUser} from '../actions/index';

let passvar = "";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      reenter: '',
      password: '',
      passwordstar: '',
      birthday: '',
      gender: '',
      bdaymonth: '',
      bdayday: '',
      bdayyear: ''
    }

    this.onFirstnameChange = this.onFirstnameChange.bind(this);
    this.onLastnameChange = this.onLastnameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onReenterChange = this.onReenterChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
  }

  onFirstnameChange(event){
    this.setState({
      firstname: event.target.value
    })
    console.log(this.state)
  }
  onLastnameChange(event){
    this.setState({
      lastname: event.target.value
    })
  }
  onEmailChange(event){
    this.setState({
      email: event.target.value
    })
  }
  onReenterChange(event){
    this.setState({
      reenter: event.target.value
    })
  }
  getStars(num) {
    let stars = "";
    for (let i = 0; i < num; i++){
      stars += "*";
    }
    return stars;
  }

  onPasswordChange(event){
    passvar += event.target.value[event.target.value.length-1]
    this.setState({
      password: passvar,
      passwordstar: this.getStars(event.target.value.length)
    })
  }

  // test(){
  //   function test1(){
  //     console.log("1");
  //   }
  //   function test2(){
  //     console.log("2")
  //   }
  //   test1();
  //   test2();
  // }

  onMonthChange(event){
    console.log(event.target.value)
    this.setState({
      bdaymonth: event.target.value
    })
  }

  onDayChange(event){
    console.log(event.target.value)
    this.setState({
      bdayday: event.target.value
    })
  }

  onYearChange(event){
    console.log(event.target.value)
    this.setState({
      bdayyear: event.target.value
    })
  }


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
            <form>
              <h1>Sign Up</h1>
              <h2>It's free and always will be</h2>
                {/* pass all props of firstname object onto input, such as event handlers */}
                <input value={this.state.firstname} onChange={this.onFirstnameChange} id="auth-signup-firstname" placeholder="First name" type="text" />
                <input value={this.state.lastname} onChange={this.onLastnameChange} id="auth-signup-lastname" placeholder="Last name" type="text" />
                <input value={this.state.email} onChange={this.onEmailChange} id="auth-signup-email" placeholder="Email" type="text" />
                <input value={this.state.reenter} onChange={this.onReenterChange} id="auth-signup-reenter-email" placeholder="Re-enter email" />
                <input value={this.state.passwordstar} onChange={this.onPasswordChange} id="auth-signup-password" placeholder="New Password" type="text" />
                <h3>Birthday</h3>
                <select value={this.state.bdaymonth} onChange={this.onMonthChange}>
                  <option selected disabled="disabled">Month</option>
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
                <select value={this.state.bdayday} onChange={this.onDayChange}>
                  <option selected="selected" disabled="disabled">Day</option>
                  {this.renderRange(1,31)}
                </select>
                <select value={this.state.bdayyear} onChange={this.onYearChange}>
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({signUpUser}, dispatch);
}


export default connect(null, mapDispatchToProps)(SignUp);
