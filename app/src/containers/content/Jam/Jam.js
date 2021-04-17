import React from 'react';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Connection from '../../../utils/Connection';
import ConnectionContext from '../../../utils/ConnectionContext';

class Jam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      connection: null,
    };
  }

  componentDidMount() {
    const connection = this.setupConnection();
    this.setState({ connection });
  }

  componentWillUnmount() {
    this.state.connection.end();
  }

  setupConnection() {
    const connection = new Connection('user1', 'jam1');

    // The line below can be uncommented for testing purposes
    // this.setState({ hasStarted: true });

    connection.socket.on('start-jam', () => {
      console.log('received start-jam');

      this.setState({ hasStarted: true });
    });

    return connection;
  }

  render() {
    return (
      <ConnectionContext.Provider value={this.state.connection}>
        { this.state.hasStarted ? <Game /> : <Lobby /> }
      </ConnectionContext.Provider>
    );
  }
}

export default Jam;
