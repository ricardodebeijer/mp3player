import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

// export const info_for_url = createReducer({}, {
//     [types.SET_INFO_FOR_URL](state, action) {
//         return action.song
//     },
// });
//
// export const delete_song = createReducer({}, {
//     [types.SET_ADMIN_DELETE_SONG](state, action) {
//         return action.song
//     },
// });
//
//
export const song_added = createReducer({}, {
    [types.SET_ADMIN_ADD_SONG](state, action) {
        return action.status
    },
});
//
// export const delete_artist = createReducer({}, {
//     [types.SET_ADMIN_DELETE_ARTIST](state, action) {
//         return action.artist
//     },
// });

