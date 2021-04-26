import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../utils/AppContext";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const instruments = ["Synth1", "Synth2", "Synth3"];
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
    color: "#A7C6DA",
    height: 7,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#F4F2F3",
    border: "2px solid currentColor",
    borderColor: "#F4F2F3",
    marginTop: -7,
    marginLeft: -12,
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 7,
    borderRadius: 4,
  },
  rail: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#F4F2F3",
  },
})(Slider);

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
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

  handleChangeJamTitle(event) {
    this.setState({ title: event.target.value });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments
    );
  }

  handleChangeTurnTime(event) {
    this.setState({ turnDuration: parseInt(event.target.value) });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments
    );
  }

  handleChangeInstruments(event) {
    this.setState({ instruments: event.target.value });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments
    );
  }

  handleChangeBPM(event, newValue) {
    this.setState({ bpm: newValue });
    console.log(newValue);
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments
    );
  }

  handleChangeMeasures(event) {
    this.setState({ measures: parseInt(event.target.value) });
    this.props.onSetSettings(
      this.state.title,
      this.state.bpm,
      this.state.measures,
      this.state.turnDuration,
      this.state.instruments
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={{ marginTop: "10px" }}>
          How To Play
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "18px" }}>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Jam Title</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="standard-required"
              value={this.state.jamTitle}
              onChange={this.handleChangeJamTitle}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Turn Duration (sec)</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {instruments.map((instrument) => (
                  <MenuItem key={instrument} value={instrument}>
                    <Checkbox
                      checked={this.state.instruments.indexOf(instrument) > -1}
                    />
                    <ListItemText primary={instrument} color="text" />
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
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Measures</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
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
};

Settings.defaultProps = {
  onSetSettings: () => {},
  settings: {
    jamTitle: "",
    bpm: 80,
    measures: 1,
    turnDuration: 60,
    instruments: [],
  },
};

export default Settings;
