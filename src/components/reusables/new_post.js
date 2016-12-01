import React from 'react';

class newPost extends React.Component {
  render() {
    return (
      <div id="new-post">
        <div id="new-post-input">
          <img src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
          <textarea placeholder="What's on your mind?"></textarea>
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
          <button>Login</button>
        </div>
      </div>
    )
  }
}

export default newPost;
