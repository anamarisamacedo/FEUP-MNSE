import testSynth from './testSynth';

const instruments = [];

// Set available notes for each instrument
testSynth.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];

// Set instrument color
testSynth.color = '#26e06a';

// Add instrument to list
instruments.testSynth = testSynth;

export default instruments;