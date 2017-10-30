import React, {Component} from 'react';
import './Player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.btnBack = this.btnBack.bind(this);
        this.btn10sb = this.btn10sb.bind(this);
        this.btnPlay = this.btnPlay.bind(this);
        this.btnPause = this.btnPause.bind(this);
        this.btn10sf = this.btn10sf.bind(this);
        this.btnForward = this.btnForward.bind(this);
        this.btnArtist = this.btnArtist.bind(this);
        this.togglePlayPause = this.togglePlayPause.bind(this);
        this.toMinutes = this.toMinutes.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
        this.onDurationChanged = this.onDurationChanged.bind(this);
        this.onTimeChanged = this.onTimeChanged.bind(this);
        this.playerEnded = this.playerEnded.bind(this);
        this.setupSong = this.setupSong.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.setDurationTime = this.setDurationTime.bind(this);
        this.seekChanged = this.seekChanged.bind(this);
        this.volumeChanged = this.volumeChanged.bind(this);
        this.state = {
            isPlaying: false,
            time: 0,
            duration: 0,
            volume: 0,
            timeFormatted: "",
            durationFormatted: "",
            currentSong: {
                user: "http://localhost:8000/api/users/1/",
                playlist: "http://localhost:8000/api/playlist/1/",
                song: "http://localhost:8000/api/song/12/",
                last_time: 155,
                artist_name: "Two Steps From Hell",
                song_title: "Kronos",
                song_jpg: "http://localhost:8000/music/518b434c5b4e5eb366427ab185d3fa9f/e2a16c6503ba631d753dd0071787ab05.jpg",
                song_mp3: "http://localhost:8000/music/518b434c5b4e5eb366427ab185d3fa9f/e2a16c6503ba631d753dd0071787ab05.mp3"
            }
        };
    }

    componentDidMount() {
        this.setupSong()
    }

    setupSong() {
        if (this.state.time === 0) {
            this.setCurrentTime(this.state.time)
        }

    }

    setCurrentTime(value) {
        let time = this.toMinutes(value);
        this.setState({timeFormatted: time});
    }

    setDurationTime(value) {
        let duration = this.toMinutes(value);
        this.setState({durationFormatted: duration});
    }

    seekChanged(evt) {
        let newtime = evt.target.value;
        console.log('set new time: ' + newtime);
        this.audioplayer.currentTime = newtime;
    }

    volumeChanged(evt) {
        let newvolume = evt.target.value;
        console.log('set new volume: ' + newvolume);
        this.setState({volume: newvolume});
        this.audioplayer.volume = newvolume;
    }

    onTimeChanged(evt) {
        this.updateTime(evt.target.currentTime);
    }

    onDurationChanged(evt) {
        this.updateDuration(evt.target.duration);
    }

    updateTime(time) {
        this.setCurrentTime(time);
        this.setState({time: time});
    }

    updateDuration(duration) {
        this.setDurationTime(duration);
        this.setState({duration: duration});
    }

    playerEnded(e) {
        console.log(e);
        alert('ended')
    }


    setVolume(value) {
        var volume = value / 100;
        localStorage.setItem("user_volume", value);
        this.audioplayer.volume = volume;
    }


    toMinutes(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        let final = minutes + ':' + seconds;

        return final.toString();
    }


    togglePlayPause() {
        let playing = this.state.isPlaying;
        if (!playing) {
            this.audioplayer.play()
        } else {
            this.audioplayer.pause()
        }
        this.setState({isPlaying: !playing});
    }


    btnBack() {

    }

    btn10sb() {

    }

    btnPlay() {
        this.togglePlayPause()
    }

    btnPause() {
        this.togglePlayPause()
    }

    btn10sf() {

    }

    btnForward() {

    }

    btnArtist() {

    }

    render() {
        return (
            <div className="playerdiv">
                <div id="partial-coverart" className="col-xs-5 col-lg-2">
                    <img id="cover-art" alt="coverart" className="img-responsive img-rounded cover-art"
                         src={this.state.currentSong.song_jpg}/>
                </div>
                <div className="col-xs-7 col-lg-5">
                    <b id="title-name">{this.state.currentSong.song_title}</b> <br/>
                    <button id="artist-name" onClick={this.btnArtist}
                            className="navbuttonlink">{this.state.currentSong.artist_name}</button>
                    <br/>
                    <span>
                        {this.state.timeFormatted}
                    </span>
                    <span>/</span>
                    <span>
                        {this.state.durationFormatted}
                    </span>
                </div>

                <div className="col-xs-12 col-lg-5">
                    {/*AUDIO TAG below*/}

                    <audio
                        id='audioplayer'
                        ref={(input) => {
                            this.audioplayer = input;
                        }}
                        preload='auto'
                        onTimeUpdate={evt => this.onTimeChanged(evt)}
                        onDurationChange={evt => this.onDurationChanged(evt)}
                        onEnded={evt => this.playerEnded(evt)}
                        src={this.state.currentSong.song_mp3}
                    />

                    {/*AUDIO TAG above*/}

                    <p onClick={this.btnBack} className="glyphicon glyphicon-step-backward player-button"/>
                    <p onClick={this.btn10sb} className="glyphicon glyphicon-backward player-button"/>
                    {
                        !this.state.isPlaying ? (
                            <p onClick={this.btnPlay} ref={(input) => {
                                this.playbtnref = input;
                            }}
                               className="glyphicon glyphicon-play player-button"/>
                        ) : (
                            <p onClick={this.btnPause} ref={(input) => {
                                this.pausebtnref = input;
                            }}
                               className="glyphicon glyphicon-pause player-button"/>
                        )
                    }

                    <p onClick={this.btn10sf} className="glyphicon glyphicon-forward player-button"/>
                    <p onClick={this.btnForward} className="glyphicon glyphicon-step-forward player-button"/>
                </div>

                <div className="col-xs-12 col-lg-12 progress-bar-container ">
                    <input
                        onChange={evt => this.seekChanged(evt)}
                        className="rangeslider"
                        type="range"
                        max={this.state.duration}
                        value={this.state.time}
                        min={0}/>
                    <input
                        onChange={evt => this.volumeChanged(evt)}
                        className="rangeslider"
                        type="range"
                        min="0"
                        max="100"
                        step="1"/>
                </div>
            </div>
        );
    }
}

export default Player;
