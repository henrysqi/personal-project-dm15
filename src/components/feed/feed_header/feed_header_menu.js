import React from 'react';
import {connect} from 'react-redux';


class FeedHeaderMenu extends React.Component {

  render() {
    // console.log(this.props)
    return (
      <div id="feed-header-menu">
        <div id="feed-header-menu-pic-name">
          <img src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
          {/* <h3>{this.props.currentUser.user.firstname}</h3> */}
          <h3>Testing</h3>
        </div>
        <div id="divider"></div>
        <div id="feed-header-menu-home">
          <h3>Home</h3>
        </div>
        <div className="feed-header-menu-icon-container">
          <img src="assets/images/users-1.png" />
        </div>
        <div className="feed-header-menu-icon-container">
          <img src="assets/images/speech-bubble-2-xxl.png" />
        </div>
        <div className="feed-header-menu-icon-container">
          <img src="assets/images/globe.png" />
        </div>
        <div id="second-divider"></div>
        <div className="feed-header-menu-lock">
          <img src="assets/images/lock.png" />
        </div>
        <div className="feed-header-menu-arrow">
          <img src="assets/images/triangle-down-arrow-icon-65007.png" />
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
