import React, {Component} from 'react';
import './Player.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions'
import CoverArt from "../CoverArt/CoverArt";
import CurrentInfo from "../CurrentInfo/CurrentInfo";
import CurrentSliders from "../CurrrentSliders/CurrentSliders";
import AudioControls from "../AudioControls/AudioControls";

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searching: false,
        };
    }

    componentDidMount() {
        this.getCurrentSong();
    }

    getCurrentSong() {
        this.setState({searching: true});
        this.props.getCurrentSong().then((res) => {
            this.setState({searching: false})
        });
    }


    render() {
        return (
            <div className="playerdiv">
                {
                    !this.state.searching && this.props.currentSong ? (
                        <div>
                            <div className="col-xs-5 col-lg-2">
                                <CoverArt/>
                            </div>
                            <div className="col-xs-7 col-lg-5">
                                <CurrentInfo/>
                            </div>
                            <div className="col-xs-12 col-lg-5">
                                <AudioControls/>
                            </div>
                            <div className="col-xs-12 col-lg-12">
                                <CurrentSliders/>
                            </div>
                        </div>
                    ) : (
                        <p>Laden...</p>
                    )
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
