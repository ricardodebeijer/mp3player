import React, {Component} from 'react';
import './Admin.css';
import AddSong from "../../components/AddSong/AddSong";
import SongArtistTable from "../../components/SongArtistTable/SongArtistTable";

class Admin extends Component {
    render() {
        return (
            <div>
                <h1>Admin pagina</h1>
                <AddSong/>
                <SongArtistTable/>
            </div>
        );
    }
}

export default Admin;
