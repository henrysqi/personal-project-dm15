import React from 'react';
import {connect} from 'react-redux';

class FeedMenu extends React.Component {
  render() {
    return (
      <div id="feed-menu">
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
          <span>Firstname Lastname</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\pencil.png" />
          <span>Edit Profile</span>
        </div>

        <h2>FAVORITES</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\news.png" />
          <span>News Feed</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\Chat.png" />
          <span>Messages</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\calendar-128.png" />
          <span>Events</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\shopping.png" />
          <span>Shops</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\bookmark_ribbon1600.png" />
          <span>Saved</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\tag-xxl.png" />
          <span>Buy and Sell Groups</span>
        </div>

        <h2>PAGES</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="assets\images\articles_o.png" />
          <span>Pages Feed</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Liked Pages</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Create Ad</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Create Page</span>
        </div>

        <h2>GROUPS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Discover Groups</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Create Group</span>
        </div>

        <h2>APPS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Live Video</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Games</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>On This Day</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Suggest Edits</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Games Feed</span>
        </div>

        <h2>INTERESTS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Following</span>
        </div>

        <h2>DEVELOPER</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Managing Apps</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Insights</span>
        </div>

        <h2>FUNDRAISERS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Create Fundraiser</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Find Fundraisers</span>
        </div>

        <h2>EVENTS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="" />
          <span>Create Event</span>
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

export default connect(mapStateToProps)(FeedMenu);
