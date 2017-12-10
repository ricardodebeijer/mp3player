import * as types from './types'
import Api from '../lib/api'

export function getAllSongs() {
    return (dispatch, getState) => {
        return Api.get(`/song/`).then(resp => {
            let songsObj = Object.assign({},resp);
            dispatch(setAllSongs({songs: songsObj}));
        }).catch((ex) => {
            console.log(ex);
        });
    }
}

export function setAllSongs({songs}) {
    return {
        type: types.SET_ALL_SONGS,
        songs,
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
