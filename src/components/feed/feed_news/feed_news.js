import React from 'react';
import NewPost from '../../reusables/new_post';
import Posts from '../../reusables/posts';

class FeedNews extends React.Component {

  renderPostsComponent(){
    return (
      <Posts />
    )
  }

  render() {
    return (
      <div id="feed-news">
        <NewPost renderPostsComponent={this.renderPostsComponent} />
        {this.renderPostsComponent()}
      </div>
    )
  }
}

export default FeedNews;
