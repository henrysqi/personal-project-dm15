import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts, fetchFriends} from '../../actions/index';
import Post from './post';

class Posts extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    this.updateState();
  }

  updateState(){
    let filteredPosts = []
    //show only posts of self and friends of self
    this.props.fetchPosts().then((res) => {
      this.props.fetchFriends().then((res2) => {
        console.log(res) //posts
        console.log(res2) //friends
        console.log(this.props.currentUser)
        res.payload.data.forEach((elem) => {
          res2.payload.data.forEach((elem2) => {
            if (elem.userid === this.props.currentUser.user.id){
              filteredPosts.push(elem)
            } else {
              if ( (elem2.receiver === this.props.currentUser.user.id || elem2.sender === this.props.currentUser.user.id) && elem2.resolved === true ) {
                if (elem.userid === elem2.receiver || elem.userid === elem2.sender){
                  filteredPosts.push(elem);
                }
              }
            }

          })
        })
        this.setState({
          posts: filteredPosts
        })

      })
    })
  }

  renderPost(){
    if (!this.state.posts){
      return;
    }
    return this.state.posts.map((elem) => {
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

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts, fetchFriends}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
