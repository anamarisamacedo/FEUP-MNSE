import * as Tone from 'tone';

const synth = new Tone.PolySynth().toDestination();

synth.set({
  oscillator: {
    type: 'fatsquare', // sine, square, triangle, sawtooth, fat*
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 1,
  },
});

export default synth;
