import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'; // for name conflict

const rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;
