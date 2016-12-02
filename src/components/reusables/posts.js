import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchPosts} from '../../actions/index';
import Post from './post';

class Posts extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    this.props.fetchPosts().then((res) => {
      this.setState({
        posts: res
      })
    })
  }

  renderPost(){
    if (!this.state.posts){
      return;
    }
    return this.state.posts.payload.data.map((elem) => {
      return (
        <Post key={elem.id} postinfo={elem} />
      )
    }).reverse();
  }

  render() {
    return (
      <div>
        {this.renderPost()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts}, dispatch)
}

export default connect(null, mapDispatchToProps)(Posts);
