import * as Tone from 'tone';

const dist = new Tone.Distortion(0.8).toDestination();
const synth = new Tone.PolySynth(Tone.FMSynth).connect(dist);

export default synth;
