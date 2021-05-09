/* eslint-disable indent */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Base64Downloader from 'react-base64-downloader';
import { create } from 'xmlbuilder';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import instruments from '../Game/Sequencer/instruments';
import { parseNote, getMatrixColumn } from '../../../../utils/utils';

function getInstrumentNotes(column, instrumentName) {
  // string representing the notes in each instrument for a given column
  const instrumentNotes = [];

  for (let i = 0; i < column.length; i += 1) {
    const instrumentsInCell = column[i];

    if (instrumentsInCell.includes(instrumentName)) {
      const note = instruments[instrumentName].notes[i];
      instrumentNotes.push(note);
    }
  }

  return instrumentNotes;
}

function generateXML(song, settings) {
  let root = create('score-partwise',
      { version: '1.0' },
      { pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN' },
      { sysID: 'http://www.musicxml.org/dtds/partwise.dtd' })
      .att('version', '3.1')
      .ele('work')
        .ele('work-title', settings.title).up()
      .up()
      .ele('part-list');

    for (const instrumentName of settings.instruments) {
      root = root.ele('score-part').att('id', instrumentName)
        .ele('part-name', instrumentName).up()
        // close score-part
      .up();
    }
    // close part-list
    root = root.up();

    for (const instrumentName of settings.instruments) {
      root = root.ele('part').att('id', instrumentName);

      for (let i = 0; i < song.length; i += 1) {
        const measure = song[i];

        root = root.ele('measure').att('number', (i + 1).toString());

        // add attributes on first measure only
        if (i === 0) {
          root = root.ele('attributes')
            .ele('divisions', '4').up()
            .ele('time')
              .ele('beats', '4').up()
              .ele('beat-type', '4').up()
            .up()
            .ele('clef')
              .ele('sign', 'F').up()
              .ele('line', '4').up()
            .up()
          .up();
        }

        let consecutiveRests = 0;

        for (let j = 0; j < measure[0].length; j += 1) {
          const col = getMatrixColumn(measure, j);
          // Notes for this voice, for this instrument
          const instrumentNotes = getInstrumentNotes(col, instrumentName);

          if (instrumentNotes.length > 0) {
            if (consecutiveRests > 0) {
              root = root.ele('note')
                .ele('rest').up()
                .ele('duration', consecutiveRests).up()
                .ele('type', '16th').up()
              .up();
              consecutiveRests = 0;
            }

            for (let k = 0; k < instrumentNotes.length; k += 1) {
              const note = instrumentNotes[k];
              root = root.ele('note');

              // create a chord if instrument is playing more than 1 note at a time
              if (instrumentNotes.length > 1 && k > 0) root = root.ele('chord').up();

              const { pitch, octave, semitones } = parseNote(note);

              root = root.ele('pitch')
                .ele('step', pitch).up();

              if (semitones) root = root.ele('alter', semitones).up();

              root = root.ele('octave', octave).up()
              // close pitch
              .up();
              // all notes are 16th notes
              root = root.ele('duration', '1').up()
              .ele('type', '16th').up()
              // close note
              .up();
            }
          } else {
            consecutiveRests += 1;
          }
        }
        // close measure
        root = root.up();
      }
      // close part
      root = root.up();
    }

    const xml = root.end({ pretty: true });

    return xml;
}

class JamOver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetMusicImage: '',
    };
  }

  componentDidMount() {
    const xml = generateXML(this.props.song, this.props.settings);
    this.displaySheetMusic(xml);
  }

  displaySheetMusic(xml) {
    const osmd = new OpenSheetMusicDisplay('osmdContainer');
    osmd.setOptions({
      backend: 'canvas',
      drawTitle: true,
      pageBackgroundColor: 'white',
    });
    osmd
      .load(xml)
      .then(() => {
        osmd.render();

        // Very hacky, NEVER do this
        const canvas = document.getElementById('osmdCanvasVexFlowBackendCanvas1');
        const image = canvas.toDataURL('image/png');

        this.setState({ sheetMusicImage: image });
      });
  }

  render() {
    return (
      <div>
        <Base64Downloader 
          base64={this.state.sheetMusicImage}
          downloadName={this.props.settings.title}
        >
          Click to download
        </Base64Downloader>
        <div id="osmdContainer" />
      </div>
      );
  }
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
