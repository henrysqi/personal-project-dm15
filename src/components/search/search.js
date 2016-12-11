import React from 'react';

import FeedHeader from '../feed/feed_header/feed_header';
import FeedMenu from '../feed/feed_menu/feed_menu';
import SearchMid from './search_mid.js';
import FeedAds from '../feed/feed_ads/feed_ads';
import FixedFriends from '../reusables/fixedfriends';



class Search extends React.Component {
  render() {
    return (
      <div>
        <FeedHeader />
        <div id="content-main">
          <div className="feed-main-content-container" id="search-content-fix">
            <FeedMenu />
            <SearchMid />
            <FeedAds />
          </div>
        </div>
        <FixedFriends />
      </div>
    )
  }
}

export default Search;
