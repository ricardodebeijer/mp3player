// import createReducer from '../lib/createReducer'
// import * as types from '../actions/types'
// import Api from '../lib/api'
//
// export const authentication = createReducer({}, {
//     [types.SET_AUTHENTICATION](state, action) {
//         if (action.resp) {
//             Api.setAuthToken(action.resp.auth_token);
//         } else {
//             let none = '';
//             Api.setAuthToken(none);
//             action.resp = {
//                 auth_token: none,
//                 refresh_token: none
//             }
//         }
//         let datetime = new Date();
//         action.resp.last_updated = datetime.toLocaleDateString() + ', ' + datetime.toLocaleTimeString()
//         return action.resp
//     },
// });
//
