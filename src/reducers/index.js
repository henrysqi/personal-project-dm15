import {combineReducers} from 'redux';
import CurrentUserReducer from './current_user_reducer';
import SearchReducer from './search_reducer';

const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  searchResults: SearchReducer
});

export default rootReducer;
