import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const all_songs = createReducer({}, {
    [types.SET_ALL_SONGS](state, action) {
        return action.songs
    },
});