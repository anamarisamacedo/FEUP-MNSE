import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <Button variant="contained" onClick={this.handleConfirm}>Confirm</Button>
      </form>
    );
  }
}

Login.propTypes = {
  onSetUsername: PropTypes.func,
};

Login.defaultProps = {
  onSetUsername: (() => {}),
};

export default Login;
