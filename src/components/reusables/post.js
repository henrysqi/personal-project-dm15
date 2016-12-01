import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchPosts} from '../../actions/index';

class Posts extends React.Component {


  render() {
    return (
      <div>
        <div className="feed-news-post-container">
          some post
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts}, dispatch)
}

export default connect(null, mapDispatchToProps)(Posts);
