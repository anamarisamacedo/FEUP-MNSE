import Button from "@material-ui/core/Button";
import Panel from "../../../components/Panel/Panel";
import logo from "../../../logo.png";
import styles from "./Home.module.css";
import HowToPlay from "./HowToPlay";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";

function Home() {
  return (
    <div>
      <Grid
        container
        spacing={1}
        styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{ height: "50vh", textAlign: "center", marginTop: '40px' }}
        >
          <img src={logo} alt="Logo" width='auto' height='150px'/>
          <br />
          <Typography variant="h3" styles={{ fontFamily: "Galada" }}>
            Jam It!
          </Typography>
          <br />
          <br />
          <Button
            href="/jam"
            variant="contained"
            endIcon={<PlayArrowOutlinedIcon color="#A7C6DA" />}
          >
            Create Jam
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{ height: "50vh", marginTop: '40px' }}>
          <Panel
            className={styles.Panel}
            style={{ height: "77vh", width: "74vh", textAlign: "center" }}
          >
            <HowToPlay />
          </Panel>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
