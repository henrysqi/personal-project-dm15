import {FETCH_SEARCH} from '../actions/index';

export default function(state = [], action){
  switch (action.type){
    case FETCH_SEARCH:
      return action.payload.data;
  }
  return state;
}
