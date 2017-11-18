import {combineReducers} from 'redux';
import * as playerReducer from './player'
import * as playlistReducer from './playlist'
import * as adminReducer from './admin'
import * as authenticationReducer from './authentication'

export default combineReducers(Object.assign(
    playerReducer,
    playlistReducer,
    adminReducer,
    authenticationReducer,
));
