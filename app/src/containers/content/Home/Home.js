import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import Panel from '../../../components/Panel/Panel';
import logo from '../../../logo.png';
import styles from './Home.module.css';
import HowToPlay from './HowToPlay';
import '@fontsource/galada';

function Home() {
  return (
    <div>
      <Grid
        container
        spacing={1}
        styles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{ textAlign: 'center', marginTop: '10%' }}
        >
          <img src={logo} alt="Logo" width="auto" height="150px" />
          <br />
          <h3 fontFamily="Galada">Jam It!</h3>
          <br />
          <br />
          <Button
            href="/jam"
            variant="contained"
            endIcon={<PlayArrowOutlinedIcon color="secondary" />}
          >
            Create Jam
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: '5%' }}>
          <Panel
            className={styles.Panel}
            style={{ height: '77vh', width: '74vh', textAlign: 'center' }}
          >
            <HowToPlay />
          </Panel>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
