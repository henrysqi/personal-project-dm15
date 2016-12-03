import React from 'react';
import io from 'socket.io-client';
import fs from 'fs';

const socket = io.connect('/');
socket.emit('event', {message: "hi from first emit"});

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messageToSend: null,
      chatHistory: []
    }
    this.onMessageSend = this.onMessageSend.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  componentWillMount() {

  }

  onMessageChange(event){
    event.preventDefault();

    this.setState({
      messageToSend: event.target.value
    })
  }

  onMessageSend(){
    socket.emit('event',{message: this.state.messageToSend})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onMessageSend}>
          <input value={this.state.messageToSend} onChange={this.onMessageChange}></input>
        </form>
      </div>
    )
  }
}

export default Chat;
