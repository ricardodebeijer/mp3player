import React, {Component} from 'react';
import './User.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import PlaylistAlbumButton from "../../components/PlaylistAlbumButton/PlaylistAlbumButton";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        };
    }

    componentDidMount() {
        this.getUserPlaylists();
    }

    getUserPlaylists() {
        this.setState({searching: true});
        this.props.getUserPlaylists().then((res) => {
            this.setState({searching: false})
        });
    }

    playlists() {
        return Object.keys(this.props.user_playlists).map(key => this.props.user_playlists[key])
    }

    render() {
        return (
            <div>
                <h1>Your Username here</h1>
                <h3>Your playlists here</h3>
                {
                    !this.state.searching ? (
                        <div>
                            {
                                this.playlists().map((item, index) => {
                                    return (
                                        <div key={index} className="col-xs-3">
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);