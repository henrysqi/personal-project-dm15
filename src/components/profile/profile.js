import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FeedHeader from '../feed/feed_header/feed_header';
import {fetchUserById, friendRequest, fetchFriends, updateProfilePic, updateCoverPhoto} from '../../actions/index';
import {Link} from 'react-router';

import NewPost from '../reusables/new_post';
import TimelinePosts from '../reusables/timeline_posts';

import Modal from 'react-modal';

class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      friendButtonText: null,
      modalIsOpen: false,
      profilePic: '',
      coverPhoto: '',
    }
    this.makeFriendRequest = this.makeFriendRequest.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.props.fetchUserById(this.props.params.id).then((res) => {
      this.setState({
        userinfo: res
      })
      this.props.fetchFriends().then((res) => {
        if (this.props.currentUser.user.id === Number(this.props.params.id)){
          this.setState({friendButtonText: <span>Update Info</span>});
          return;
        } else {
          let foundflag = false;
          res.payload.data.forEach((elem) => {
            if (elem.sender === this.props.currentUser.user.id && elem.receiver === this.state.userinfo.payload.data[0].id){
              if (elem.resolved === false){
                console.log("ran this")
                this.setState({friendButtonText: <span>Request Pending</span>});
                foundflag = true;
                return;
              } else {
                this.setState({friendButtonText: <span>Friends</span>});
                return;
              }
            }
          });
          if (!foundflag){
            this.setState({friendButtonText: <span>Add Friends</span>});
            return;
          }
        }
      })
    })
  }

  renderName() {
    if (!this.state.userinfo){
      return;
    }
    return (
      <h1>{this.state.userinfo.payload.data[0].firstname} {this.state.userinfo.payload.data[0].lastname}</h1>
    )
  }

  makeFriendRequest(){
    if (!this.state.userinfo){
      return;
    }

    this.props.fetchFriends().then((res) => {
      let foundflag = false;
      res.payload.data.forEach((elem) => {
        if ( (elem.sender === this.props.currentUser.user.id && elem.receiver === this.state.userinfo.payload.data[0].id) || (elem.receiver === this.props.currentUser.user.id && elem.sender === this.state.userinfo.payload.data[0].id) ){
          foundflag = true;
          if (elem.resolved){
            this.setState({friendButtonText: <span>Friends</span>})
          } else {
            this.setState({friendButtonText: <span>Request Pending</span>})
          }
        }
      })
      if (!foundflag){
        this.props.friendRequest({
          sender: this.props.currentUser.user.id,
          receiver: this.state.userinfo.payload.data[0].id
        });
        this.setState({friendButtonText: <span>Request Pending</span>});
      }
    })

  }

/* update profile pic / cover photo =============================== */
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






  render(){
    return (
      <div>
        <FeedHeader />
        <div id="profile-container">
          <div id="profile-content-container">

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
              <p>Update Profile Picture</p>
              <form>
                <input />
                <span><button>Submit</button></span>
              </form>
              <p>Update Cover Photo</p>
              <form>
                <input />
                <span><button>Submit</button></span>
              </form>
              <br></br>
              <button onClick={this.closeModal}>close</button>
            </Modal>

            <div id="profile-hero">
                <div onClick={this.openModal} id="profile-cover-photo">
                  <img src="http://pre11.deviantart.net/4da2/th/pre/i/2013/083/4/0/random_landscape_02_by_lizterhann-d5z5x4h.jpg" />
                </div>
                <div id="profile-hero-menu">
                  <button>Timeline</button>
                  <Link to={`${this.props.params.id}/about`}><button>About</button></Link>
                  <Link to={`${this.props.params.id}/friends`}><button>Friends</button></Link>
                  <button>Photos</button>
                  <button>More</button>
                </div>

                <div onClick={this.openModal} id="profile-profile-pic">
                  <img src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
                </div>
                <div id="profile-name">
                  {this.renderName()}
                </div>
                <div id="profile-hero-options">
                  <button onClick={this.makeFriendRequest}>
                    <img src="assets\images\add-user3-512.png" />
                    {this.state.friendButtonText}
                  </button>
                  <button id="profile-follow-button">
                    <img src="assets\images\wifi-logo-icon-87078.png" />
                    <span>Follow</span>
                  </button>
                  <button>
                    <img src="assets\images\speech-bubble-2-xxl.png" />
                    <span>Message</span>
                  </button>
                  <button>
                    <span>...</span>
                  </button>
                </div>
            </div>

            <div id="profile-left-panel">
              <div className="profile-left-panel-item">
                <img src="assets\images\Circle-icons-globe.svg.png" />
                <span>Intro</span>
              </div>
              <div className="profile-left-panel-item">
                <img src="assets\images\MetroUI-Apps-Windows8-Photos-icon.png" />
                <span>Photos</span>
              </div>
              <div className="profile-left-panel-item">
                <img src="assets\images\circle-friends.png" />
                <span>Friends</span>
              </div>
              <div className="profile-left-panel-item" id="profile-lang">
                <div id="profile-left-panel-item-languages">
                  <p>English (US) · Español · Português (Brasil) · Français (France) · Deutsch</p>
                </div>
                <div id="profile-left-panel-item-languages-add">
                  <button>+</button>
                </div>
              </div>
            </div>

            <div id="profile-main-panel">
              <div>
                <NewPost />
                <TimelinePosts profileid={this.props.params.id} />
              </div>
            </div>

          </div>
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

function  mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUserById, friendRequest, fetchFriends, updateProfilePic, updateCoverPhoto}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
