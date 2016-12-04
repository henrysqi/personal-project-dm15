import React from 'react';
import FeedHeader from '../feed/feed_header/feed_header';
import FeedAds from '../feed/feed_ads/feed_ads';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FriendRequestItem from './friend_request_item';
import {fetchFriends, updateFriendsResolved} from '../../actions/index';

class FriendRequests extends React.Component {
  constructor() {
    super();
    this.state = {

    }

    this.acceptFriend = this.acceptFriend.bind(this);
    this.rejectFriend = this.rejectFriend.bind(this);
  }

  componentWillMount(){
    this.renderList();
  }

  acceptFriend(sender, receiver) {
    console.log(this.state)
    this.props.updateFriendsResolved({
      sender: sender,
      receiver: receiver
    });
    // let currentList = [];
    // this.state.friendRequests.forEach((elem) => {
    //   if (elem.sender !== sender && elem.receiver !== receiver){
    //     currentList.push(elem)
    //   }
    // })
    setTimeout(() => {
      this.renderList();
    }, 500)
  }

  rejectFriend(index){
    console.log("rejected lul")
  }

  renderList(){
    let acceptFriendPointer = this.acceptFriend;
    let rejectFriendPointer = this.rejectFriend;

    this.props.fetchFriends().then((res) => {
      let numOfRequests = 0;
      let friendRequests = [];
      res.payload.data.forEach((elem) => {
        if (elem.receiver === this.props.currentUser.user.id && elem.sender !== this.props.currentUser.user.id && elem.resolved === false){
          numOfRequests++;
          friendRequests.push(<FriendRequestItem
            rejectFriend={rejectFriendPointer}
            acceptFriend={acceptFriendPointer}
            elem={elem}
            key={elem.pair}
            currentid={this.props.currentUser.user.id}
            userid={elem.sender} />);
        }
      })

      this.setState({
        numOfRequests: numOfRequests,
        friendRequests: friendRequests
      })
    })
  }

  render() {
    return (
      // <FeedHeader />
      <div className="content-main">
        <div id="friend-requests-content-container">

          <div id="friend-requests-content">
            <div id="friend-requests-title">
              <h1>Response to Your {this.state.numOfRequests} Friend Requests</h1>
              <h4>View Sent Requests</h4>
            </div>
            {this.state.friendRequests}
          </div>

          <FeedAds />
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchFriends, updateFriendsResolved}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
