import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

synth.set({
  harmonicity: 5,
  modulationIndex: 10,
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.1,
    release: 2,
  },
  modulation: {
    type: 'square',
  },
  modulationEnvelope: {
    attack: 0.002,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
});

export default synth;
