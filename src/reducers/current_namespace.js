import {CHANGE_NAMESPACE} from '../actions/index';

export default function(state = null, action){
  switch (action.type){
    case CHANGE_NAMESPACE:
      return action.payload
    default:
      return state;
  }
  return state;
}
