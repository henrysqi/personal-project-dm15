import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';

import {signUpUser} from '../../actions/index';

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
      // passwordstar: '',
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
    this.onDayChange = this.onDayChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onFemaleChange = this.onFemaleChange.bind(this);
    this.onMaleChange = this.onMaleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onBadInput = this.onBadInput.bind(this);
  }

  onFirstnameChange(event){
    this.setState({
      firstname: event.target.value
    })
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
  // getStars(num) {
  //   let stars = "";
  //   for (let i = 0; i < num; i++){
  //     stars += "*";
  //   }
  //   return stars;
  // }
  onPasswordChange(event){
    // passvar += event.target.value[event.target.value.length-1]
    this.setState({
      password: event.target.value
      // passwordstar: this.getStars(event.target.value.length)
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
    this.setState({
      bdaymonth: event.target.value
    })
  }
  onDayChange(event){
    this.setState({
      bdayday: event.target.value
    })
  }
  onYearChange(event){
    this.setState({
      bdayyear: event.target.value
    })
  }
  onFemaleChange(event) {
    this.setState({
      gender: "female"
    })
  }
  onMaleChange(event){
    this.setState({
      gender: "male"
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

  onBadInput(){
    console.log("testing");
  }

  static contextTypes = {
    // will search all parents till find property router (index.js)
    // access by this.context.router
    router: PropTypes.object
  }

  // props from the form
  onFormSubmit(event) {
    event.preventDefault();
    for (let key in this.state){
      if (this.state[key] === ''){
        alert(key + "is not filled")
        return;
      }
    }
    if (this.state.email !== this.state.reenter){
      return;
    }
    // push method provided by the router
    this.props.signUpUser(this.state).then((res) => {
      this.context.router.push(`${res.payload.data.userid}/feed`)
    })
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
            <form onSubmit={this.onFormSubmit}>
              <h1>Sign Up</h1>
              <h2>It's free and always will be</h2>
                {/* pass all props of firstname object onto input, such as event handlers */}
                <input className={this.state.firstname === '' ? 'bad-input' : ''} value={this.state.firstname} onChange={this.onFirstnameChange} id="auth-signup-firstname" placeholder="First name" type="text" />
                <input className={this.state.lastname === '' ? 'bad-input' : ''} value={this.state.lastname} onChange={this.onLastnameChange} id="auth-signup-lastname" placeholder="Last name" type="text" />
                <input className={this.state.email === '' ? 'bad-input' : ''} value={this.state.email} onChange={this.onEmailChange} id="auth-signup-email" placeholder="Email" type="text" />
                <input className={this.state.reenter !== this.state.email ? 'bad-input' : ''} value={this.state.reenter} onChange={this.onReenterChange} id="auth-signup-reenter-email" placeholder="Re-enter email" />
                <input className={this.state.password === '' ? 'bad-input' : ''} value={this.state.passwordstar} onChange={this.onPasswordChange} id="auth-signup-password" placeholder="New Password" type="text" />
                <h3>Birthday</h3>
                <select className={this.state.bdaymonth === '' ? 'bad-input' : ''} value={this.state.bdaymonth} onChange={this.onMonthChange}>
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
                <select className={this.state.bdayday === '' ? 'bad-input' : ''} value={this.state.bdayday} onChange={this.onDayChange}>
                  <option selected="selected" disabled="disabled">Day</option>
                  {this.renderRange(1,31)}
                </select>
                <select className={this.state.bdayyear === '' ? 'bad-input' : ''} value={this.state.bdayyear} onChange={this.onYearChange}>
                  <option selected="selected" disabled="disabled">Year</option>
                  {this.renderRange(2016,31)}
                </select>
                <br></br>
                <input className={this.state.gender === '' ? 'bad-input' : ''} value={this.state.gender} onChange={this.onFemaleChange} className="auth-signup-radio" type="radio" name="gender" /><span>Female</span>
                <input className={this.state.gender === '' ? 'bad-input' : ''} value={this.state.gender} onChange={this.onMaleChange} className="auth-signup-radio" type="radio" name="gender" /><span>Male</span>
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
