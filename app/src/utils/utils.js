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
  const pitchRegex = /[A-G][#b]*/;
  const octaveRegex = /[0-8]/;

  const pitch = note.match(pitchRegex)[0];
  const octave = note.match(octaveRegex)[0];

  return { pitch, octave };
}

export {
  formatSeconds,
  parseNote,
};
