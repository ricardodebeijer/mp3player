import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './AudioControls.css'

class AudioControls extends Component {
    constructor(props) {
        super(props);
        this.btnBack = this.btnBack.bind(this);
        this.btn10sb = this.btn10sb.bind(this);
        this.btnPlay = this.btnPlay.bind(this);
        this.btnPause = this.btnPause.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.btn10sf = this.btn10sf.bind(this);
        this.btnForward = this.btnForward.bind(this);
        this.onTimeChanged = this.onTimeChanged.bind(this);
        this.onDurationChanged = this.onDurationChanged.bind(this);
        this.playerEnded = this.playerEnded.bind(this);
    }

    btnBack() {

    }

    btn10sb() {

    }

    btnPlay() {
        this.togglePlayPause()
    }

    btnPause() {
        this.togglePlayPause()
    }

    togglePlayPause() {
        let playing = this.props.isPlaying;
        if (playing) {
            this.audioplayer.pause()
        } else {
            this.audioplayer.play()
        }
        this.props.setPlaying(!playing);
    }

    btn10sf() {

    }

    btnForward() {

    }

    onTimeChanged(evt) {
        let time = evt.target.currentTime;
        // console.log('onTimeChanged:', time);
        this.props.setTime(time)
    }

    onDurationChanged(evt) {
        let duration = evt.target.duration;
        // console.log('onDurationChanged:', duration);
        this.props.setDuration(duration)
    }

    playerEnded(e) {
        console.log(e);
        alert('ended')
    }

    render() {
        // console.log('audiocontroller:', this.props.currentSong.song_mp3);
        return (
            <div >
                {/*AUDIO TAG below*/}

                <audio
                    id='audioplayer'
                    ref={(input) => {
                        this.audioplayer = input;
                    }}
                    preload='auto'
                    onTimeUpdate={evt => this.onTimeChanged(evt)}
                    onDurationChange={evt => this.onDurationChanged(evt)}
                    onEnded={evt => this.playerEnded(evt)}
                    src={this.props.currentSong.song_mp3}
                />

                {/*AUDIO TAG above*/}

                <p onClick={this.btnBack} className="glyphicon glyphicon-step-backward player-button"/>
                {/*<p onClick={this.btn10sb} className="glyphicon glyphicon-backward player-button"/>*/}
                {
                    !this.props.isPlaying ? (
                        <p onClick={this.btnPlay} ref={(input) => {
                            this.playbtnref = input;
                        }}
                           className="glyphicon glyphicon-play player-button"/>
                    ) : (
                        <p onClick={this.btnPause} ref={(input) => {
                            this.pausebtnref = input;
                        }}
                           className="glyphicon glyphicon-pause player-button"/>
                    )
                }

                {/*<p onClick={this.btn10sf} className="glyphicon glyphicon-forward player-button"/>*/}
                <p onClick={this.btnForward} className="glyphicon glyphicon-step-forward player-button"/>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        isPlaying: state.isPlaying,
        currentSong: state.current_song,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);
