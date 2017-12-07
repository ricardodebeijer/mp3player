import * as types from './types'
import Api from '../lib/api'

export function getCurrentSong() {
    return (dispatch, getState) => {
        return Api.get(`/player/1/`).then(resp => {
            dispatch(setCurrentSong({current: resp}));
        }).catch((ex) => {
            console.log('getCurrentSong', ex);
        });
    }
}

export function setCurrentSong({current}) {
    return {
        type: types.SET_CURRENT_SONG,
        current,
    }
}

export function setPlaying(playing) {
    return (dispatch, getState) => {
        dispatch(
            {
                type: types.SET_PLAYING,
                isPlaying: playing,
            }
        );
    }
}


// export function nextSong() {
//     return (dispatch, getState) => {
//         return Api.get(`/next_song`).then(resp => {
//             dispatch(setNextSong({song: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setNextSong({song}) {
//     return {
//         type: types.SET_NEXT_SONG,
//         song,
//     }
// }
//
//
// export function previousSong() {
//     return (dispatch, getState) => {
//         return Api.get(`/previous_song`).then(resp => {
//             dispatch(setPreviousSong({artist: resp}));
//         }).catch((ex) => {
//             console.log(ex);
//         });
//     }
// }
//
// export function setPreviousSong({song}) {
//     return {
//         type: types.SET_PREVIOUS_SONG,
//         song,
//     }
// }


export function setVolume(volume) {
    return (dispatch, getState) => {
        localStorage.setItem("user_volume", volume);
        dispatch(
            {
                type: types.SET_VOLUME,
                volume,
            }
        );
    }
}

export function setTime(time) {
    return (dispatch, getState) => {
        let roundnow = Math.floor(time);
        let roundlast = getState().time;
        // console.log('settime, roundnow, roundlast',roundnow,roundlast);
        if ((roundnow - roundlast) >= 1 || (roundnow - roundlast) < 0) {
            dispatch(
                {
                    type: types.SET_TIME,
                    time: roundnow,
                }
            );
        }
    }
}

export function setDuration(duration) {
    return (dispatch, getState) => {
        dispatch(
            {
                type: types.SET_DURATION,
                duration,
            }
        );
    }
}

