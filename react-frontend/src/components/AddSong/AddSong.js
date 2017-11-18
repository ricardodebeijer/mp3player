import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './AddSong.css';

class AddSong extends Component {
    constructor(props){
        super(props);
        this.getInfoForUrl = this.getInfoForUrl.bind(this);
        this.submitSong = this.submitSong.bind(this);
    }

    getInfoForUrl(){

    }

    submitSong(){

    }

    render() {
        return (
            <div>
                <p>Add Song</p>
                <div>
                    <input id="url" className="form-control search-modal-input" placeholder="Enter Url" name="url"/>
                    <span  className="glyphicon glyphicon-search search-modal-button" onClick={this.getInfoForUrl}/>
                </div>
                <input id="artist" className="form-control search-modal-input" placeholder="Enter Artist" type="text"
                       name="artist"/>
                <input id="title" className="form-control search-modal-input" placeholder="Enter Title" type="text"
                       name="title"/>
                <input type="submit" className="btn btn-primary search-modal-button" onClick={this.submitSong} value="Submit Info"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
