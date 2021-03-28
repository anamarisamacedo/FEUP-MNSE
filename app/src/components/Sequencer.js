import React, { useRef, useEffect } from 'react'

function Sequencer() {
  const GRID_WIDTH = 1000;
  const GRID_HEIGHT = 600;
  const CELL_WIDTH = 50;
  const CELL_HEIGHT = 30;

  const canvasRef = useRef(null);

  const draw = ctx => {
    for (let x = 0; x < GRID_WIDTH + CELL_WIDTH; x+=CELL_WIDTH) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GRID_HEIGHT);
    }

    for (let y = 0; y < GRID_HEIGHT + CELL_HEIGHT; y+=CELL_HEIGHT) {
      ctx.moveTo(0, y);
      ctx.lineTo(GRID_WIDTH, y);
    }

    ctx.strokeStyle = '#ffff'
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context);
  }, [])

  const canvasCoordsToGridCoords = (x, y) => {
    const gridX = Math.floor(x / CELL_WIDTH);
    const gridY = Math.floor(y / CELL_HEIGHT);

    return { gridX, gridY };
  }

  const handleClick = event => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { gridX, gridY } = canvasCoordsToGridCoords(x, y);

    console.log(`[${gridX},${gridY}]`);
  }

  return <canvas ref={canvasRef} onClick={handleClick} width={GRID_WIDTH} height={GRID_HEIGHT}></canvas>;
}

export default Sequencer;