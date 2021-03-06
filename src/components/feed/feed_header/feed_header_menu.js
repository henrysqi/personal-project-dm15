import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class FeedHeaderMenu extends React.Component {

  render() {
    return (
      <div id="feed-header-menu">
        <Link to={`/${this.props.currentUser.user.id}`}><div id="feed-header-menu-pic-name">
          <img src={`${this.props.currentUser.user.profile_pic}`} />
          <h3>{this.props.currentUser.user.firstname}</h3>
        </div></Link>
        <div id="divider"></div>
        <div id="feed-header-menu-home">
          <Link to={'/feed'}><h3>Home</h3></Link>
        </div>
        <div className="feed-header-menu-icon-container">
          <Link to="/friends/requests"><img src="http://localhost:8080/assets/images/users-1.png" /></Link>
        </div>
        <div className="feed-header-menu-icon-container">
          <Link to='/messages/0'><img src="http://localhost:8080/assets/images/speech-bubble-2-xxl.png" /></Link>
        </div>
        <div className="feed-header-menu-icon-container">
          <img src="http://localhost:8080/assets/images/globe.png" />
        </div>
        <div id="second-divider"></div>
        <div className="feed-header-menu-logout">
          <Link to="/"><button>Log Out</button></Link>
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

export default connect(mapStateToProps)(FeedHeaderMenu);
