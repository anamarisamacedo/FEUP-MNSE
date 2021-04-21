import React from 'react';
import PropTypes from 'prop-types';
import Connection from '../../../../utils/Connection';
import { withAppContext } from '../../../../utils/AppContext';

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlayers: [],
    };
  }

  componentDidMount() {
    console.log(this.props.connection);
    console.log(this.props.username);
  }

  render() {
    return (
      <span>Lobby</span>
    );
  }
}

Lobby.propTypes = {
  username: PropTypes.string.isRequired,
  connection: PropTypes.instanceOf(Connection).isRequired,
};

export default withAppContext(Lobby);
