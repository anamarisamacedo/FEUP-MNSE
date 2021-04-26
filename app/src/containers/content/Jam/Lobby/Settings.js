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
      jamTitle: "",
      turnDuration: 60,
      instruments: [],
      bpm: 100,
    };

    this.handleChangeJamTitle = this.handleChangeJamTitle.bind(this);
    this.handleChangeTurnTime = this.handleChangeTurnTime.bind(this);
    this.handleChangeInstruments = this.handleChangeInstruments.bind(this);
    this.handleChangeBPM = this.handleChangeBPM.bind(this);
  }

  handleChangeJamTitle(event) {
    this.setState({ jamTitle: event.target.value });
    this.props.onSetSettings(
      this.state.jamTitle,
      this.state.turnDuration,
      this.state.instruments,
      this.state.bpm
    );
  }

  handleChangeTurnTime(event) {
    this.setState({ turnDuration: event.target.value });
    this.props.onSetSettings(
      this.state.jamTitle,
      this.state.turnDuration,
      this.state.instruments,
      this.state.bpm
    );
  }

  handleChangeInstruments(event) {
    this.setState({ instruments: event.target.value });
    this.props.onSetSettings(
      this.state.jamTitle,
      this.state.turnDuration,
      this.state.instruments,
      this.state.bpm
    );
  }

  handleChangeBPM(event) {
    this.setState({ bpm: event.target.value });
    this.props.onSetSettings(
      this.state.jamTitle,
      this.state.turnDuration,
      this.state.instruments,
      this.state.bpm
    );
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={{ marginTop: "20px" }}>
          How To Play
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "35px" }}>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Jam Title</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              variant="filled"
              value={this.state.jamTitle}
              onChange={this.handleChangeJamTitle}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="body1">Turn Time (sec)</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={this.state.turnDuration}
              onChange={this.handleChangeTurnTime}
              min={20}
              max={180}
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
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  onSetSettings: PropTypes.func,
};

Settings.defaultProps = {
  onSetSettings: () => {},
};

export default Settings;
