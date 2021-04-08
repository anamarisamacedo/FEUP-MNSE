import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import instruments from './instruments';
import PlayButton from './PlayButton';

class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this.GRID_LINE_WIDTH = 1;

    this.cellWidth = props.gridWidth / props.nCols;
    this.cellHeight = props.gridHeight / props.nRows;

    this.canvasRef = React.createRef();

    this.grid = Array(props.nRows)
      .fill()
      .map(() => Array(props.nCols).fill(false));

    this.subdivision = '8n';
    this.currentSequence = [];
    this.currentInstrument = instruments.TestSynth;

    this.handleClick = this.handleClick.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.tick = this.tick.bind(this);
  }

  static setBpm(bpm) {
    Tone.Transport.bpm.value = bpm;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');

    this.draw(canvas, context);
  }

  async handleClick(event) {
    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { gridX, gridY } = this.canvasCoordsToGridCoords(x, y);

    if (this.grid[gridY][gridX]) this.removeNote(gridX, gridY);
    else this.addNote(gridX, gridY);
  }

  async togglePlay() {
    if (this.state.isPlaying) {
      Tone.Transport.stop();
      this.setState({ isPlaying: false });
    } else {
      await Tone.start();
      Tone.Transport.stop();
      Tone.Transport.start();

      this.setState({ isPlaying: true });
    }
  }

  updateSequence() {
    // clear previous sequence
    Tone.Transport.cancel();

    this.currentSequence = new Tone.Sequence(this.tick,
      [...Array(this.props.nCols).keys()], this.subdivision).start(0);
    this.currentSequence.loop = false;
  }

  tick(time, col) {
    Tone.Draw.schedule(() => {
      console.log('draw');
    });

    for (let row = 0; row < this.props.nRows; row += 1) {
      if (this.grid[row][col]) {
        const note = this.currentInstrument.notes[row];
        this.currentInstrument.instrument.triggerAttackRelease(note, this.subdivision, time);
      }
    }
  }

  draw(canvas, ctx) {
    ctx.fillStyle = '#F4F2F3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < this.props.gridWidth + this.cellWidth; x += this.cellWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.props.gridHeight);
    }

    for (let y = 0; y < this.props.gridHeight + this.cellHeight; y += this.cellHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.props.gridWidth, y);
    }

    ctx.strokeStyle = '#06070E';
    ctx.lineWidth = this.GRID_LINE_WIDTH;
    ctx.stroke();
  }

  canvasCoordsToGridCoords(x, y) {
    const gridX = Math.floor(x / this.cellWidth);
    const gridY = Math.floor(y / this.cellHeight);

    return { gridX, gridY };
  }

  fillCell(x, y, color) {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');

    const topLeft = { x: x * this.cellWidth, y: y * this.cellHeight };

    context.fillStyle = color;
    context.fillRect(
      topLeft.x + this.GRID_LINE_WIDTH,
      topLeft.y + this.GRID_LINE_WIDTH,
      this.cellWidth - this.GRID_LINE_WIDTH * 2,
      this.cellHeight - this.GRID_LINE_WIDTH * 2,
    );
  }

  addNote(x, y) {
    this.fillCell(x, y, '#000000');
    this.grid[y][x] = true;

    this.updateSequence();
  }

  removeNote(x, y) {
    this.fillCell(x, y, '#F4F2F3');
    this.grid[y][x] = false;

    this.updateSequence();
  }

  render() {
    return (
      <>
        <canvas
          ref={this.canvasRef}
          onClick={this.handleClick}
          style={{ width: '90%', height: '80%' }}
          width={this.props.gridWidth}
          height={this.props.gridHeight}
        />
        <PlayButton onClick={this.togglePlay} isPlaying={this.state.isPlaying} />
      </>
    );
  }
}

Sequencer.propTypes = {
  nRows: PropTypes.number,
  nCols: PropTypes.number,
  gridWidth: PropTypes.number,
  gridHeight: PropTypes.number,
};

Sequencer.defaultProps = {
  nRows: 12,
  nCols: 16,
  gridWidth: 1300,
  gridHeight: 600,
};

export default Sequencer;
