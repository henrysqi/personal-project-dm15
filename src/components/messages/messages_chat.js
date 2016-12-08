import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {} from '../../actions/index';

import io from 'socket.io-client'

const socket = io('http://localhost:3001')

class MessagesBox extends React.Component {
  constructor(){
    super();
    this.state ={
      message: ''
    }
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  onMessageSubmit(event){
    event.preventDefault();
    console.log(this.state.message);
  }

  onMessageChange(event){
    event.preventDefault();
    this.setState({
      message: event.target.value
    })
  }

  render() {

    return (
      <div id="messages-box-container">
        <div id="messages-box-title">
          {this.props.currentConversation.firstname ? <h1>{this.props.currentConversation.firstname} {this.props.currentConversation.lastname}</h1> : <h1>Please Select a Friend</h1>}
        </div>

        <div id="messages-box-chat">

          <div id="messages-box-chat-message">
            <img src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg" />
            <div id="messages-box-chat-message-text">
              <h2>Firstname Lastname</h2>
              <p>test test</p>
            </div>
          </div>


        </div>

        <div id="messages-box-input-container">
          <form onSubmit={this.onMessageSubmit}>
            <input value={this.state.message} onChange={this.onMessageChange} placeholder='Enter a message...' />
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    currentConversation: state.currentConversation
  }
}

function  mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBox);
