import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {} from '../../actions/index';

import io from 'socket.io-client'


class MessagesBox extends React.Component {
  constructor(){
    super();

    this.state = { messages: [] }

  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    })
  }

  handleSubmit = event => {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body)
      event.target.value = ''
    }
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
          <form>
            <input />
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
