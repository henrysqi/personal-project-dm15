import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class FeedMenu extends React.Component {
  render() {
    return (
      <div id="feed-menu">
        <Link to={`/${this.props.currentUser.user.id}`}><div className="feed-menu-item-container">
          <img className="feed-menu-icon" src={`${this.props.currentUser.user.profile_pic}`} />
          <span>{this.props.currentUser.user.firstname} {this.props.currentUser.user.lastname}</span>
        </div></Link>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/pencil.png" />
          <span>Edit Profile</span>
        </div>

        <h2>FAVORITES</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/news.png" />
          <Link to={'/feed'}><span>News Feed</span></Link>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/Chat.png" />
          <Link to='/messages/0'><span>Messages</span></Link>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/calendar-128.png" />
          <span>Events</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/shopping.png" />
          <span>Shops</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/bookmark_ribbon1600.png" />
          <span>Saved</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/tag-xxl.png" />
          <span>Buy and Sell Groups</span>
        </div>

        <h2>PAGES</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/articles_o.png" />
          <span>Pages Feed</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/flag-xxl.png" />
          <span>Liked Pages</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/bar_chart-512.png" />
          <span>Create Ad</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/add_green.png" />
          <span>Create Page</span>
        </div>

        <h2>GROUPS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/compass-icon.png" />
          <span>Discover Groups</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/plus-4-xxl.png" />
          <span>Create Group</span>
        </div>

        <h2>APPS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/Video-Camera-ICON.png" />
          <span>Live Video</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/play.png" />
          <span>Games</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/472801-appicns_Time-Machine.png" />
          <span>On This Day</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/698873-icon-136-document-edit-128.png" />
          <span>Suggest Edits</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/devices-19-512.png" />
          <span>Games Feed</span>
        </div>

        <h2>INTERESTS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/WIFI_icon.svg.png" />
          <span>Following</span>
        </div>

        <h2>DEVELOPER</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/wrench-icon.png" />
          <span>Managing Apps</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/IdeaBase_Icons_MagGlass.png" />
          <span>Insights</span>
        </div>

        <h2>FUNDRAISERS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/love_plus-512.png" />
          <span>Create Fundraiser</span>
        </div>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/fundcomp.png" />
          <span>Find Fundraisers</span>
        </div>

        <h2>EVENTS</h2>
        <div className="feed-menu-item-container">
          <img className="feed-menu-icon" src="http://localhost:8080/assets/images/calendar_plus-512.png" />
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
