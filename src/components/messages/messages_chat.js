import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createMessage, getMessages} from '../../actions/index';

import io from 'socket.io-client'

const socket = io('http://localhost:3001')



class MessagesBox extends React.Component {
  constructor(){
    super();
    this.state ={
      message: '',
      messages: [],
    }
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  componentWillReceiveProps(){
    let renderMessagesPointer = this.renderMessages;
    this.props.getMessages().then((res) => {
      renderMessagesPointer(res.payload.data)
    })

    setTimeout(() => {
      socket.on(this.props.currentNamespace, (body) => {

        let history = this.state.messages.slice()
        history.push(
          <div id="messages-box-chat-message">
            <img src={body.sender_profile_pic} />
            <div id="messages-box-chat-message-text">
              <h2>{body.sender_firstname} {body.sender_lastname}</h2>
              <p>{body.text_content}</p>
            </div>
          </div>
        )
        this.setState({
          messages: history
        })

      })
    }, 200)

  }



  onMessageSubmit(event){
    event.preventDefault();
    let renderMessagesPointer = this.renderMessages;

    if (this.props.currentConversation.firstname && this.state.message){
      let propsToSend = {
        sender: this.props.currentUser.user.id,
        receiver: this.props.currentConversation.id,
        text_content: this.state.message,
        sender_firstname: this.props.currentUser.user.firstname,
        sender_lastname: this.props.currentUser.user.lastname,
        receiver_firstname: this.props.currentConversation.firstname,
        receiver_lastname: this.props.currentConversation.lastname,
        sender_profile_pic: this.props.currentUser.user.profile_pic,
        receiver_profile_pic: this.props.currentConversation.profile_pic,
        namespaceid: this.props.currentNamespace
      }
      this.props.createMessage(propsToSend).then(() => {
        this.props.getMessages().then((res) => {
          renderMessagesPointer(res.payload.data)
        })

        socket.emit('newMessage', propsToSend)

      })

      this.setState({
        message: ''
      })
    }
  }

  renderMessages(messages){
    let messagesJsx = [];
    let current = this.props.currentUser.user;
    let other = this.props.currentConversation;

    messages.forEach((elem) => {
      if ( (elem.sender === current.id && elem.receiver === other.id) || (elem.sender === other.id && elem.receiver === current.id) ){
        messagesJsx.push(
          <div id="messages-box-chat-message">
            <img src={elem.sender_profile_pic} />
            <div id="messages-box-chat-message-text">
              <h2>{elem.sender_firstname} {elem.sender_lastname}</h2>
              <p>{elem.text_content}</p>
            </div>
          </div>
        )
      }
    })
    if (messagesJsx.length !== 0){
      this.setState({
        messages: messagesJsx
      })
    }
    if (messagesJsx.length === 0){
      this.setState({
        messages: ''
      })
    }
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

          {/* <div id="messages-box-chat-message">
            <img src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg" />
            <div id="messages-box-chat-message-text">
              <h2>Firstname Lastname</h2>
              <p>test test</p>
            </div>
          </div> */}

          {this.state.messages.length !== 0 ? this.state.messages : <span></span>}

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
    currentConversation: state.currentConversation,
    currentNamespace: state.currentNamespace
  }
}

function  mapDispatchToProps(dispatch){
  return bindActionCreators({createMessage, getMessages}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBox);
