import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';

export default combineReducers({
    // Add here for combine
    auth: AuthReducer,
    application: ApplicationReducer,
});