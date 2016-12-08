import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {} from '../../actions/index';

import io from 'socket.io-client'

const socket = io('http://localhost:3001')

class MessagesBox extends React.Component {
  constructor(){
    super();


  }


  render() {
    return (
      <div id="messages-box-container">
        <div id="messages-box-title">
          {this.props.currentConversation ? this.props.currentConversation : <span></span>}
        </div>
        <div id="messages-box-chat">

        </div>
        <div id="messages-box-input-container">
            <input placeholder='Enter a message...' />
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
