import React, {Component} from 'react';
import './App.css';
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import Player from "./Player/Player";
import Admin from "./Admin/Admin";
import Artist from "./Artist/Artist";
import Playlist from "./Playlist/Playlist";
import User from "./User/User";
import Main from "./Main/Main";
import Login from "./Login/Login";

class App extends Component {

    constructor(props) {
        super(props);
        this.state ={
            currentPage: "main"
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
