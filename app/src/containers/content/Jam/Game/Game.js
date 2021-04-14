import { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Panel from '../../../../components/Panel/Panel';
import Sequencer from './Sequencer/Sequencer';
import TopBar from './TopBar/TopBar';
import Sidebar from './Sidebar/Sidebar';
import BottomBar from './BottomBar/BottomBar';
import ConnectionContext from '../../../../utils/ConnectionContext';

function Game() {
  const conn = useContext(ConnectionContext);

  useEffect(() => {
    console.log(conn);
  }, [conn]);

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

export default Game;
