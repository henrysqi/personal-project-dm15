import React from 'react';
import NewPost from '../../reusables/new_post';
import Posts from '../../reusables/posts';

class FeedNews extends React.Component {

  renderPostsComponent(){
    Posts.forceUpdate();
  }

  render() {
    return (
      <div id="feed-news">
        <NewPost renderPostsComponent={this.renderPostsComponent} />
        <Posts />
      </div>
    )
  }
}

export default FeedNews;
