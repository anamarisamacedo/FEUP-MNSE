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

    // Graphical Properties
    // =====================================================

    this.GRID_LINE_WIDTH = 1;

    this.cellWidth = props.gridWidth / props.nCols;
    this.cellHeight = props.gridHeight / props.nRows;

    this.canvasRef = React.createRef();

    this.backgroundColor = '#F4F2F3';
    this.lineColor = '#06070E';
    this.playHeadColor = 'rgba(255, 0, 0, 0.5)';

    // =====================================================

    this.grid = this.props.song[this.props.currentMeasure] || (Array(props.nRows)
      .fill()
      .map(() => Array(props.nCols).fill().map(() => [])));

    this.subdivision = '8n';
    this.currentSequence = [];
    this.instrument = instruments[props.instrumentId];

    this.playingMeasure = 0;
    // Measure to reset to when playback stops
    this.RESET_MEASURE = this.props.currentMeasure;

    this.handleClick = this.handleClick.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.drawGrid();
    this.drawNotes(this.props.currentMeasure);
    this.updateSequence();

    Tone.Transport.bpm.value = this.props.bpm;
  }

  componentWillUnmount() {
    Tone.Transport.stop();
  }

  async handleClick(event) {
    // Prevent editing previous measures
    // if (this.playingMeasure !== this.props.currentMeasure) return;

    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate scale factors so that mouse position is correctly
    // determined when the canvas has been scalled using CSS
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const { gridX, gridY } = this.canvasCoordsToGridCoords(x * scaleX, y * scaleY);

    const grid = this.props.song[this.props.currentMeasure];
    if (!grid) return;

    const instrumentsInCell = grid[gridY][gridX];

    if (instrumentsInCell.length > 0
      && instrumentsInCell[instrumentsInCell.length - 1] === this.props.instrumentId) {
      this.removeNote(gridX, gridY);
    } else this.addNote(gridX, gridY);
  }

  async togglePlay() {
    if (this.state.isPlaying) {
      // Reset playing measure
      this.playingMeasure = this.RESET_MEASURE;

      Tone.Transport.stop();
      this.updateSequence();

      // Redraw grid to clear playhead
      this.drawNotes(this.playingMeasure);

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

    this.props.onUpdateGrid(this.grid);
  }

  playColumn(time, col) {
    Tone.Draw.schedule(() => {
      // Prevent updating playhead after playback has been stopped
      if (this.state.isPlaying) this.updatePlayHead(col);
    });

    const grid = this.props.song[this.playingMeasure];
    for (let row = 0; row < this.props.nRows; row += 1) {
      if (grid[row][col].length > 0) {
        const note = this.instrument.notes[this.props.nRows - row - 1];

        for (const instrumentId of grid[row][col]) {
          instruments[instrumentId].triggerAttackRelease(note, this.subdivision, time);
        }
      }
    }
  }

  updatePlayingMeasure(measure) {
    this.playingMeasure = measure;

    this.drawNotes(measure);
  }

  tick(time, col) {
    if (this.playingMeasure > this.props.currentMeasure) this.updatePlayingMeasure(0);

    this.playColumn(time, col);

    if (col === this.props.nCols - 1) this.updatePlayingMeasure(this.playingMeasure += 1);
  }

  drawGrid() {
    const canvas = this.canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < this.props.gridWidth + this.cellWidth; x += this.cellWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.props.gridHeight);
    }

    for (let y = 0; y < this.props.gridHeight + this.cellHeight; y += this.cellHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.props.gridWidth, y);
    }

    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.GRID_LINE_WIDTH;
    ctx.stroke();
  }

  clearGrid(measure) {
    for (let row = 0; row < this.props.nRows; row += 1) {
      for (let col = 0; col < this.props.nCols; col += 1) {
        this.fillCell(col, row, this.backgroundColor, measure);
      }
    }
  }

  drawNotes(measure) {
    this.clearGrid(measure);

    const grid = this.props.song[measure];

    if (!grid) return;

    for (let row = 0; row < this.props.nRows; row += 1) {
      for (let col = 0; col < this.props.nCols; col += 1) {
        if (grid[row][col].length > 0) this.fillCell(col, row, null, measure);
      }
    }
  }

  updatePlayHead(col) {
    this.drawNotes(this.playingMeasure);

    for (let row = 0; row < this.props.nRows; row += 1) {
      this.fillCell(col, row, this.playHeadColor, this.playingMeasure);
    }
  }

  canvasCoordsToGridCoords(x, y) {
    const gridX = Math.floor(x / this.cellWidth);
    const gridY = Math.floor(y / this.cellHeight);

    return { gridX, gridY };
  }

  fillCell(x, y, color, measure) {
    const canvas = this.canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    const grid = this.props.song[measure];
    if (!grid) return;

    const instrumentsInCell = grid[y][x];

    const topLeft = { x: x * this.cellWidth, y: y * this.cellHeight };

    if (instrumentsInCell.length > 0) {
      // When adding a note
      const rectHeight = this.cellHeight / instrumentsInCell.length;

      for (let i = 0; i < instrumentsInCell.length; i += 1) {
        const instrumentId = instrumentsInCell[i];

        context.fillStyle = instruments[instrumentId].color;

        context.fillRect(
          topLeft.x + this.GRID_LINE_WIDTH,
          topLeft.y + this.GRID_LINE_WIDTH + i * rectHeight,
          this.cellWidth - this.GRID_LINE_WIDTH * 2,
          rectHeight - this.GRID_LINE_WIDTH * 2,
        );
      }
    } else {
      // When removing a note or updating playhead
      context.fillStyle = color;

      context.fillRect(
        topLeft.x + this.GRID_LINE_WIDTH,
        topLeft.y + this.GRID_LINE_WIDTH,
        this.cellWidth - this.GRID_LINE_WIDTH * 2,
        this.cellHeight - this.GRID_LINE_WIDTH * 2,
      );
    }
  }

  addNote(x, y) {
    this.grid[y][x].push(this.props.instrumentId);

    this.updateSequence();

    this.fillCell(x, y, null, this.props.currentMeasure);
  }

  removeNote(x, y) {
    this.grid[y][x].pop();

    this.updateSequence();

    this.fillCell(x, y, this.backgroundColor, this.props.currentMeasure);
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
  onUpdateGrid: PropTypes.func,
  instrumentId: PropTypes.string.isRequired,
  song: PropTypes.arrayOf(PropTypes.array),
  currentMeasure: PropTypes.number.isRequired,
  bpm: PropTypes.number.isRequired,
};

Sequencer.defaultProps = {
  nRows: 12,
  nCols: 16,
  gridWidth: 1300,
  gridHeight: 600,
  onUpdateGrid: (() => {}),
  song: null,
};

export default Sequencer;
