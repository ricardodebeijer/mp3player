import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './CurrentSliders.css';

class CurrentSliders extends Component {
    constructor(props) {
        super(props);
        this.seekChanged = this.seekChanged.bind(this);
        this.volumeChanged = this.volumeChanged.bind(this);
    }

    seekChanged(evt) {
        let newtime = evt.target.value;
        // console.log('seekChanged:', newtime);
        this.props.setTime(newtime);
    }

    volumeChanged(evt) {
        let newvolume = evt.target.value;
        // console.log('volumeChanged:', newvolume);
        this.props.setVolume(newvolume);
    }


    render() {
        return (
            <div className=" progress-bar-container ">
                <input
                    onChange={evt => this.seekChanged(evt)}
                    className="rangeslider"
                    type="range"
                    max={this.props.duration}
                    value={this.props.time}
                    min={0}/>
                <input
                    onChange={evt => this.volumeChanged(evt)}
                    className="rangeslider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"/>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        time: state.time,
        duration: state.duration
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSliders);
