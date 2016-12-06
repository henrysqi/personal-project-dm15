import {SIGN_UP_USER, LOGIN_USER, UPDATE_PROFILE_PIC} from '../actions/index.js';

export default function(state = {}, action){
  switch (action.type){
    case SIGN_UP_USER:
      return action.payload.data;
    case LOGIN_USER:
      return action.payload.data;
    case UPDATE_PROFILE_PIC:
    console.log("from state")
      console.log(state)
      console.log(action)
      let newstate = Object.assign({}, state);
      newstate.user.profile_pic = action.payload.profilepic;
      return newstate;
  }
  return state;
}
