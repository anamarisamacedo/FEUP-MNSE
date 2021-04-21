import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import Typography from "@material-ui/core/Typography";
import logo from "../../../../logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleConfirm() {
    this.props.onSetUsername(this.state.username);
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <img src={logo} alt="Logo" width="55" height="70" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" styles={{ fontFamily: "Galada" }}>
              Jam It!
            </Typography>
          </Grid>
        </Grid>

        <form noValidate autoComplete="off">
          <Grid
            container
            spacing={3}
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12}>
              <Avatar
                alt="Remy Sharp"
                src="https://i.pravatar.cc/300"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Nickname"
                placeholder="Nickname"
                required
                variant="outlined"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                endIcon={<PlayArrowOutlinedIcon color="#A7C6DA" />}
                onClick={this.handleConfirm}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onSetUsername: PropTypes.func,
};

Login.defaultProps = {
  onSetUsername: () => {},
};

export default Login;