import React, {Component} from 'react';
import './Playlist.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        };
    }

    componentDidMount() {
        this.getSelectedPlaylist();
    }

    getSelectedPlaylist(id) {
        // this.setState({searching: true});
        // this.props.getUserPlaylists(id).then((res) => {
        //     this.setState({searching: false})
        // });
    }

    render() {
        // let playlist = this.props.selected_playlist;
        return (
            <div>
                <h1>Selected Playlist:</h1>
                <p>

                </p>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        user_playlists: state.user_playlists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
