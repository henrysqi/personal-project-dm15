import {SIGN_UP_USER, LOGIN_USER} from '../actions/index.js';

export default function(state = {}, action){
  switch (action.type){
    case SIGN_UP_USER:
      return action.payload.data;
    case LOGIN_USER:
      return action.payload.data;
  }
  return state;
}
