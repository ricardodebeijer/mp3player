import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './CurrentInfo.css'

class CurrentInfo extends Component {
    constructor(props){
        super(props);
        this.toMinutes = this.toMinutes.bind(this);
        this.btnArtist = this.btnArtist.bind(this);
    }



    toMinutes(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        let final = minutes + ':' + seconds;

        return final.toString();
    }

    btnArtist(){

    }

    render() {
        return (
            <div >
                <b id="title-name">{this.props.currentSong.song_title}</b> <br/>
                <button id="artist-name" onClick={this.btnArtist}
                        className="navbuttonlink">{this.props.currentSong.artist_name}</button>
                <br/>
                <span>
                        {this.toMinutes(this.props.time)}
                    </span>
                <span>/</span>
                <span>
                        {this.toMinutes(this.props.duration)}
                    </span>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        currentSong: state.current_song,
        time: state.time,
        duration: state.duration
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentInfo);