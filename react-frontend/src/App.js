import React, {Component} from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import Footer from "./containers/Footer/Footer";
import Player from "./components/Player/Player";
import Admin from "./containers/Admin/Admin";
import Artist from "./containers/Artist/Artist";
import Playlist from "./containers/Playlist/Playlist";
import User from "./containers/User/User";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";

class App extends Component {

    constructor(props) {
        super(props);
        this.state ={
            currentPage: "admin"
        };
        this.toggleView=this.toggleView.bind(this);
    }

    toggleView(newPage) {
        this.setState({
            currentPage: newPage
        });
    }

    render() {
        return (
            <div className="App">
                <div className="demo">
                    <div className="container ">
                        <Nav toggleView={this.toggleView.bind(this)}/>
                        {{
                            "main": (
                                <Main/>
                            ),
                            "login": (
                                <Login/>
                            ),
                            "admin": (
                                <Admin/>
                            ),
                            "artist": (
                                <Artist/>
                            ),
                            "playlist": (
                                <Playlist/>
                            ),
                            "user": (
                                <User/>
                            )
                        }[this.state.currentPage]}


                        <Player/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
