import testSynth from './testSynth';
import testSynth2 from './testSynth2';
import testSynth3 from './testSynth3';
import fatSquare from './fatSquare';
import squareBass from './squareBass';
import sineTooth from './sineTooth';
import xylophone from './xylophone';
import distBass from './distBass';

const instruments = [];

// Set available notes for each instrument
testSynth.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
testSynth2.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
testSynth3.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
fatSquare.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
squareBass.notes = ['C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2'];
sineTooth.notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
xylophone.notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
distBass.notes = ['C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2'];

// Set instrument color
testSynth.color = '#26e06a';
testSynth2.color = '#3486eb';
testSynth3.color = '#cf03fc';
fatSquare.color = '#ff9e0d';
squareBass.color = '#0356fc';
sineTooth.color = '#ca4fff';
xylophone.color = '#b58465';
distBass.color = '#991539';

// Set instrument ID
testSynth.id = 'testSynth';
testSynth2.id = 'testSynth2';
testSynth3.id = 'testSynth3';
fatSquare.id = 'fatSquare';
squareBass.id = 'squareBass';
sineTooth.id = 'sineTooth';
xylophone.id = 'xylophone';
distBass.id = 'distBass';

// Set instrument name
testSynth.name = 'Test Synth';
testSynth2.name = 'Test Synth 2';
testSynth3.name = 'Test Synth 3';
fatSquare.name = 'Fat Square';
squareBass.name = 'Square Bass';
sineTooth.name = 'Sine Tooth';
xylophone.name = 'Xylophone';
distBass.name = 'Distorted Bass';

// Add instrument to list
instruments.testSynth = testSynth;
instruments.testSynth2 = testSynth2;
instruments.testSynth3 = testSynth3;
instruments.fatSquare = fatSquare;
instruments.squareBass = squareBass;
instruments.sineTooth = sineTooth;
instruments.xylophone = xylophone;
instruments.distBass = distBass;

export default instruments;
