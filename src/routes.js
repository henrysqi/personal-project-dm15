import React from 'react';
import {Route, IndexRoute } from 'react-router';

import App from './components/app';
import Auth from './components/auth/auth';
import Feed from './components/feed/feed';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Auth} />
    <Route path=':id/feed' component={Feed}>

    </Route>
  </Route>
)
