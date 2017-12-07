import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './PlaylistAlbumButton.css';

class PlaylistAlbumButton extends Component {

    constructor(props){
        super(props);
        this.navigateToPlaylist = this.navigateToPlaylist.bind(this);
        this.playPlaylist = this.playPlaylist.bind(this);
    }

    navigateToPlaylist(){
        alert('ja..')
    }

    playPlaylist(){

    }


    render() {
        return (
            <div className="playlistContainer">
                <img alt="playlist" className="playlistimg img-responsive img-rounded"
                    // src={this.props.playlist.img}
                     src={'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Halestorm2009albumcover.jpg/220px-Halestorm2009albumcover.jpg'}
                />
                <div className="overlay"> </div>
                <div className="buttonoverlay">
                    <p onClick={this.playPlaylist} className="glyphicon glyphicon-play player-button"/>
                </div>
                <h4 onClick={this.navigateToPlaylist}>
                    <a href={this.props.playlist.url}>{this.props.playlist.title}</a>
                </h4>

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
