/* eslint-disable indent */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { triggerBase64Download } from 'react-base64-downloader';
import { create } from 'xmlbuilder';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import instruments from '../Game/Sequencer/instruments';
import { parseNote, getMatrixColumn } from '../../../../utils/utils';
import Players from '../Lobby/Players';
import Panel from '../../../../components/Panel/Panel';
import Sequencer from '../Game/Sequencer/Sequencer';

function getInstrumentNotes(column, instrumentId) {
  // string representing the notes in each instrument for a given column
  const instrumentNotes = [];

  for (let i = 0; i < column.length; i += 1) {
    const instrumentsInCell = column[i];

    if (instrumentsInCell.includes(instrumentId)) {
      const note = instruments[instrumentId].notes[i];
      instrumentNotes.push(note);
    }
  }

  return instrumentNotes;
}

function generateXML(song, settings, users) {
  let root = create('score-partwise',
      { version: '1.0' },
      { pubID: '-//Recordare//DTD MusicXML 3.1 Partwise//EN' },
      { sysID: 'http://www.musicxml.org/dtds/partwise.dtd' })
      .att('version', '3.1')
      .ele('work')
        .ele('work-title', settings.title).up()
      .up()
      .ele('part-list');

    for (const instrumentId of settings.instruments) {
      root = root.ele('score-part').att('id', instrumentId)
        .ele('part-name', instruments[instrumentId].name).up()
        // close score-part
      .up();
    }
    // close part-list
    root = root.up();

    for (const instrumentId of settings.instruments) {
      root = root.ele('part').att('id', instrumentId);

      for (let i = 0; i < song.length; i += 1) {
        const measure = song[i];

        root = root.ele('measure').att('number', (i + 1).toString());

        let line = null;

        switch (instruments[instrumentId].clef) {
          case 'F':
            line = '4';
            break;
          case 'G':
            line = '2';
            break;
          default:
            break;
        }

        // add attributes on first measure only
        if (i === 0) {
          root = root.ele('attributes')
            .ele('divisions', '4').up()
            .ele('time')
              .ele('beats', '4').up()
              .ele('beat-type', '4').up()
            .up()
            .ele('clef')
              .ele('sign', instruments[instrumentId].clef).up()
              .ele('line', line).up()
            .up()
          .up();
        }

        let consecutiveRests = 0;

        for (let j = 0; j < measure[0].length; j += 1) {
          const col = getMatrixColumn(measure, j);
          // Notes for this voice, for this instrument
          const instrumentNotes = getInstrumentNotes(col, instrumentId);

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

              // Currently only percussion instruments are monophonic so this is fine
              // TODO: add a type to each instrument and check if percussion based on that type
              if (instruments[instrumentId] instanceof Tone.PolySynth) {
                const { pitch, octave, semitones } = parseNote(note);

                root = root.ele('pitch')
                  .ele('step', pitch).up();

                if (semitones) root = root.ele('alter', semitones).up();

                root = root.ele('octave', octave).up()
                // close pitch
                .up();
              } else {
                root = root.ele('unpitched')
                  .ele('display-step', 'E').up()
                  .ele('display-octave', '4').up()
                .up();
              }
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
      exportFormat: 'image/png',
    };

    this.handleChangeExportFormat = this.handleChangeExportFormat.bind(this);
  }

  componentDidMount() {
    const xml = generateXML(this.props.song, this.props.settings, this.props.users);
    this.displaySheetMusic(xml);
  }

  handleChangeExportFormat(event) {
    this.setState({ exportFormat: event.target.value });
    this.updateSheetMusicImage(event.target.value);
  }

  updateSheetMusicImage(format) {
    // Very hacky, NEVER do this
    const canvas = document.getElementById('osmdCanvasVexFlowBackendCanvas1');

    const image = canvas.toDataURL(format);
    this.setState({ sheetMusicImage: image });
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

        this.updateSheetMusicImage(this.state.exportFormat);
      });
  }

  render() {
    if (!this.props.song) return <div />;

    return (
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={2} style={{ minHeight: '80vh' }}>
          <Panel>
            <Players users={this.props.users} />
          </Panel>
        </Grid>
        <Grid item xs={8} style={{ height: '80vh' }}>
          <Panel style={{ justifyContent: 'space-evenly' }}>
            <Sequencer
              // dummy instrument
              instrumentId="fatSquare"
              song={this.props.song}
              currentMeasure={this.props.settings.measures - 1}
              resetMeasure={0}
              totalMeasures={this.props.settings.measures}
              bpm={this.props.settings.bpm}
            />
          </Panel>
        </Grid>
        <Grid item xs={2} style={{ minHeight: '80vh' }}>
          <Panel>
            <div style={{ fontWeight: 'bold', marginTop: '2vh', marginBottom: '2vh' }}>
              Export Sheet Music
            </div>
            <InputLabel id="selectExportFormat" style={{ color: 'white ' }}>Format</InputLabel>
            <Select
              labelId="selectExportFormat"
              style={{ marginBottom: '2vh' }}
              value={this.state.exportFormat}
              onChange={this.handleChangeExportFormat}
            >
              <MenuItem style={{ color: 'black' }} value="image/png">.png</MenuItem>
              <MenuItem style={{ color: 'black' }} value="image/jpeg">.jpeg</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => triggerBase64Download(
              this.state.sheetMusicImage, this.props.settings.title,
            )}
            >
              Export
            </Button>
          </Panel>
        </Grid>
        <Grid item xs={12} style={{ minHeight: '10vh' }} />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <div id="osmdContainer" />
        </Grid>
      </Grid>
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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      picture: PropTypes.picture,
    }),
  ).isRequired,
};

export default JamOver;
