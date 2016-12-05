import React from 'react';

import NewPost from '../reusables/new_post';
import TimelinePosts from '../reusables/timeline_posts';

class ProfileTimeline extends React.Component {
  render() {
    return (
      <div>
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
          <NewPost />
          <TimelinePosts profileid={this.props.params.id} />
        </div>
      </div>


    )
  }
}

export default ProfileTimeline;
