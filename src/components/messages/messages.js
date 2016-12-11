import React from 'react';
import MessagesList from './messages_list';
import MessagesChat from './messages_chat';
import FeedHeader from '../feed/feed_header/feed_header';
import FixedFriends from '../reusables/fixedfriends';


class Messages extends React.Component {
  render() {
    return (
      <div>
        <FeedHeader />
        <div className="content-main">
          <div id="messages-container">
            <MessagesList />
            <MessagesChat />
          </div>
        </div>
        <FixedFriends />
      </div>
    )
  }
}

export default Messages;
