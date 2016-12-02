import React from 'react';
import FeedHeader from '../feed/feed_header/feed_header';

class Profile extends React.Component {
  render(){
    return (
      <div>
        {/* <FeedHeader /> */}
        <div id="profile-container">
          <div id="profile-content-container">

            <div id="profile-hero">
                <div id="profile-cover-photo">
                  <img src="http://pre11.deviantart.net/4da2/th/pre/i/2013/083/4/0/random_landscape_02_by_lizterhann-d5z5x4h.jpg" />
                </div>
                <div id="profile-hero-menu">
                  <button>Timeline</button>
                  <button>About</button>
                  <button>Friends</button>
                  <button>Photos</button>
                  <button>More</button>
                </div>

                <div id="profile-profile-pic">
                  <img src="https://cuteoverload.files.wordpress.com/2015/08/042815-fb-gudetama1.jpg" />
                </div>
                <div id="profile-name">
                  <h1>Firstname Lastname</h1>
                </div>
                <div id="profile-hero-options">
                  <button>
                    <img src="assets\images\add-user3-512.png" />
                    <span>Add Friend</span>
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


          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
