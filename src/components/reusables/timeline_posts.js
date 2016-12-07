import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts, fetchFriends} from '../../actions/index';
import Post from './post';

class TimelinePosts extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
  }

  updateState(){
    let filteredPosts = []
    //show only posts related to self
    this.props.fetchPosts().then((res) => {
      res.payload.data.forEach((elem) => {
        if (elem.userid === Number(this.props.profileid) || elem.receiver === Number(this.props.profileid)){
          filteredPosts.push(elem);
        }
      })
      this.setState({
        posts: filteredPosts
      })
    })
  }

  renderPost(){
    if (!this.state.posts){
      return;
    }
    return this.state.posts.map((elem) => {
      return (
        //key with elem.id already used?
        <Post postinfo={elem} />
      )
    }).reverse();
  }

  render() {
    this.updateState();
    return (
      <div>
        {this.renderPost()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts, fetchFriends}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePosts);
