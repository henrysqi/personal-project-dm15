import {CHANGE_CONVERSATION} from '../actions/index';

export default function(state = {}, action){
  switch (action.type){
    case CHANGE_CONVERSATION:
      return action.payload.data[0]
    default:
      return state;
  }
  return state;
}
