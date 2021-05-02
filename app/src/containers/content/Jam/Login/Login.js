import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../../../logo.png';

withStyles((theme) => ({
  badge: {
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      avatarKey: Math.random(),
    };

    this.setAvatar = this.setAvatar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleConfirm() {
    this.props.onSetUsername(this.state.username);
  }

  setAvatar() {
    this.setState({ avatarKey: Math.random() });
  }

  render() {
    return (
      <div>
        <Grid container spacing={1} style={{ textAlign: 'center' }}>
          <Grid item xs={12} style={{ marginTop: '40px' }}>
            <img src={logo} alt="Logo" width="auto" height="60" />
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
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={(
                    <IconButton color="primary">
                      <CachedIcon onClick={this.setAvatar} />
                    </IconButton>
                  )}
                >
                  <Avatar
                    key={this.state.avatarKey}
                    src="https://i.pravatar.cc/300"
                    style={{ width: '180px', height: '180px' }}
                  />
                </Badge>
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
                endIcon={<PlayArrowOutlinedIcon color="secondary" />}
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
