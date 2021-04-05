import React, { useRef, useEffect } from 'react';

function Sequencer(props) {
  const DEFAULT_N_ROWS = 12;
  const DEFAULT_N_COLS = 16;
  const DEFAULT_GRID_WIDTH = 1300;
  const DEFAULT_GRID_HEIGHT = 600;
  const GRID_LINE_WIDTH = 1;

  const nRows = props.nRows ? props.nRows : DEFAULT_N_ROWS;
  const nCols = props.nCols ? props.nCols : DEFAULT_N_COLS;

  const gridWidth = props.gridWidth ? props.gridWidth : DEFAULT_GRID_WIDTH;
  const gridHeight = props.gridHeight ? props.gridHeight : DEFAULT_GRID_HEIGHT;

  const cellWidth = gridWidth / nCols;
  const cellHeight = gridHeight / nRows;

  const canvasRef = useRef(null);

  const grid = Array(nRows)
    .fill()
    .map(() => Array(nCols).fill(false));

  function draw(canvas, ctx) {
    ctx.fillStyle = '#F4F2F3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < gridWidth + cellWidth; x += cellWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gridHeight);
    }

    for (let y = 0; y < gridHeight + cellHeight; y += cellHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(gridWidth, y);
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

  function fillCell(x, y, color) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const topLeft = { x: x * cellWidth, y: y * cellHeight };

    context.fillStyle = color;
    context.fillRect(
      topLeft.x + GRID_LINE_WIDTH,
      topLeft.y + GRID_LINE_WIDTH,
      cellWidth - GRID_LINE_WIDTH * 2,
      cellHeight - GRID_LINE_WIDTH * 2
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

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      width={gridWidth}
      height={gridHeight}
    ></canvas>
  );
}

export default Sequencer;
