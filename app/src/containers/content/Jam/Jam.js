import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import { cloneDeep } from 'lodash';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Login from './Login/Login';
import JamOver from './JamOver/JamOver';
import Connection from '../../../utils/Connection';
import { AppContextProvider } from '../../../utils/AppContext';
import jamService from '../../../services/jamService';

class Jam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      isOver: false,
      connection: null,
      username: null,
      settings: {
        title: 'Jam 1',
        bpm: 100,
        measures: 5,
        turnDuration: 60,
        instruments: [],
      },
      users: [],
    };

    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handleSetSettings = this.handleSetSettings.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      const jam = await jamService.findJam(id);

      this.setState({ settings: jam.settings });
    }
  }

  componentWillUnmount() {
    this.state.connection.end();
  }

  async handleSetUsername(username, picture) {
    const connection = await this.setupConnection(username, picture);
    this.setState({ connection, username });
  }

  handleSetSettings(newSettings) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const settings = cloneDeep(this.state.settings);
    Object.assign(settings, newSettings);
    this.setState({ settings });

    jamService.updateJamSettings(this.state.connection.jamId, settings);
  }

  async handlePlay() {
    await jamService.startJam(this.state.connection.jamId);
    this.setState({ hasStarted: true });
  }

  async setupConnection(username, picture) {
    let { id } = this.props.match.params;

    if (!id) {
      // Create default jam
      // eslint-disable-next-line react/no-access-state-in-setstate
      const jam = await jamService.createJam(username, picture, this.state.settings);
      this.setState({ users: jam.users });

      id = jam.id;
    }
    const connection = new Connection(username, picture, id);

    // The line below can be uncommented for testing purposes
    // this.setState({ hasStarted: true });

    connection.socket.on('start-jam', async () => {
      this.setState({ hasStarted: true });
    });

    connection.socket.on('jam-over', () => {
      this.setState({ isOver: true });
    });

    connection.socket.on('current-users', (users) => {
      this.setState({ users });
    });

    connection.socket.on('set-settings', (settings) => {
      this.setState({ settings });
    });

    return connection;
  }

  render() {
    let toRender;

    if (this.state.hasStarted) {
      toRender = <Game settings={this.state.settings} users={this.state.users} />;
    } else {
      toRender = (
        <Lobby
          leader={this.props.match.params.id ? null : this.state.username}
          users={this.state.users}
          onPlay={this.handlePlay}
          settings={this.state.settings}
          onSetSettings={debounce(this.handleSetSettings, 400)}
        />
      );
    }

    if (this.state.isOver) toRender = <JamOver />;

    if (this.state.username) {
      return (
        <AppContextProvider
          username={this.state.username}
          connection={this.state.connection}
        >
          { toRender }
        </AppContextProvider>
      );
    }

    return <Login onSetUsername={this.handleSetUsername} />;
  }
}

Jam.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Jam.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
};

export default withRouter(Jam);
