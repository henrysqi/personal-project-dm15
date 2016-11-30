import React from 'react';

import FeedHeader from './feed_header/feed_header';
import FeedMenu from './feed_menu/feed_menu';
import FeedNews from './feed_news/feed_news';
import FeedAds from './feed_ads/feed_ads';


class Feed extends React.Component {
  render() {
    return (
      <div>
        <FeedHeader />
        <div id="feed-main">
          <div className="feed-main-content-container">
            <FeedMenu />
            <FeedNews />
            <FeedAds />
          </div>
        </div>
      </div>
    )
  }
}

export default Feed;
