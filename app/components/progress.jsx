import React from "react";
import PropTypes from "prop-types";
import "./progress.less";
class Progress extends React.Component {
  static propTypes = {
    barColor: PropTypes.string
  };
  static defaultProps = {
    barColor: "#2f9842"
  };
  constructor(props) {
    super(props);
  }

  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    let progress =
      (e.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.clientWidth;
    console.log(progress);
    this.props.onProgressChange(progress);
  }
  render() {
    return (
      <div
        className="components-progress"
        ref="progressBar"
        onClick={this.changeProgress.bind(this)}
      >
        <div
          className="progress"
          style={{
            width: `${this.props.progress}% `,
            background: this.props.barColor
          }}
        />
      </div>
    );
  }
}

export default Progress;
