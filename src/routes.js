import React from 'react';
import {Route, IndexRoute } from 'react-router';

import App from './components/app';
import Auth from './components/auth/auth';
import Feed from './components/feed/feed';
import Search from './components/search/search';
import Profile from './components/profile/profile';
import FriendRequests from './components/friend_requests/friend_requests';
import ProfileAbout from './components/profile/profile_about';
import ProfileFriends from './components/profile/profile_friends';
import ProfilePhotos from './components/profile/profile_photos';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Auth} />
    <Route path='feed' component={Feed} />
    <Route path='search' component={Search} />
    <Route path='friends/requests' component={FriendRequests} />
    <Route path=':id' component={Profile} />
    <Route path=':id/about' component={ProfileAbout} />
    <Route path=':id/friends' component={ProfileFriends} />
    <Route path=':id/photos' component={ProfilePhotos} />
  </Route>
)
