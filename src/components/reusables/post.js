import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {fetchUserById, updateLikes, fetchPosts, createComment, getComments, deletePost} from '../../actions/index';

import Comment from './comment';


class Post extends React.Component {
  constructor(){
    super();
    this.state = {
      comment: '',
      likeflag: false
    }
    this.renderLikes = this.renderLikes.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.removePost = this.removePost.bind(this);
  }

  componentWillMount(){
    this.getListOfComments()
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
    if (!this.state.likeflag){
      this.props.updateLikes(this.props.postinfo.id)
      this.setState({
        likeflag: true
      })
    }
    // this.props.updateLikes(this.props.postinfo.id)
  }

  onCommentChange(event) {
    event.preventDefault();
    this.setState({
      comment: event.target.value
    })
  }

  onCommentSubmit(event){
    event.preventDefault();
    let commentProps = {
      postid: this.props.postinfo.id,
      userid: this.props.currentUser.user.id,
      text_content: this.state.comment
    }
    this.props.createComment(commentProps).then(() => {
      this.getListOfComments();
    })
  }

  getListOfComments() {
    this.props.getComments().then((res) => {
      let filteredComments = [];
      res.payload.data.forEach((elem) => {
        if (elem.postid === this.props.postinfo.id) {
          filteredComments.push(elem)
        }
      })

      let listOfJsx = [];

      filteredComments.forEach((elem) => {
        this.props.fetchUserById(elem.userid).then((res) => {
          listOfJsx.push(
            <Comment elem={elem} res={res} />
          )
        })
      })

      setTimeout(() => {
        this.setState({
          comment: '',
          listOfComments: listOfJsx
        })
      }, 400)

    })
  }

  removePost(postinfo){
    if (postinfo.userid === this.props.currentUser.user.id){
      this.props.deletePost(postinfo.id)
    }
  }

  render() {
    return (
      <div className="post-container">
        <div id="post-user">
          <img onClick={() => {this.removePost(this.props.postinfo)}} id="delete-post-button" src="assets\images\button_close-128.png" />
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
          <div id="post-like" onClick={() => {this.renderLikes()}}>
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


        {/* <div id="post-comments">
          <img src="http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg" />
          <div id="post-comments-text">
            <span><h1>Firstname Lastname</h1></span>
            <p>Lorem ipsum dolor sit amet, no nec nostrud tincidunt. Mei ut lobortis consequat, solet suscipit et sea, ex nulla aperiam definiebas eam. Sea accusata dignissim ne. Diam altera laoreet pri id, purto denique recteque nec ex, nec prima debet tantas ad. Zril ubique vulputate duo ne, cum no eius dictas nostrud. Cu eos postea referrentur.
            </p>
          </div>
        </div> */}
        { this.state.listOfComments ? this.state.listOfComments : <span></span> }





        <div id="post-write-comment">
          <img src={this.props.currentUser.user.profile_pic} />
          <form onSubmit={this.onCommentSubmit}>
            <input value={this.state.comment} onChange={this.onCommentChange} placeholder="write a comment..." />
          </form>
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
    return bindActionCreators({fetchUserById, updateLikes, fetchPosts, createComment, getComments, deletePost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
