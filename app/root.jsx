import React from "react";
import { hashHistory, Router, Route, IndexRoute } from "react-router";
import Header from "./components/header.jsx";
import Player from "./page/player.jsx";
import MusicList from "./page/musiclist.jsx";
import Progress from "./components/progress.jsx";
import { MUSIC_LIST } from "./config/musiclist.js";
import Pubsub from "pubsub-js";

// let duration = null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      playMode: "cycle"
    };
  }
  playMusic(musicItem) {
    $("#player")
      .jPlayer("setMedia", {
        mp3: musicItem.file
      })
      .jPlayer("play");

    this.setState({
      currentMusicItem: musicItem
    });
  }
  playNext(type = "next") {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if (this.state.playMode == "cycle") {
      if (type == "next") {
        newIndex = (index + 1) % musicListLength;
      } else {
        newIndex = (index - 1 + musicListLength) % musicListLength;
      }
    } else if (this.state.playMode == "once") {
      newIndex = index;
    } else {
      newIndex = parseInt(musicListLength * Math.random());
    }

    this.playMusic(this.state.musicList[newIndex]);
  }
  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }

  componentDidMount() {
    $("#player").jPlayer({
      supplied: "mp3",
      wmode: "window"
    });
    this.playMusic(this.state.currentMusicItem);
    $("#player").bind($.jPlayer.event.ended, e => {
      this.playNext();
    });
    Pubsub.subscribe("DELETE_MUSIC", (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      });
    });

    Pubsub.subscribe("PLAY_MUSIC", (msg, musicItem) => {
      this.playMusic(musicItem);
    });
    Pubsub.subscribe("PLAY_PREV", (msg, musicItem) => {
      this.playNext("prev");
    });
    Pubsub.subscribe("PLAY_NEXT", (msg, musicItem) => {
      this.playNext("next");
    });
    Pubsub.subscribe("CHANGE_MODE", (msg, playMode) => {
      console.log(playMode);
      this.setState({
        playMode: playMode
      });
    });

    // $("#player").bind($.jPlayer.event.timeupdate, e => {
    //   duration = e.jPlayer.status.duration;
    //   this.setState({
    //     progress: e.jPlayer.status.currentPercentAbsolute
    //   });
    // });
  }

  componentWillUnmount() {
    // $("#player").unbind($.jPlayer.event.timeupdate);
    Pubsub.unsubscribe("PLAY_MUSIC");
    Pubsub.unsubscribe("DELETE_MUSIC");
    Pubsub.unsubscribe("PLAY_PREV");
    Pubsub.unsubscribe("PLAY_NEXT");
    $("player").unbind($.jPlayer.event.ended);
  }

  progressChangeHandler(progress) {
    // $("#player").jPlayer("play", duration * progress);
  }

  render() {
    return (
      <div>
        <Header />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    );
  }
}

class Root extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player} />
          <Route path="/list" component={MusicList} />
        </Route>
      </Router>
    );
  }
}

export default Root;
