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
      maxHeight: 224,
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

const DisabledPrettoSlider = withStyles({
  root: {
    color: '#A7C6DA',
    height: 7,
    width: '220px',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#F4F2F3',
    boxShadow: '0 2px 10px 0 rgba(114, 114, 114, 0.5)',
    border: '5px solid #ffffff',
    marginTop: -8,
    marginLeft: -12,
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% - 15px)',
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
      instruments: [],
    };

    this.handleChangeJamTitle = this.handleChangeJamTitle.bind(this);
    this.handleChangeTurnTime = this.handleChangeTurnTime.bind(this);
    this.handleChangeInstruments = this.handleChangeInstruments.bind(this);
    this.handleChangeBPM = this.handleChangeBPM.bind(this);
    this.handleChangeMeasures = this.handleChangeMeasures.bind(this);
  }

  handleChangeJamTitle(event) {
    const title = event.target.value;
    this.props.onSetSettings({ title });
  }

  handleChangeTurnTime(event) {
    const turnDuration = parseInt(event.target.value, 10);
    this.props.onSetSettings({ turnDuration });
  }

  handleChangeInstruments(event) {
    const selectedInstruments = event.target.value;

    this.setState({ instruments: selectedInstruments });
    this.props.onSetSettings({ instruments: selectedInstruments });
  }

  handleChangeBPM(event, newValue) {
    this.props.onSetSettings({ bpm: newValue });
  }

  handleChangeMeasures(event) {
    const measures = parseInt(event.target.value, 10);
    this.props.onSetSettings({ measures });
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
            {this.props.leader ? (
              <TextField
                required
                id="standard-required"
                onChange={this.handleChangeJamTitle}
              />
            ) : (
              <TextField value={this.props.settings.title} disabled />
            )}
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
                InputProps={{ inputProps: { min: 30, max: 180, step: 10 } }}
                onChange={this.handleChangeTurnTime}
              />
            ) : (
              <TextField value={this.props.settings.turnDuration} disabled />
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Instruments</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel id="demo-mutiple-checkbox-label">
                Instruments
              </InputLabel>
              {this.props.leader ? (
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
                      <Checkbox
                        checked={
                          this.state.instruments.indexOf(instrument.id) > -1
                        }
                      />
                      <ListItemText
                        primary={instrument.name}
                        style={{ color: '#06070E' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={this.props.settings.instruments}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  style={{ width: '220px' }}
                >
                  {instrumentList.map((instrument) => (
                    <MenuItem key={instrument.id} value={instrument.id}>
                      <ListItemText
                        primary={instrument.name}
                        style={{ color: '#06070E' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Bpm</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.props.leader ? (
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={this.props.settings.bpm || 0}
                onChange={this.handleChangeBPM}
                min={50}
                max={250}
                step={10}
              />
            ) : (
              <DisabledPrettoSlider
                valueLabelDisplay="on"
                aria-label="pretto slider"
                value={this.props.settings.bpm}
                min={50}
                max={250}
                disabled={!this.props.leader}
              />
            )}
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
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                onChange={this.handleChangeMeasures}
              />
            ) : (
              <TextField value={this.props.settings.measures} disabled />
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
    title: PropTypes.string,
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
    title: '',
    bpm: 100,
    measures: 5,
    turnDuration: 60,
    instruments: [],
  },
};

export default Settings;
