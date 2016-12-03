import React from 'react';
import {Route, IndexRoute } from 'react-router';

import App from './components/app';
import Auth from './components/auth/auth';
import Feed from './components/feed/feed';
import Search from './components/search/search';
import Profile from './components/profile/profile';
import FriendRequests from './components/friend_requests/friend_requests';

export default (
  <Route path='/' component={App}>
    {/* <IndexRoute component={Auth} /> */}
    <IndexRoute component={FriendRequests} />
    <Route path='feed' component={Feed} />
    <Route path='search' component={Search} />
    {/* <Route path='friends/requests' component={FriendRequests} /> */}
    <Route path=':id' component={Profile}>
      {/* <IndexRoute component={Timeline} />
      <Route path='/About' component={About} />
      <Route path='/Friends' component={Friends} />
      <Route path='/Photos' component={Photos} /> */}
    </Route>
  </Route>
)
