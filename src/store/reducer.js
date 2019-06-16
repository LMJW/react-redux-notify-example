import { combineReducers } from 'redux';
import { reducer as notifyReducer } from 'react-redux-notify';

const rootReducer = combineReducers({ notifications: notifyReducer });

export default rootReducer;
