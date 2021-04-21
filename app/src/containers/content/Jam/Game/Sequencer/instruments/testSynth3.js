import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.MetalSynth).toDestination();

export default synth;
