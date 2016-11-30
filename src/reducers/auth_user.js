import {SIGN_UP_USER, LOGIN_USER} from '../actions/index.js';

export default function(state = [], action){
  switch (action.type){
    case SIGN_UP_USER:
      return [action.payload.data, ...state];
    case LOGIN_USER:
      console.log(action)
      console.log(state)
      return [action.payload.data, ...state];
  }
  return state;
}
