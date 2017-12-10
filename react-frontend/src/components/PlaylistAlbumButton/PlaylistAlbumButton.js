import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './PlaylistAlbumButton.css';

class PlaylistAlbumButton extends Component {

    constructor(props) {
        super(props);
        this.navigateToPlaylist = this.navigateToPlaylist.bind(this);
        this.playPlaylist = this.playPlaylist.bind(this);
    }

    navigateToPlaylist() {
        alert('ja..toon details lijst')
    }

    playPlaylist() {
        alert('ja..speel lijst')
    }


    render() {
        return (
            <div className="playlistContainer">
                <img alt="playlist" className="playlistimg img-responsive img-rounded"
                    // src={this.props.playlist.img}
                     src={this.props.playlist.playlist_art}
                />
                <div className="overlay" onClick={this.navigateToPlaylist}/>
                <div className="buttonoverlay">
                    <p onClick={this.playPlaylist} className="glyphicon glyphicon-play player-button"/>
                </div>
                <h4 className="title">{this.props.playlist.title}</h4>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistAlbumButton);
