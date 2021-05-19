import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.MembraneSynth).toDestination();

export default synth;
