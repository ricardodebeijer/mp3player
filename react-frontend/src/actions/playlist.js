import * as types from './types'
import Api from '../lib/api'

// export function playPlaylist(playlist) {
//     return (dispatch, getState) => {
//         return Api.get(`/playlist`).then(resp => {
//             dispatch(setPlaylist({playlist: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setPlaylist({playlist}) {
//     return {
//         type: types.SET_PLAYLIST,
//         playlist,
//     }
// }

export function getUserPlaylists() {
    return (dispatch, getState) => {
        return Api.get(`/playlist/`).then(resp => {
            let playlistsObj = Object.assign({},resp);
            dispatch(setUserPlaylists({playlists: playlistsObj}));
        }).catch((ex) => {
            console.log(ex);
        });
    }
}

export function setUserPlaylists({playlists}) {
    return {
        type: types.SET_USER_PLAYLISTS,
        playlists,
    }
}
//
// export function addPlaylist(playlist) {
//     return (dispatch, getState) => {
//         return Api.get(`/add_playlist`).then(resp => {
//             dispatch(setAddPlaylist({playlist: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setAddPlaylist({playlist}) {
//     return {
//         type: types.SET_ADD_PLAYLIST,
//         playlist,
//     }
// }
//
// export function deletePlaylist(playlist) {
//     return (dispatch, getState) => {
//         return Api.get(`/delete_playlist`).then(resp => {
//             dispatch(setDeletePlaylist({playlist: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setDeletePlaylist({playlist}) {
//     return {
//         type: types.SET_DELETE_PLAYLIST,
//         playlist,
//     }
// }
//
// export function addSongToPlaylist(playlist,song) {
//     return (dispatch, getState) => {
//         return Api.get(`/add_song_to_playlist`).then(resp => {
//             dispatch(setAddSongToPlaylist({song: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setAddSongToPlaylist({song}) {
//     return {
//         type: types.SET_ADD_SONG_TO_PLAYLIST,
//         song,
//     }
// }
//
// export function deleteSongFromPlaylist(playlist,song) {
//     return (dispatch, getState) => {
//         return Api.get(`/delete_song_from_playlist`).then(resp => {
//             dispatch(setDeleteSongFromPlaylist({song: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setDeleteSongFromPlaylist({song}) {
//     return {
//         type: types.SET_DELETE_SONG_FROM_PLAYLIST,
//         song,
//     }
// }

