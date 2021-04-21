import React from 'react';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Login from './Login/Login';
import Connection from '../../../utils/Connection';
import { AppContextProvider } from '../../../utils/AppContext';

class Jam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      connection: null,
      username: null,
      settings: {
        title: 'Jam 1',
        bpm: 80,
        measures: 2,
        turnDuration: 5,
      },
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
        <AppContextProvider username={this.state.username} connection={this.state.connection}>
          { this.state.hasStarted ? <Game settings={this.state.settings} /> : <Lobby /> }
        </AppContextProvider>
      );
    }

    return <Login onSetUsername={this.handleSetUsername} />;
  }
}

export default Jam;
