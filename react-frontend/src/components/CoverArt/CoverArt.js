import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './CoverArt.css';

class CoverArt extends Component {
    // constructor(props){
    //     super(props);
    //
    // }

    render() {
        // console.log('coverart:', this.props.currentSong.song_jpg);
        return (
            <div id="partial-coverart">
                <img id="cover-art" alt="coverart" className="img-responsive img-rounded cover-art"
                     src={this.props.currentSong.song_jpg}/>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        currentSong: state.current_song,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverArt);
