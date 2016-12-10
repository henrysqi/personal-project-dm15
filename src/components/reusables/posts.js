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

  }

  updateState(){
    let filteredPosts = []
    //show only posts of self and friends of self
    this.props.fetchPosts().then((res) => {
      this.props.fetchFriends().then((res2) => {
        res.payload.data.forEach((elem) => {
          let flag = false;
          res2.payload.data.forEach((elem2) => {

            if (elem.userid === this.props.currentUser.user.id){
              if (!flag){
                filteredPosts.push(elem)
                flag = true;
              }
            } else {
              if ( (elem2.receiver === this.props.currentUser.user.id || elem2.sender === this.props.currentUser.user.id) && elem2.resolved === true ) {
                if (elem.userid === elem2.receiver || elem.userid === elem2.sender){
                  if (!flag){
                    filteredPosts.push(elem);
                    flag = true;
                  }
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
      console.log(elem)
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
