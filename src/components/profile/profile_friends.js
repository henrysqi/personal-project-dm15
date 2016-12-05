import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FeedHeader from '../feed/feed_header/feed_header';
import {fetchUserById, friendRequest, fetchFriends} from '../../actions/index';
import {Link} from 'react-router';

import NewPost from '../reusables/new_post';
import TimelinePosts from '../reusables/timeline_posts';

class ProfileFriends extends React.Component {
  constructor(){
    super();
    this.state = {
      friendButtonText: null
    }
    this.makeFriendRequest = this.makeFriendRequest.bind(this);
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


      this.setState({
        friends: filteredFriends
      })
    })
  }
  renderFriends(){
    if (!this.state.friends){
      return;
    }
    console.log(this.state.friends)
    return this.state.friends.map((elem) => {
      return (
        <div>

          {/* <div className="profile-friends-friend">
            <img src="assets\images\defprofpic.jpg" />
            <div id="profile-friends-friend-info">
              <h2>Firstname Lastname</h2>
              <button>Relationship</button>
            </div>
          </div> */}

        </div>
      )
    }).reverse();
  }

  render(){
    return (
      <div>
        <FeedHeader />
        <div id="profile-container">
          <div id="profile-content-container">

            <div id="profile-hero">
                <div id="profile-cover-photo">
                  <img src="http://pre11.deviantart.net/4da2/th/pre/i/2013/083/4/0/random_landscape_02_by_lizterhann-d5z5x4h.jpg" />
                </div>
                <div id="profile-hero-menu">
                  <Link to={`${this.props.params.id}`}><button>Timeline</button></Link>
                  <Link to={`${this.props.params.id}/about`}><button>About</button></Link>
                  <button>Friends</button>
                  <button>Photos</button>
                  <button>More</button>
                </div>

                <div id="profile-profile-pic">
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

            <div className="profile-section-container">
              <div className="profile-section-title">
                <img src="assets\images\users-user-icon.png" />
                <h1>Friends</h1>
              </div>
              <div id="profile-friends-content-container">

                {/* <div className="profile-friends-friend">
                  <img src="assets\images\defprofpic.jpg" />
                  <div id="profile-friends-friend-info">
                    <h2>Firstname Lastname</h2>
                    <button>Relationship</button>
                  </div>
                </div> */}
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
  return bindActionCreators({fetchUserById, friendRequest, fetchFriends}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFriends);
