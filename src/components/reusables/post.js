import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {fetchNameById} from '../../actions/index';

class Posts extends React.Component {
  constructor(){
    super();
    this.state = {}
  }

  componentDidMount(){
    if (!this.props.postinfo){
      return;
    }
    this.props.fetchNameById(this.props.postinfo.userid).then((res) => {
      this.setState({
        nameOfUser: res
      })
    })
  }

  renderName(){
    if (!this.state.nameOfUser){
      return;
    } else {
      return (
        <h1>{this.state.nameOfUser.payload.data[0].firstname} {this.state.nameOfUser.payload.data[0].lastname}</h1>
      )
    }
  }

  render() {
    return (
      <div className="post-container">
        <div id="post-user">
          <Link to={`${this.props.postinfo.userid}`}><div id="post-user-pic">
            <img src="http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg" />
          </div></Link>
          <div id="post-user-info">
            <Link to={`${this.props.postinfo.userid}`}>{this.renderName()}</Link>
            <h3>{this.props.postinfo.date}</h3>
          </div>
        </div>
        <div id="post-content">
          <p>{this.props.postinfo.text_content}</p>
          <img src={`${this.props.postinfo.pic_content}`} />
          {/* <iframe width="420" height="315"
          src="https://www.youtube.com/embed/kxopViU98Xo">
          </iframe> */}
        </div>
        <div id="post-like-comment">
          <img src="assets\images\like.png" />
          <span>Like</span>
          <img src="assets\images\grayspeech.png" />
          <span>Comment</span>
        </div>
        <div id="post-num-likes">
          <img src="assets\images\thumbsup_blue.png" />
          <span>num</span>
        </div>
        <div id="post-comments">
          {/* Replies component here */}
        </div>
        <div id="post-write-comment">
          <img src="http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg" />
          <textarea placeholder="write a comment..."></textarea>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchNameById}, dispatch)
}

export default connect(null, mapDispatchToProps)(Posts);
