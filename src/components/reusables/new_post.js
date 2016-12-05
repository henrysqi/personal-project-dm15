import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createNewPost} from '../../actions/index';

import Modal from 'react-modal';

class NewPost extends React.Component {
  constructor(){
    super();
    this.state = {
      userid: '',
      text_content: '',
      pic_content: '',
      vid_content: '',
      date: '',
      modalIsOpen: false
    }
    this.onTextContentChange = this.onTextContentChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onPicSubmit = this.onPicSubmit.bind(this);
    this.onVideoSubmit = this.onVideoSubmit.bind(this);
    this.onPicChange = this.onPicChange.bind(this);
    this.onVidChange = this.onVidChange.bind(this);
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

    this.setState({
      date: new Date()
    })
    setTimeout(() => {
      this.props.createNewPost(this.state);
      this.setState({
        text_content: '',
        pic_content: '',
        vid_content: '',
        vid_content_pre: '',
        date: '',
        modalIsOpen: false
      })

      this.props.renderPostsComponent();
    }, 200)

  }

// modal ==========================================================

openModal() {
  this.setState({modalIsOpen: true});
}

afterOpenModal() {
  // references are now sync'd and can be accessed.
  // this.refs.subtitle.style.color = '#f00';
}

closeModal() {
  this.setState({modalIsOpen: false});
}

onPicSubmit(event){
  event.preventDefault();
  this.setState({
    modalIsOpen: false
  })
}

onVideoSubmit(event){
  event.preventDefault();
  this.setState({
    modalIsOpen: false
  })
}

onPicChange(event){
  this.setState({
    pic_content: event.target.value
  })
}

onVidChange(event){
  //https://www.youtube.com/watch?v=kxopViU98Xo
  let rootUrl = "https://www.youtube.com/embed/" + event.target.value.slice(event.target.value.indexOf("=") +1 );

  this.setState({
    vid_content_pre: event.target.value,
    vid_content: rootUrl
  })
}






  render() {
    return (
      <div id="new-post">
        <div id="new-post-input">
          <img id="new-post-input-profilepic" src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
          <textarea value={this.state.text_content} onChange={this.onTextContentChange} placeholder="What's on your mind?"></textarea>
          <br></br>
          {this.state.pic_content ? <img className="new-post-input-pic" src={this.state.pic_content} /> : <span></span>  }
          {this.state.vid_content ? <iframe className="new-post-input-pic" src={this.state.vid_content}></iframe> : <span></span> }
        </div>
        <div id="new-post-options">
          <button onClick={this.openModal}>
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


        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            content : {
              top                   : '30%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
          }}
          contentLabel="Example Modal"
        >

          {/* <h2 ref="subtitle">Hello</h2> */}
          <p>Include a photo link</p>
          <form onSubmit={this.onPicSubmit}>
            <input value={this.state.pic_content} onChange={this.onPicChange} />
            <span><button>Submit</button></span>
          </form>
          <p>Include a video link</p>
          <form onSubmit={this.onVideoSubmit}>
            <input value={this.state.vid_content_pre} onChange={this.onVidChange} />
            <span><button>Submit</button></span>
          </form>
          <br></br>
          <button onClick={this.closeModal}>close</button>
        </Modal>

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
