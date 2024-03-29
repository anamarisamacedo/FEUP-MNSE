import fatSquare from './fatSquare';
import squareBass from './squareBass';
import sineTooth from './sineTooth';
import xylophone from './xylophone';
import distBass from './distBass';
import kick from './kick';
import snare from './snare';

const instruments = [];

// Set available notes for each instrument
fatSquare.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
squareBass.notes = ['C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2'];
sineTooth.notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
xylophone.notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
distBass.notes = ['C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2'];
kick.notes = ['C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1'];
snare.notes = [];

// Set instrument color
fatSquare.color = '#ff9e0d';
squareBass.color = '#0356fc';
sineTooth.color = '#ca4fff';
xylophone.color = '#b58465';
distBass.color = '#991539';
kick.color = '#404040';
snare.color = '#fcef97';

// Set instrument ID
fatSquare.id = 'fatSquare';
squareBass.id = 'squareBass';
sineTooth.id = 'sineTooth';
xylophone.id = 'xylophone';
distBass.id = 'distBass';
kick.id = 'kick';
snare.id = 'snare';

// Set instrument name
fatSquare.name = 'Fat Square';
squareBass.name = 'Square Bass';
sineTooth.name = 'Sine Tooth';
xylophone.name = 'Xylophone';
distBass.name = 'Distorted Bass';
kick.name = 'Kick Drum';
snare.name = 'Snare Drum';

// Set instrument clef
fatSquare.clef = 'F';
squareBass.clef = 'F';
sineTooth.clef = 'G';
xylophone.clef = 'G';
distBass.clef = 'F';
kick.clef = 'F';
snare.clef = 'percussion';

// Add instrument to list
instruments.fatSquare = fatSquare;
instruments.squareBass = squareBass;
instruments.sineTooth = sineTooth;
instruments.xylophone = xylophone;
instruments.distBass = distBass;
instruments.kick = kick;
instruments.snare = snare;

export default instruments;
