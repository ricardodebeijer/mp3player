import React, {Component} from 'react';
import './Nav.css';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        };
        this.callViewChange = this.callViewChange.bind(this);
        this.toggleAdmin = this.toggleAdmin.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.togglePlaylist = this.togglePlaylist.bind(this);
        this.toggleMain = this.toggleMain.bind(this);
        this.toggleLogout = this.toggleLogout.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
    }

    toggleAdmin() {
        this.callViewChange("admin")
    }

    toggleUser() {
        this.callViewChange("user")
    }

    togglePlaylist() {
        this.callViewChange("playlist")
    }

    toggleMain() {
        this.callViewChange("main")
    }

    toggleLogout() {
        this.setState({isLoggedIn: false});
        this.callViewChange("login")
    }

    toggleLogin() {
        this.setState({isLoggedIn: true});
        this.callViewChange("main")
    }

    callViewChange(newPage) {
        this.props.toggleView(newPage);
    }

    render() {
        return (
            <div className="navbar navbar-inverse navcolor">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand navlink" onClick={this.toggleMain}>mp3player</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {
                                this.state.isLoggedIn ? (
                                    [
                                        <li key={"navsearch"}>
                                            <a type="button" data-toggle="modal"
                                               data-target="#search-item">
                                                <span className="glyphicon glyphicon-search"/> Search
                                            </a>
                                        </li>,
                                        <li key={"navplaylist"}>
                                            <button type="button" className="navbuttonlink"
                                                    onClick={this.togglePlaylist}>
                                                <span className="glyphicon glyphicon-list"/> Playlist
                                            </button>
                                        </li>,
                                        <li key={"navadmin"}>
                                            <button type="l" className="navbuttonlink" onClick={this.toggleAdmin}>
                                                <span className="glyphicon glyphicon-wrench"/> Admin Dashboard
                                            </button>
                                        </li>]
                                ) : (<div/>)}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {
                                this.state.isLoggedIn ? (
                                    [
                                        <li key={"navusername"}>
                                            <button className="navbuttonlink rightnav" onClick={this.toggleUser}>
                                                <span className="glyphicon glyphicon-user"/> username
                                            </button>
                                        </li>,
                                        <li key={"navlogout"}>
                                            <button className="navbuttonlink rightnav" onClick={this.toggleLogout}>
                                                <span className="glyphicon glyphicon-log-out"/> Logout
                                            </button>
                                        </li>
                                    ]
                                ) : (
                                    <li>
                                        <button className="navbuttonlink" onClick={this.toggleLogin}>
                                            <span className="glyphicon glyphicon-log-in"/>
                                            Login
                                        </button>
                                    </li>
                                )
                            }


                        </ul>

                    </div>


                    <div className="modal fade" id="search-item" tabIndex="-1" role="dialog"
                         aria-labelledby="myModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body search-modal">
                                    <form id="search-form" method="post" action="#">
                                        <div className="form-group">
                                            <input id="search-input" name="search-input" type="text"
                                                   className="form-control search-modal-input"
                                                   placeholder="Search for song, artist, playlist or user!"/>
                                        </div>
                                        <button type="submit" className="btn btn-default search-modal-button" id="searchbtn">
                                            <span className="glyphicon glyphicon-search"/> Search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;
