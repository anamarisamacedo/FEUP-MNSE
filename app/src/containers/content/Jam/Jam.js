import React from 'react';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Login from './Login/Login';
import Connection from '../../../utils/Connection';
import ConnectionContext from '../../../utils/ConnectionContext';
import UserContext from '../../../utils/UserContext';

class Jam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      connection: null,
      username: null,
    };

    this.handleSetUsername = this.handleSetUsername.bind(this);
  }

  componentWillUnmount() {
    this.state.connection.end();
  }

  handleSetUsername(username) {
    const connection = this.setupConnection(username);
    this.setState({ connection, username });
  }

  setupConnection(username) {
    const connection = new Connection(username, 'jam1');

    // The line below can be uncommented for testing purposes
    // this.setState({ hasStarted: true });

    connection.socket.on('start-jam', () => {
      console.log('received start-jam');

      this.setState({ hasStarted: true });
    });

    return connection;
  }

  render() {
    if (this.state.username) {
      return (
        <UserContext.Provider value={this.state.username}>
          <ConnectionContext.Provider value={this.state.connection}>
            { this.state.hasStarted ? <Game /> : <Lobby /> }
          </ConnectionContext.Provider>
        </UserContext.Provider>
      );
    }

    return <Login onSetUsername={this.handleSetUsername} />;
  }
}

export default Jam;
