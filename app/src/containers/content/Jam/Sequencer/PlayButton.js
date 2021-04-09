import React from 'react';
import PropTypes from 'prop-types';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick() {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying });

    this.props.onClick();
  }

  handleKeyDown(event) {
    if (event.code === 'Space') this.handleClick();
  }

  render() {
    return (
      <div onClick={this.handleClick} onKeyDown={this.handleKeyDown} role="button" tabIndex={0}>
        {
          this.state.isPlaying ? <PauseCircleFilledIcon color="primary" style={{ fontSize: '5em' }} />
            : <PlayCircleFilledIcon color="primary" style={{ fontSize: '5em' }} />
        }
      </div>
    );
  }
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PlayButton;
