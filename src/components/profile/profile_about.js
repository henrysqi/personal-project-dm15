import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FeedHeader from '../feed/feed_header/feed_header';
import {fetchUserById, friendRequest, fetchFriends} from '../../actions/index';
import {Link} from 'react-router';

import NewPost from '../reusables/new_post';
import TimelinePosts from '../reusables/timeline_posts';

class ProfileAbout extends React.Component {
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
                  <button>About</button>
                  <Link to={`${this.props.params.id}/friends`}><button>Friends</button></Link>
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

            {console.log(this.state.userinfo)}
            <div className="profile-section-container">
              <div className="profile-section-title">
                <img src="assets\images\users-user-icon.png" />
                <h1>About</h1>
              </div>
              <div id="profile-about-filters">
                <p id="profile-about-filters-chosen" className="profile-about-filters-item">Overview</p>
                <p className="profile-about-filters-item">Work and Education</p>
                <p className="profile-about-filters-item">Places You've Lived</p>
                <p className="profile-about-filters-item">Contact and Basic Info</p>
                <p className="profile-about-filters-item">Family and Relationships</p>
                <p className="profile-about-filters-item">Details About You</p>
                <p className="profile-about-filters-item">Life Eventss</p>
              </div>
              <div id="profile-about-content">
                <img src="assets\images\icon_email.png" />
                <span>{this.state.userinfo ? this.state.userinfo.payload.data[0].email : ''}</span>
                <br></br>
                <img src="assets\images\gender.jpg" />
                <span>{this.state.userinfo ? this.state.userinfo.payload.data[0].gender : ''}</span>
                <br></br>
                <img src="assets\images\birthday-cake-xxl.png" />
                <span>{this.state.userinfo ? this.state.userinfo.payload.data[0].month : ''} {this.state.userinfo ? this.state.userinfo.payload.data[0].day : ''}, {this.state.userinfo ? this.state.userinfo.payload.data[0].year : ''}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout);
