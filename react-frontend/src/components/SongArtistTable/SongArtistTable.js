import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './SongArtistTable.css';

class SongArtistTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        };
    }

    componentDidMount() {
        this.getAllSongs();
    }

    getAllSongs() {
        this.setState({searching: true});
        this.props.getAllSongs().then((res) => {
            this.setState({searching: false})
        });
    }

    songs() {
        return Object.keys(this.props.all_songs).map(key => this.props.all_songs[key])
    }

    render() {
        return (
            <div>
                <h2>All Artists with their Songs</h2>
                {
                    !this.state.searching ? (
                        <ul>
                            {
                                this.songs().map((item, index) => {
                                    return (
                                        <li key={index}>{item.title}</li>
                                    )
                                })
                            }
                        </ul>
                    ) : (
                        <p>Bezig met ophalen alle songs...</p>
                    )
                }
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        all_songs: state.all_songs
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SongArtistTable);
