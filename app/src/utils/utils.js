/* eslint-disable import/prefer-default-export */
function formatSeconds(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Separates a note into pitch and octave
 * @param {String} note note name
 * @returns an object containing the pitch and octave
 */
function parseNote(note) {
  const pitchRegex = /[A-G]/;
  const accidentalRegex = /[#b]/;
  const octaveRegex = /[0-8]/;

  const pitch = note.match(pitchRegex)[0];
  const accidental = note.match(accidentalRegex);
  const octave = note.match(octaveRegex)[0];

  let semitones = 0;

  if (accidental) {
    if (accidental[0] === '#') semitones = 1;
    else semitones = -1;
  }

  return { pitch, octave, semitones };
}

function getMatrixColumn(matrix, colIndex) {
  return matrix.map((row) => row[colIndex]);
}

/**
 * Checks if a monophonic instrument note can be added to the grid since
 * only 1 note per column is allowed for these instruments
 * @param {*} matrix a matrix
 * @param {*} colIndex column index
 * @param {*} instrumentId id of the instrument
 * @returns true if instrumentId isn't found in the specified column, false otherwise
 */
function canAddNote(matrix, colIndex, instrumentId) {
  const col = getMatrixColumn(matrix, colIndex);

  for (const cell of col) {
    if (cell.includes(instrumentId)) return false;
  }

  return true;
}

export {
  formatSeconds,
  parseNote,
  getMatrixColumn,
  canAddNote,
};
