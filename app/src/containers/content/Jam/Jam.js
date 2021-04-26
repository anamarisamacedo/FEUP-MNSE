import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Lobby from "./Lobby/Lobby";
import Game from "./Game/Game";
import Login from "./Login/Login";
import Connection from "../../../utils/Connection";
import { AppContextProvider } from "../../../utils/AppContext";
import jamService from "../../../services/jamService";

class Jam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false,
      connection: null,
      username: null,
      settings: {
        title: "Jam 1",
        bpm: 80,
        measures: 2,
        turnDuration: 5,
      },
      users: [],
    };

    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
  }

  componentWillUnmount() {
    this.state.connection.end();
  }

  async handleSetUsername(username) {
    const connection = await this.setupConnection(username);
    this.setState({ connection, username });
  }

  async handlePlay(hasStarted, jamTitle, turnDuration, instruments, bpm) {
    const measures = 2;
    this.setState({ settings: { jamTitle, bpm, measures, turnDuration } });
    console.log(this.state.settings)
    this.setState({ hasStarted });
  }

  async setupConnection(username) {
    let { id } = this.props.match.params;

    if (!id) {
      // Create default jam
      const jam = await jamService.createJam(username, this.state.settings);
      this.setState({ users: jam.users });

      id = jam.id;
    }
    const connection = new Connection(username, id);

    // The line below can be uncommented for testing purposes
    // this.setState({ hasStarted: true });

    connection.socket.on("start-jam", () => {
      console.log("received start-jam");

      this.setState({ hasStarted: true });
    });

    return connection;
  }

  render() {
    if (this.state.username) {
      return (
        <AppContextProvider
          username={this.state.username}
          connection={this.state.connection}
        >
          {this.state.hasStarted ? (
            <Game settings={this.state.settings} />
          ) : (
            <Lobby
              leader={this.props.match.params.id ? null : this.state.username}
              users={this.state.users}
              onPlay={this.handlePlay}
            />
          )}
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
