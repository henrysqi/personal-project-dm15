import {CHANGE_CONVERSATION} from '../actions/index';

export default function(state = null, action){
  switch (action.type){
    case CHANGE_CONVERSATION:
      console.log(action);
      return action.payload
    default:
      return state;
  }
  return state;
}
