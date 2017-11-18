import React, {Component} from 'react';
import './Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import PlaylistAlbumButton from "../../components/PlaylistAlbumButton/PlaylistAlbumButton";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        };
    }

    componentDidMount() {
        this.getRecentPlaylists();
    }

    getRecentPlaylists() {
        this.setState({searching: true});
        this.props.getUserPlaylists().then((res) => {
            this.setState({searching: false})
        });
    }

    render() {
        let playlists = this.props.user_playlists;
        console.log('playlists:', playlists);
        return (
            <div>
                <h1>Recently played/check out:</h1>

                {
                    playlists.length > 0 ? (
                        <div>
                            {
                                playlists.map(function (item) {
                                    return (
                                        <div key={item} className="col-xs-3">
                                            <PlaylistAlbumButton playlist={item}/>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    ) : (
                        <p>Bezig met ophalen playlists...</p>
                    )
                }
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        user_playlists: state.user_playlists,
        currentSong: state.current_song
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
