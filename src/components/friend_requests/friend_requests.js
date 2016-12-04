import React from 'react';
import FeedHeader from '../feed/feed_header/feed_header';
import FeedAds from '../feed/feed_ads/feed_ads';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FriendRequestItem from './friend_request_item';
import {fetchFriends} from '../../actions/index';

class FriendRequests extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  updateList() {
    console.log("work pls")
  }

  componentWillMount(){
    this.props.fetchFriends().then((res) => {
      let numOfRequests = 0;
      let friendRequests = [];
      res.payload.data.forEach((elem) => {
        if (elem.receiver === this.props.currentUser.user.id && elem.sender !== this.props.currentUser.user.id){
          numOfRequests++;
          friendRequests.push(<FriendRequestItem key={elem.pair} currentid={this.props.currentUser.user.id} userid={elem.sender} />);
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
  return bindActionCreators({fetchFriends}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
