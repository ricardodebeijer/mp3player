import * as types from './types'
import Api from '../lib/api'


// export function getInfoForUrl(url) {
//     return (dispatch, getState) => {
//         return Api.get(`/fetchinfo`).then(resp => {
//             dispatch(setInfoForUrl({info: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setInfoForUrl({info}) {
//     return {
//         type: types.SET_INFO_FOR_URL,
//         info,
//     }
// }


export function addSong(url) {
    return (dispatch, getState) => {
        const payload = {
            "youtube_url": url,
        };
        return Api.post(`/addsong/`,payload).then(resp => {
            dispatch(setAddSong({resp}));
        }).catch((ex) => {
            console.log(ex);
        });
    }
}

export function setAddSong({resp}) {
    return {
        type: types.SET_ADMIN_ADD_SONG,
        status: resp,
    }
}


