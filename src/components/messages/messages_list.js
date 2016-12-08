import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserById, fetchFriends, changeConversation} from '../../actions/index';
import {Link} from 'react-router';

class MessagesList extends React.Component {
  constructor(){
    super();
    this.state={
      friends: []
    }
  }

  componentWillMount(){
    this.getFriendsState();
  }

  getFriendsState(){
    let friendIds = [];
    let friendInfos = [];
    this.props.fetchFriends().then((res) => {
      res.payload.data.forEach((elem) => {
        if (elem.sender === this.props.currentUser.user.id && elem.receiver !== this.props.currentUser.user.id){
          if (elem.resolved === true){
            friendIds.push(elem.receiver)
          }
        } else if (elem.receiver === this.props.currentUser.user.id && elem.sender !== this.props.currentUser.user.id) {
          if (elem.resolved === true){
            friendIds.push(elem.sender)
          }
        }
      });
      let fetchUserByIdPointer = this.props.fetchUserById;
      friendIds.forEach((elem) => {
        fetchUserByIdPointer(elem).then((res) => {
          friendInfos.push(res.payload.data[0])
        })
      })
    })


    setTimeout(() => {
      let friendInfosJSX = friendInfos.map((elem) => {
        return (
          <div onClick={this.changeConversationPointer.bind(this, elem.id)} id="messages-list-friend">
            <img src={elem.profile_pic} />
            <h2>{elem.firstname} {elem.lastname}</h2>
          </div>
        )
      })
      this.setState({
        friends: friendInfosJSX
      })
    }, 400)
  }

  changeConversationPointer(id) {
    this.props.changeConversation(id)
  }

  render() {
    return (
      <div id="messages-list-container">
        <div id="messages-list-title">
          <h3>Recent</h3>
          <h4>Message Requests</h4>
          <h5>More</h5>
        </div>
        <div id="messages-list-search">
          <input />
          <img src="http://localhost:8080/assets/images/magnify.png" />
        </div>
        <div id="messages-list-list">
          {this.state.friends ? this.state.friends : <span></span>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function  mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUserById, fetchFriends, changeConversation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
