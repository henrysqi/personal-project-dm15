import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FeedHeader from '../feed/feed_header/feed_header';
import {fetchUserById, friendRequest, fetchFriends, updateProfilePic, updateCoverPhoto} from '../../actions/index';
import {Link} from 'react-router';

import NewPost from '../reusables/new_post';
import TimelinePosts from '../reusables/timeline_posts';

import Modal from 'react-modal';

class ProfileFriends extends React.Component {
  constructor(){
    super();
    this.state = {
      friendButtonText: null,
      modalIsOpen: false,
      profilepic: '',
      coverphoto: '',
    }
    this.makeFriendRequest = this.makeFriendRequest.bind(this);
    this.renderHero = this.renderHero.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onProfilePicSubmit = this.onProfilePicSubmit.bind(this);
    this.onCoverPhotoSubmit = this.onCoverPhotoSubmit.bind(this);
    this.onProfilePicChange = this.onProfilePicChange.bind(this);
    this.onCoverPhotoChange = this.onCoverPhotoChange.bind(this);
  }

  renderHero(){
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
                foundflag = true;
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

  componentWillMount(){
    this.renderHero();
    this.updateState();
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


  updateState(){
    let filteredFriends = []
    let filteredFriendsObjects = []
    let fetchUserByIdPointer = this.props.fetchUserById;
      this.props.fetchFriends().then((res) => {
        res.payload.data.forEach((elem) => {
          if (elem.resolved === true ){
            if (elem.sender === Number(this.props.params.id) && elem.receiver !== Number(this.props.params.id)){
              filteredFriends.push(elem.receiver)
            } else if (elem.receiver === Number(this.props.params.id) && elem.sender !== Number(this.props.params.id) ){
              filteredFriends.push(elem.sender)
            }
          }
      })

      filteredFriends.forEach((elem) => {
        this.props.fetchUserById(elem).then((res) => {
          filteredFriendsObjects.push(res.payload.data[0])
        })
      })

      setTimeout(() => {
        this.setState({
          friends: filteredFriendsObjects
        })
      }, 400)

    })
  }
  renderFriends(){
    if (!this.state.friends){
      return;
    }
    return this.state.friends.map((elem) => {
      return (
        <div>

          <div className="profile-friends-friend">
            <img src="http://localhost:8080/assets/images/defprofpic.jpg" />
            <div id="profile-friends-friend-info">
              <h2>{elem.firstname} {elem.lastname}</h2>
              <button>Relationship</button>
            </div>
          </div>

        </div>
      )
    }).reverse();
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

    onProfilePicSubmit(event){
      event.preventDefault();
      console.log(this.state)
      let renderHeroPointer = this.renderHero;
      if (this.props.currentUser.user.id === Number(this.props.params.id)){
        this.props.updateProfilePic(this.props.currentUser.user.id, this.state).then(() => {
          renderHeroPointer();
        })
      }

      this.setState({
        modalIsOpen: false
      })
    }

    onCoverPhotoSubmit(event){
      event.preventDefault();

      let renderHeroPointer = this.renderHero;
      if (this.props.currentUser.user.id === Number(this.props.params.id)){
        this.props.updateCoverPhoto(this.props.currentUser.user.id, this.state).then(() => {
          renderHeroPointer();
        })
      }

      this.setState({
        modalIsOpen: false
      })
    }

    onProfilePicChange(event){
      this.setState({
        profilepic: event.target.value
      })


    }

    onCoverPhotoChange(event){
      this.setState({
        coverphoto: event.target.value
      })
    }

  /* render profile/cover ====================================== */


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
              <form onSubmit={this.onProfilePicSubmit}>
                <input value={this.state.profilepic} onChange={this.onProfilePicChange} />
                <span><button>Submit</button></span>
              </form>
              <p>Update Cover Photo</p>
              <form onSubmit={this.onCoverPhotoSubmit}>
                <input value={this.state.coverphoto} onChange={this.onCoverPhotoChange} />
                <span><button>Submit</button></span>
              </form>
              <br></br>
              <button onClick={this.closeModal}>close</button>
            </Modal>

            <div id="profile-hero">
                <div onClick={this.openModal} id="profile-cover-photo">
                  {this.state.userinfo ? <img src={this.state.userinfo.payload.data[0].cover_photo} /> : <img src="http://localhost:8080/assets/images/default.jpg" /> }
                  {/* <img src="http://pre11.deviantart.net/4da2/th/pre/i/2013/083/4/0/random_landscape_02_by_lizterhann-d5z5x4h.jpg" /> */}
                </div>
                <div id="profile-hero-menu">
                  <Link to={`/${this.props.params.id}`}><button>Timeline</button></Link>
                  <Link to={`/${this.props.params.id}/about`}><button>About</button></Link>
                  <Link to={`/${this.props.params.id}/friends`}><button>Friends</button></Link>
                  <button>Photos</button>
                  <button>More</button>
                </div>

                <div onClick={this.openModal} id="profile-profile-pic">
                  {this.state.userinfo ? <img src={this.state.userinfo.payload.data[0].profile_pic} /> : <img src="http://localhost:8080/assets/images/defprofpic.jpg" /> }
                </div>
                <div id="profile-name">
                  {this.renderName()}
                </div>
                <div id="profile-hero-options">
                  <button onClick={this.makeFriendRequest}>
                    <img src="http://localhost:8080/assets/images/add-user3-512.png" />
                    {this.state.friendButtonText}
                  </button>
                  <button id="profile-follow-button">
                    <img src="http://localhost:8080/assets/images/wifi-logo-icon-87078.png" />
                    <span>Follow</span>
                  </button>
                  <button>
                    <img src="http://localhost:8080/assets/images/speech-bubble-2-xxl.png" />
                    <span>Message</span>
                  </button>
                  <button>
                    <span>...</span>
                  </button>
                </div>
            </div>

            <div className="profile-section-container">
              <div className="profile-section-title">
                <img src="http://localhost:8080/assets/images/users-user-icon.png" />
                <h1>Friends</h1>
              </div>
              <div id="profile-friends-content-container">
                {this.renderFriends()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFriends);
