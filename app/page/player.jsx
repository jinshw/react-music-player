import React from "react";
import { Link } from "react-router";
import Pubsub from "pubsub-js";
import Progress from "../components/progress.jsx";
import Cover from "../components/cover.jsx";
import "./player.less";
let duration = null;
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // define this.state in constructor
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: "",
      playMode: "cycle",
      iconRepeatStyle: "repeat-cycle"
    };
  }
  componentDidMount() {
    $("#player").bind($.jPlayer.event.timeupdate, e => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(
          duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)
        )
      });
    });
  }

  componentWillUnmount() {
    $("#player").unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(progress) {
    $("#player").jPlayer("play", duration * progress);
  }
  changeVolumeHanler(progress) {
    $("#player").jPlayer("volume", progress);
  }
  play() {
    if (this.state.isPlay) {
      $("#player").jPlayer("pause");
    } else {
      $("#player").jPlayer("play");
    }
    this.setState({
      isPlay: !this.state.isPlay
    });
  }
  playPrev() {
    Pubsub.publish("PLAY_PREV");
  }
  playNext() {
    Pubsub.publish("PLAY_NEXT");
  }
  formatTime(time) {
    time = Math.floor(time);
    let miniutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${miniutes}:${seconds}`;
  }
  changeMode() {
    let _playMode = null;
    if (this.state.playMode == "cycle") {
      _playMode = "once";
      this.setState({
        playMode: "once",
        iconRepeatStyle: "repeat-once"
      });
    } else if (this.state.playMode == "once") {
      _playMode = "random";
      this.setState({
        playMode: "random",
        iconRepeatStyle: "repeat-random"
      });
    } else {
      _playMode = "cycle";
      this.setState({
        playMode: "cycle",
        iconRepeatStyle: "repeat-cycle"
      });
    }
    Pubsub.publish("CHANGE_MODE", _playMode);
  }

  render() {
    return (
      <div>
        <Cover bg={this.props.currentMusicItem.cover} />
        <div className="player-page">
          <div className="player-page">
            <h1 className="caption">
              <Link to="/list">我的私人音乐坊</Link>
            </h1>
            <div className="mt20 row">
              <div className="controll-wrapper">
                <h2 className="music-title">
                  {this.props.currentMusicItem.title}
                </h2>
                <h3 className="music-artist mt10">
                  {this.props.currentMusicItem.artist}
                </h3>
                <div className="row mt20">
                  <div className="volume-container">
                    <i
                      className="icon-volume rt"
                      style={{ top: 5, left: -5 }}
                    />
                    <div className="volume-wrapper">
                      <Progress
                        progress={this.state.volume}
                        barColor="red"
                        onProgressChange={this.changeVolumeHanler}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ height: 10, lineHeight: "10px" }}>
                  <Progress
                    progress={this.state.progress}
                    onProgressChange={this.progressChangeHandler.bind(this)}
                  />
                  <div className="left-time -col-auto">
                    -{this.state.leftTime}
                  </div>
                </div>
                <div className="mt35 row">
                  <div>
                    <i className="icon prev" onClick={this.playPrev} />
                    <i
                      className={`icon ml20 ${
                        this.state.isPlay ? "pause" : "play"
                      }`}
                      onClick={this.play.bind(this)}
                    />
                    <i className="icon next ml20" onClick={this.playNext} />
                  </div>
                  <div className="-col-auto">
                    <i
                      className={`icon ${this.state.iconRepeatStyle} `}
                      onClick={this.changeMode.bind(this)}
                    />
                  </div>
                </div>
              </div>
              <div className="-col-auto cover">
                <img
                  src={this.props.currentMusicItem.cover}
                  alt={this.props.currentMusicItem.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
