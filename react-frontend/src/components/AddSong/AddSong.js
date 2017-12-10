import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../../actions/index'
import './AddSong.css';

class AddSong extends Component {
    constructor(props) {
        super(props);
        this.getInfoForUrl = this.getInfoForUrl.bind(this);
        this.submitSong = this.submitSong.bind(this);
        this.state = {
            url: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    getInfoForUrl() {

    }

    submitSong() {
        this.props.addSong(this.state.url)
    }

    render() {
        let message;
        let added = this.props.song_added;
        console.log('waarde', added);
        if (added !== undefined) {
            console.log('waarde status', added);
            if (added.status !== undefined) {
                console.log('waarde status', added.status);
                message = 'Done';
            }
        }
        return (
            <div>
                <h2>Add Song</h2>
                {/*<div>*/}
                <input id="url" className="form-control search-modal-input" placeholder="Enter Url" name="url"
                       value={this.state.url} onChange={this.handleChange}/>
                {/*<span  className="glyphicon glyphicon-search search-modal-button" onClick={this.getInfoForUrl}/>*/}
                {/*</div>*/}
                {/*<input id="artist" className="form-control search-modal-input" placeholder="Enter Artist" type="text"*/}
                {/*name="artist"/>*/}
                {/*<input id="title" className="form-control search-modal-input" placeholder="Enter Title" type="text"*/}
                {/*name="title"/>*/}
                <input type="submit" className="btn btn-primary search-modal-button" onClick={this.submitSong}
                       value="Submit Info"/>
                {
                    message ? (<p>
                        {message}
                    </p>) : (<p>
                        First do the request
                    </p>)
                }
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return {
        song_added: state.song_added
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
