import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createNewPost} from '../../actions/index';

class NewPost extends React.Component {
  constructor(){
    super();
    this.state = {
      userid: '',
      text_content: '',
      pic_content: '',
      date: ''
    }
    this.onTextContentChange = this.onTextContentChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      userid: this.props.currentUser.user.id
    })
  }

  onTextContentChange(event){
    this.setState({
      text_content: event.target.value
    })
  }

  onFormSubmit(event){
    event.preventDefault();

    this.props.createNewPost(this.state);
  }

  render() {
    return (
      <div id="new-post">
        <div id="new-post-input">
          <img src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
          <textarea value={this.state.text_content} onChange={this.onTextContentChange} placeholder="What's on your mind?"></textarea>
        </div>
        <div id="new-post-options">
          <button>
            <img src="assets\images\photo.png" />
            <span>Photo/Video</span>
          </button>
          <button>
            <img src="assets\images\book-bookmark-icon.png" />
            <span>Photo Album</span>
          </button>
        </div>
        <div id="new-post-post">
          <button onClick={this.onFormSubmit}>Post</button>
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
  return bindActionCreators({createNewPost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
