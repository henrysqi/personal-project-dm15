import {combineReducers} from 'redux';
import AuthReducer from './auth_user';

const rootReducer = combineReducers({
  currentUser: AuthReducer
});

export default rootReducer;
