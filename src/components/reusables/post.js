import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {fetchUserById, updateLikes, fetchPosts} from '../../actions/index';

class Posts extends React.Component {
  constructor(){
    super();
    this.state = {}
    this.renderLikes = this.renderLikes.bind(this);
  }

  componentDidMount(){
    if (!this.props.postinfo){
      return;
    }
    this.props.fetchUserById(this.props.postinfo.userid).then((res) => {
      this.setState({
        userInfo: res
      })
    })
  }

  renderName(){
    if (!this.state.userInfo){
      return;
    } else {
      return (
        <h1>{this.state.userInfo.payload.data[0].firstname} {this.state.userInfo.payload.data[0].lastname}</h1>
      )
    }
  }

  renderLikes(){
    this.props.updateLikes(this.props.postinfo.id).then(() => {
      this.props.fetchPosts().then((res) => {
        let arrayOfPosts = res.payload.data;
        arrayOfPosts.forEach((elem) => {
          if (elem.id === this.props.postinfo.id){
            this.setState({
              numLikes: elem.num_likes
            })
          }
        })
      })
    })
  }

  render() {
    return (
      <div className="post-container">
        <div id="post-user">
          <Link to={`${this.props.postinfo.userid}`}><div id="post-user-pic">
            { this.state.userInfo ? <img src={`${this.state.userInfo.payload.data[0].profile_pic}`} /> : <span></span> }
          </div></Link>
          <div id="post-user-info">
            <Link to={`${this.props.postinfo.userid}`}>{this.renderName()}</Link>
            <h3>{this.props.postinfo.date}</h3>
          </div>
        </div>
        <div id="post-content">
          <p>{this.props.postinfo.text_content}</p>
          <img src={`${this.props.postinfo.pic_content}`} />
          {this.props.postinfo.vid_content ? <iframe src={`${this.props.postinfo.vid_content}`}></iframe> : <span></span> }
        </div>
        <div id="post-like-comment">
          <div id="post-like" onClick={this.renderLikes}>
            <img src="assets\images\like.png" />
            <span>Like</span>
          </div>
          <div id="post-comment">
            <img src="assets\images\grayspeech.png" />
            <span>Comment</span>
          </div>
        </div>
        <div id="post-num-likes">
          <img src="assets\images\thumbsup_blue.png" />
          { this.state.numLikes ? <span>{this.state.numLikes}</span> : <span>{this.props.postinfo.num_likes}</span> }
        </div>


        <div id="post-comments">
          <img src="http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg" />
          <div id="post-comments-text">
            <h1>Firstname Lastname</h1>
            <p>text</p>
          </div>
        </div>









        <div id="post-write-comment">
          <img src={this.props.currentUser.user.profile_pic} />
          <textarea placeholder="write a comment..."></textarea>
        </div>
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
    return bindActionCreators({fetchUserById, updateLikes, fetchPosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
