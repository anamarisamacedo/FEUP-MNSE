import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function BottomBar() {
  return (
    <Grid container spacing={1}>

      <Grid item container direction="column" xs={1} spacing={2} justify="center">
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h4" color="textSecondary" style={{ fontWeight: 'bold' }}>
            Instrument
          </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Synth
          </Typography>
        </Grid>
      </Grid>

      <Grid item container direction="column" xs={4} spacing={2} justify="center">
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h4" color="textSecondary" style={{ fontWeight: 'bold' }}>
            Tempo
          </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            120
          </Typography>
        </Grid>
      </Grid>

      <Grid item container xs={3} justify="flex-end">
        <Typography variant="h2" style={{ fontWeight: 'bold' }}>
          1:23
        </Typography>
      </Grid>

    </Grid>
  );
}

export default BottomBar;
