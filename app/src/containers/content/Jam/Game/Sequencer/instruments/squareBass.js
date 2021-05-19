import * as Tone from 'tone';

const synth = new Tone.PolySynth().toDestination();

synth.set({
  oscillator: {
    type: 'square', // sine, square, triangle, sawtooth, fat*
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.5,
    release: 0.4,
  },
});

export default synth;
