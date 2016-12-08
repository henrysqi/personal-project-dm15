import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {} from '../../actions/index';

import io from 'socket.io-client'

const socket = io('http://localhost:3001')
socket.on('message', message => {
  this.setState({ messages: [message, ...this.state.messages] })
})

class MessagesBox extends React.Component {
  constructor(){
    super();

    this.state = { messages: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
  }

  handleSubmit = event => {
    event.preventDefault();

    const body = event.target.value
    console.log(body)
    console.log(event.keyCode)
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      socket.emit('message', body)
      event.target.value = ''
    }
  }


  render() {
    const messages = this.state.messages.map((message, index) => {
      const img = message.img ? <img src={message.img} width='200px' /> : null
      return <li key={index}><b>{message.from}:</b>{message.body} {img}</li>
    })

    return (
      <div id="messages-box-container">
        <div id="messages-box-title">
          {this.props.currentConversation ? this.props.currentConversation : <span></span>}
        </div>
        <div id="messages-box-chat">
        </div>
        <div id="messages-box-input-container">
            <input placeholder='Enter a message...' onKeyUp={this.handleSubmit}/>
            {messages}
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
