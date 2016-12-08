import {combineReducers} from 'redux';
import CurrentUserReducer from './current_user_reducer';
import SearchReducer from './search_reducer';
import CurrentConversationReducer from './current_conversation_reducer';

const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  searchResults: SearchReducer,
  currentConversation: CurrentConversationReducer
});

export default rootReducer;
