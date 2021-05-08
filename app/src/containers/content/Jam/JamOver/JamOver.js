/* eslint-disable indent */
/* eslint-disable newline-per-chained-call */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { create } from 'xmlbuilder';
import instruments from '../Game/Sequencer/instruments';
import { parseNote } from '../../../../utils/utils';

function getInstrumentNotes(line, instrumentName) {
  // string representing the notes in each instrument for this line (voice)
  const instrumentNotes = Array(line.length).fill('');

  for (let i = 0; i < line.length; i += 1) {
    const instrumentsInCell = line[i];

    if (instrumentsInCell.includes(instrumentName)) {
      const note = instruments[instrumentName].notes[i];
      instrumentNotes[i] = note;
    }
  }

  return instrumentNotes;
}

function JamOver(props) {
  useEffect(() => {
    let root = create('score-partwise',
      { version: '1.0' },
      { pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN' },
      { sysID: 'http://www.musicxml.org/dtds/partwise.dtd' })
      .att('vesion', '3.1').ele('part-list');

    for (const instrumentName of props.settings.instruments) {
      root = root.ele('score-part').att('id', instrumentName)
        .ele('part-name', instrumentName).up()
        // close score-part
      .up();
    }
    // close part-list
    root = root.up();

    for (const instrumentName of props.settings.instruments) {
      root = root.ele('part').att('id', instrumentName);

      for (let i = 0; i < props.song.length; i += 1) {
        const measure = props.song[i];

        root = root.ele('measure').att('number', (i + 1).toString())
          .ele('attributes')
            .ele('divisions', '4').up()
            .ele('time')
              .ele('beats', '4').up()
              .ele('beat-type', '4').up()
            .up()
            .ele('clef')
              .ele('sign', 'G').up()
              .ele('line', '2').up()
            .up()
          .up();

        for (const line of measure) {
          // Notes for this voice, for this instrument
          const instrumentNotes = getInstrumentNotes(line, instrumentName);

          for (const note of instrumentNotes) {
            root = root.ele('note');

            if (note) {
              const { pitch, octave } = parseNote(note);

              root = root.ele('pitch')
                .ele('step', pitch).up()
                // TODO: Separate pitch name from octave
                .ele('octave', octave).up()
              .up();
            } else {
                root = root.ele('rest').up();
            }
            // all notes all 16th notes
            root = root.ele('duration', '1').up()
            .ele('type', '16th').up()
            // close note
            .up();
          }
        }
        // close measure
        root = root.up();
      }
      // close part
      root = root.up();
    }

    const xml = root.end({ pretty: true });
    console.log(xml);
  }, []);

  return <div />;
}

JamOver.propTypes = {
  song: PropTypes.arrayOf(PropTypes.array).isRequired,
  settings: PropTypes.shape({
    title: PropTypes.string,
    bpm: PropTypes.number,
    measures: PropTypes.number,
    turnDuration: PropTypes.number,
    instruments: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JamOver;
