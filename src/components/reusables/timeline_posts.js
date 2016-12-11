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

    let orderedPosts = this.state.posts.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );

    return orderedPosts.map((elem) => {
      return (
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
