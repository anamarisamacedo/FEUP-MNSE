import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import Typography from '@material-ui/core/Typography';
import logo from '../../../../logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
        <Grid container spacing={1} style={{ textAlign: 'center' }}>
          <Grid item xs={12} style={{ marginTop: '40px' }}>
            <img src={logo} alt="Logo" width='auto' height="60" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" styles={{ fontFamily: 'Galada' }}>
              Jam It!
            </Typography>
          </Grid>
        </Grid>
        <br />
        <form noValidate autoComplete="off">
          <Grid
            container
            spacing={4}
            style={{
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid item>
              <div>
                <Avatar
                  alt="Remy Sharp"
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  src="https://i.pravatar.cc/300"
                  style={{ width: '180px', height: '180px' }}
                />
              </div>
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
