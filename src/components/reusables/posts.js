import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchPosts} from '../../actions/index';
import Post from './post';

class Posts extends React.Component {

  render() {
    return (
      <div>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts}, dispatch)
}

export default connect(null, mapDispatchToProps)(Posts);
