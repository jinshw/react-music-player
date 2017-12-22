import React, { Component } from "react";
import "./cover.less";

class Cover extends Component {
  render() {
    return (
      <div>
        <div
          className="coverBox"
          style={{
            backgroundImage: `url(${this.props.bg.replace(/130/g, "550")})`
          }}
        />
        <div className="coverBg" />
      </div>
    );
  }
}
export default Cover;
