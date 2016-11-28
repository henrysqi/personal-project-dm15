import React from 'react';
import FeedPosts from './feed_posts';

class Feed extends React.Component {
  render() {
    return (
      <div>
        <div>hello from feed.js</div>
        <FeedPosts />
      </div>
    )
  }
}

export default Feed;
