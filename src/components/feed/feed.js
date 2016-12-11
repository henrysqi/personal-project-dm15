import React from 'react';

import FeedHeader from './feed_header/feed_header';
import FeedMenu from './feed_menu/feed_menu';
import FeedNews from './feed_news/feed_news';
import FeedAds from './feed_ads/feed_ads';
import FixedFriends from '../reusables/fixedfriends'

import {connect} from 'react-redux';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

class Feed extends React.Component {

  componentDidMount(){
    socket.emit('newUser', this.props.currentUser.user)
  }

  render() {
    return (
      <div>
        <FeedHeader />
        <div className="content-main">
          <div className="feed-main-content-container">
            <FeedMenu />
            <FeedNews />
            <FeedAds />
          </div>
        </div>
        <FixedFriends />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Feed);
