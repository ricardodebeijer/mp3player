import * as types from './types'
import Api from '../lib/api'

export function getInfoForUrl(url) {
    return (dispatch, getState) => {
        return Api.get(`/url_info`).then(resp => {
            dispatch(setInfoForUrl({info: resp}));
        }).catch((ex) => {
            console.log(ex);
        });
    }
}

export function setInfoForUrl({info}) {
    return {
        type: types.SET_INFO_FOR_URL,
        info,
    }
}
//
// export function deleteSong() {
//     return (dispatch, getState) => {
//         return Api.get(`/delete_song`).then(resp => {
//             dispatch(setDeleteSong({song: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setDeleteSong({song}) {
//     return {
//         type: types.SET_ADMIN_DELETE_SONG,
//         song,
//     }
// }
//
//
export function addSong() {
    return (dispatch, getState) => {
        return Api.get(`/add_song`).then(resp => {
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


// export function deleteArtist() {
//     return (dispatch, getState) => {
//         return Api.get(`/delete_artist`).then(resp => {
//             dispatch(setDeleteArtist({artist: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setDeleteArtist({artist}) {
//     return {
//         type: types.SET_ADMIN_DELETE_ARTIST,
//         artist,
//     }
// }
//
