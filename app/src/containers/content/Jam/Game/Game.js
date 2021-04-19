import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Panel from '../../../../components/Panel/Panel';
import Sequencer from './Sequencer/Sequencer';
import TopBar from './TopBar/TopBar';
import Sidebar from './Sidebar/Sidebar';
import BottomBar from './BottomBar/BottomBar';
import Connection from '../../../../utils/Connection';
import { withAppContext } from '../../../../utils/AppContext';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOwnTurn: false,
      currentMeasure: 0,
      currentInstrument: 'testSynth',
      song: [],
    };

    this.handleGridUpdate = this.handleGridUpdate.bind(this);
  }

  componentDidMount() {
    const conn = this.props.connection;

    conn.socket.on('next-turn', (turn) => {
      console.log('next-turn');
      console.log(turn);
      this.setState({ currentMeasure: turn.measure, currentInstrument: turn.instrument });

      if (turn.player === this.props.username) {
        this.setState({ isOwnTurn: true });
      } else this.setState({ isOwnTurn: false });
    });

    conn.socket.on('req-song-data', (username) => {
      console.log(`received req-song-data ${username}`);

      if (username === this.props.username) {
        console.log('sending song data');
        console.log(this.state.song);
        conn.socket.emit('song-data', this.state.song);
      }
    });

    conn.socket.on('song-data', (song) => {
      console.log('received song-data');
      console.log(song);
      this.setState({ song });
    });
  }

  handleGridUpdate(grid) {
    const { song } = this.state;

    song[this.state.currentMeasure] = grid;

    this.setState({ song });
  }

  render() {
    if (!this.state.isOwnTurn) return <span>Waiting for turn...</span>;

    return (
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} style={{ height: '5vh' }}>
          <TopBar jamTitle="JamTitle" />
        </Grid>
        <Grid item xs={10} style={{ height: '80vh' }}>
          <Panel style={{ justifyContent: 'space-evenly' }}>
            <Sequencer
              instrumentId={this.state.currentInstrument}
              onUpdateGrid={this.handleGridUpdate}
              grid={this.state.song[this.state.currentMeasure]}
            />
          </Panel>
        </Grid>
        <Grid item xs={2} style={{ minHeight: '80vh' }}>
          <Panel>
            <Sidebar />
          </Panel>
        </Grid>
        <Grid item xs={12} style={{ height: '5vh' }}>
          <BottomBar />
        </Grid>
      </Grid>
    );
  }
}

Game.propTypes = {
  username: PropTypes.string.isRequired,
  connection: PropTypes.instanceOf(Connection).isRequired,
};

export default withAppContext(Game);
