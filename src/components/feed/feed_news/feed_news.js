import React from 'react';
import NewPost from '../../reusables/new_post';

class FeedNews extends React.Component {
  render() {
    return (
      <div id="feed-news">
        <NewPost />
        <div className="feed-news-post-container">
          some post
        </div>
      </div>
    )
  }
}

export default FeedNews;
