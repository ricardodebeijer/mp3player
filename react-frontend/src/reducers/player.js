import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const current_song = createReducer({
    "artist_name": "Loading",
    "song_title": "Songs",
}, {
    [types.SET_CURRENT_SONG](state, action) {
        return action.current
    },
});



export const isPlaying = createReducer(false, {
    [types.SET_PLAYING](state, action) {
        return action.isPlaying
    },
});

// export const next_song = createReducer({}, {
//     [types.SET_NEXT_SONG](state, action) {
//         return action.song
//     },
// });
//
//
// export const previous_song = createReducer({}, {
//     [types.SET_PREVIOUS_SONG](state, action) {
//         return action.song
//     },
// });

export const volume = createReducer(50, {
    [types.SET_VOLUME](state, action) {
        return action.volume
    },
});

export const time = createReducer(0, {
    [types.SET_TIME](state, action) {
        return action.time
    },
});

export const duration = createReducer(0, {
    [types.SET_DURATION](state, action) {
        return action.duration
    },
});

