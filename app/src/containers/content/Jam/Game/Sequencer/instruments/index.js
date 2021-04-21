import testSynth from './testSynth';
import testSynth2 from './testSynth2';
import testSynth3 from './testSynth3';

const instruments = [];

// Set available notes for each instrument
testSynth.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
testSynth2.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
testSynth3.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];

// Set instrument color
testSynth.color = '#26e06a';
testSynth2.color = '#3486eb';
testSynth3.color = '#cf03fc';

// Add instrument to list
instruments.testSynth = testSynth;
instruments.testSynth2 = testSynth2;
instruments.testSynth3 = testSynth3;

export default instruments;
