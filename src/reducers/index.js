import {combineReducers} from 'redux';
import CurrentUserReducer from './current_user_reducer';
import SearchReducer from './search_reducer';
import CurrentConversationReducer from './current_conversation_reducer';
import CurrentNamespaceReducer from './current_namespace';

const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
  searchResults: SearchReducer,
  currentConversation: CurrentConversationReducer,
  currentNamespace: CurrentNamespaceReducer
});

export default rootReducer;
