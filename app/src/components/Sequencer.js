import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function Sequencer(props) {
  const GRID_LINE_WIDTH = 1;

  const cellWidth = props.gridWidth / props.nCols;
  const cellHeight = props.gridHeight / props.nRows;

  const canvasRef = useRef(null);

  const grid = Array(props.nRows)
    .fill()
    .map(() => Array(props.nCols).fill(false));

  function draw(canvas, ctx) {
    ctx.fillStyle = '#F4F2F3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < props.gridWidth + cellWidth; x += cellWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, props.gridHeight);
    }

    for (let y = 0; y < props.gridHeight + cellHeight; y += cellHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(props.gridWidth, y);
    }

    ctx.strokeStyle = '#06070E';
    ctx.lineWidth = GRID_LINE_WIDTH;
    ctx.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(canvas, context);
  }, []);

  function canvasCoordsToGridCoords(x, y) {
    const gridX = Math.floor(x / cellWidth);
    const gridY = Math.floor(y / cellHeight);

    return { gridX, gridY };
  }

  function fillCell(x, y, color) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const topLeft = { x: x * cellWidth, y: y * cellHeight };

    context.fillStyle = color;
    context.fillRect(
      topLeft.x + GRID_LINE_WIDTH,
      topLeft.y + GRID_LINE_WIDTH,
      cellWidth - GRID_LINE_WIDTH * 2,
      cellHeight - GRID_LINE_WIDTH * 2,
    );
  }

  function addNote(x, y) {
    fillCell(x, y, '#000000');
    grid[y][x] = true;
  }

  function removeNote(x, y) {
    fillCell(x, y, '#F4F2F3');
    grid[y][x] = false;
  }

  function handleClick(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { gridX, gridY } = canvasCoordsToGridCoords(x, y);

    if (grid[gridY][gridX]) removeNote(gridX, gridY);
    else addNote(gridX, gridY);

    console.log(`[${gridX},${gridY}]`);
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      width={props.gridWidth}
      height={props.gridHeight}
    />
  );
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
