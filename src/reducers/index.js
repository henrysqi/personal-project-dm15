import {combineReducers} from 'redux';
import AuthReducer from './auth_user';

const rootReducer = combineReducers({
  users: AuthReducer
});

export default rootReducer;
