import React from 'react';

import NewPost from '../reusables/new_post';
import TimelinePosts from '../reusables/timeline_posts';

class ProfileTimeline extends React.Component {
  render() {
    return (
      <div>
        <NewPost />
        <TimelinePosts profileid={this.props.params.id} />
      </div>

    )
  }
}

export default ProfileTimeline;
