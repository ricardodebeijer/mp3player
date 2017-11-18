import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

// export const current_playlist = createReducer({}, {
//     [types.SET_PLAYLIST](state, action) {
//         return action.playlist
//     },
// });

export const user_playlists = createReducer({}, {
    [types.SET_USER_PLAYLISTS](state, action) {
        return action.playlists
    },
});

//
// export const add_playlist = createReducer({}, {
//     [types.SET_ADD_PLAYLIST](state, action) {
//         return action.playlist
//     },
// });
//
//
// export const delete_playlist = createReducer({}, {
//     [types.SET_DELETE_PLAYLIST](state, action) {
//         return action.playlist
//     },
// });
//
// export const add_song_to_playlist = createReducer({}, {
//     [types.SET_ADD_SONG_TO_PLAYLIST](state, action) {
//         return action.song
//     },
// });
//
//
// export const delete_song_from_playlist = createReducer({}, {
//     [types.SET_DELETE_SONG_FROM_PLAYLIST](state, action) {
//         return action.playlist
//     },
// });

