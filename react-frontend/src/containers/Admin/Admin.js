import React, {Component} from 'react';
import './Admin.css';
import AddSong from "../../components/AddSong/AddSong";

class Admin extends Component {
    render() {
        return (
            <div>
                <h1>Admin pagina</h1>
                <AddSong/>
            </div>
        );
    }
}

export default Admin;
