import React from 'react';
import FeedHeader from '../feed/feed_header/feed_header';
import FeedAds from '../feed/feed_ads/feed_ads';

class FriendRequests extends React.Component {

  componentWillMount(){
  }

  renderFriendRequest(){
    return (
      <div className="friend-request-item">
        <div id="friend-request-info">
          <img src="assets\images\defprofpic.jpg" />
          <div id="friend-request-info-text">
            <h2>Firstname Lastname</h2>
            <h3>Some Description</h3>
          </div>
        </div>
        <div id="friend-request-buttons">
          <button id="friend-request-buttons-confirm">Confirm</button>
          <button id="friend-request-buttons-delete">Delete Request</button>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className="content-main">
        <div id="friend-requests-content-container">

          <div id="friend-requests-content">
            <div id="friend-requests-title">
              <h1>Response to Your X Friend Requests</h1>
              <h4>View Sent Requests</h4>
            </div>
            {this.renderFriendRequest()}
            {this.renderFriendRequest()}
            {this.renderFriendRequest()}
          </div>

          <FeedAds />
        </div>
      </div>
    )
  }
}

export default FriendRequests;
