import * as Tone from 'tone';

const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

synth.set({
  oscillator: {
    type: 'sawtooth',
  },
  modulation: {
    type: 'sine',
  },
  modulationIndex: 10,
  envelope: {
    attack: 0.3,
    decay: 0.1,
    sustain: 1,
    release: 1,
  },
  modulationEnvelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.2,
    release: 0.5,
  },
});

export default synth;
