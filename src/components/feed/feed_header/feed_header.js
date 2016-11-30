import React from 'react';
import FeedHeaderSearchbar from './feed_header_searchbar';
import FeedHeaderMenu from './feed_header_menu';

class FeedHeader extends React.Component {
  render() {
    return (
      <div>
        <div id="feed-header">
          <div className="feed-content-container">
              <FeedHeaderSearchbar />
              <FeedHeaderMenu />
          </div>
        </div>
      </div>
    )
  }
}

export default FeedHeader;
