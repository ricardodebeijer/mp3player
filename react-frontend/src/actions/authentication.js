// import * as types from './types'
// import Api from '../lib/api'

// export function fetchAuthentication(username, password) {
//     return (dispatch, getState) => {
//         const payload = {
//             "email": username,
//             "password": password
//         };
//         return Api.post(`/authenticate`, payload).then(resp => {
//             dispatch(setAuthentication({resp}));
//         }).catch((ex) => {
//             console.log(ex);
//             throw ex;
//         });
//     }
// }
//
// export function setAuthentication({resp}) {
//     return {
//         type: types.SET_AUTHENTICATION,
//         resp: resp,
//     }
// }





