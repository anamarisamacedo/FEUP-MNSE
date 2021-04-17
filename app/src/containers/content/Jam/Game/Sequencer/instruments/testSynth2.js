import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.AMSynth).toDestination();

export default synth;
