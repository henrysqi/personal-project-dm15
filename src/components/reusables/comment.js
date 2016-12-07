import React from 'react';

class Comment extends React.Component {
  render() {
    return (
      <div id="post-comments">
        <img src={this.props.res.payload.data[0].profile_pic} />
        <div id="post-comments-text">
          <span><h1>{this.props.res.payload.data[0].firstname} {this.props.res.payload.data[0].lastname}</h1></span>
          <p>{this.props.elem.text_content}</p>
        </div>
      </div>
    )
  }
}

export default Comment;
