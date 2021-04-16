import React from 'react';
import Grid from '@material-ui/core/Grid';
import Panel from '../../../../components/Panel/Panel';
import Sequencer from './Sequencer/Sequencer';
import TopBar from './TopBar/TopBar';
import Sidebar from './Sidebar/Sidebar';
import BottomBar from './BottomBar/BottomBar';
import ConnectionContext from '../../../../utils/ConnectionContext';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOwnTurn: false,
    };
  }

  componentDidMount() {
    const conn = this.context;

    conn.socket.on('next-turn', (turn) => {
      if (turn.player === 'user1') {
        this.setState({ isOwnTurn: true });
      } else this.setState({ isOwnTurn: false });
    });
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
            <Sequencer />
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

Game.contextType = ConnectionContext;

export default Game;
