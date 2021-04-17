import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

export default synth;
