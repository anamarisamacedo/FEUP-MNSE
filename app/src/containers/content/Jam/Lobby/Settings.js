import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import instruments from '../Game/Sequencer/instruments';

function mapInstruments(instr) {
  const instrumentArr = [];

  for (const i of Object.values(instr)) {
    instrumentArr.push(i);
  }

  return instrumentArr;
}

const instrumentList = mapInstruments(instruments);

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 200,
    },
  },
};

const PrettoSlider = withStyles({
  root: {
    color: '#A7C6DA',
    height: 7,
    width: '220px',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#F4F2F3',
    border: '2px solid currentColor',
    borderColor: '#F4F2F3',
    marginTop: -7,
    marginLeft: -12,
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 7,
    borderRadius: 4,
  },
  rail: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F4F2F3',
  },
})(Slider);

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      bpm: 100,
      measures: 5,
      turnDuration: 60,
      instruments: [],
    };

    this.handleChangeJamTitle = this.handleChangeJamTitle.bind(this);
    this.handleChangeTurnTime = this.handleChangeTurnTime.bind(this);
    this.handleChangeInstruments = this.handleChangeInstruments.bind(this);
    this.handleChangeBPM = this.handleChangeBPM.bind(this);
    this.handleChangeMeasures = this.handleChangeMeasures.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.settings.jamTitle,
      bpm: this.props.settings.bpm,
      measures: this.props.settings.measures,
      turnDuration: this.props.settings.turnDuration,
      instruments: this.props.settings.instruments,
    });
  }

  handleChangeJamTitle(event) {
    const title = event.target.value;

    this.setState({ title });
    this.props.onSetSettings(
      title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments,
    );
  }

  handleChangeTurnTime(event) {
    const turnDuration = parseInt(event.target.value, 10);
    this.setState({ turnDuration });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      turnDuration,
      this.state.instruments,
    );
  }

  handleChangeInstruments(event) {
    const selectedInstruments = event.target.value;
    this.setState({ instruments: selectedInstruments });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      selectedInstruments,
    );
  }

  handleChangeBPM(event, newValue) {
    this.setState({ bpm: newValue });
    this.props.onSetSettings(
      this.state.title,
      newValue,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments,
    );
  }

  handleChangeMeasures(event) {
    const measures = parseInt(event.target.value, 10);
    this.setState({ measures });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      measures,
      this.state.turnDuration,
      this.state.instruments,
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={{ marginTop: '10px' }}>
          Settings
        </Typography>
        <Grid
          container
          spacing={this.props.leader ? 1 : 3}
          style={{ marginTop: '18px' }}
        >
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Jam Title</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="standard-required"
              value={this.state.jamTitle}
              onChange={this.handleChangeJamTitle}
              disabled={!this.props.leader}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Turn Duration (sec)</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.props.leader ? (
              <TextField
                id="standard-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                min={30}
                max={180}
                setp={10}
                onChange={this.handleChangeTurnTime}
              />
            ) : (
              <TextField value={this.state.turnDuration} disabled />
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Instruments</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl styles={{ width: 100, maxWidth: 100 }}>
              <InputLabel id="demo-mutiple-checkbox-label">
                Instruments
              </InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={this.state.instruments}
                onChange={this.handleChangeInstruments}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                style={{ width: '220px' }}
              >
                {instrumentList.map((instrument) => (
                  <MenuItem key={instrument.id} value={instrument.id}>
                    {this.props.leader ? (
                      <Checkbox
                        checked={
                          this.state.instruments.indexOf(instrument.id) > -1
                        }
                      />
                    ) : null}
                    <ListItemText
                      primary={instrument.name}
                      style={{ color: '#06070E' }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Bpm</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={this.state.bpm}
              onChange={this.handleChangeBPM}
              min={50}
              max={250}
              step={10}
              disabled={!this.props.leader}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Measures</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.props.leader ? (
              <TextField
                id="standard-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                min={1}
                max={10}
                onChange={this.handleChangeMeasures}
              />
            ) : (
              <TextField value={this.state.measures} disabled />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  onSetSettings: PropTypes.func,
  settings: PropTypes.shape({
    jamTitle: PropTypes.string,
    bpm: PropTypes.number,
    measures: PropTypes.number,
    turnDuration: PropTypes.number,
    instruments: PropTypes.arrayOf(PropTypes.string),
  }),
  leader: PropTypes.bool.isRequired,
};

Settings.defaultProps = {
  onSetSettings: () => {},
  settings: {
    jamTitle: '',
    bpm: 80,
    measures: 1,
    turnDuration: 60,
    instruments: [],
  },
};

export default Settings;
