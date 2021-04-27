import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function HowToPlay() {
  return (
    <div>
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        How To Play
      </Typography>
      <Grid container spacing={4} style={{ marginTop: '35px', textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ flex: 1 }}>
            1. Wait for your turn
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            2. Write your song before time ends
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ flex: 2 }}>
            3. Wait for all turns to end
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ flex: 3 }}>
            4. Listen to the final song
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ flex: 4 }}>
            4. Download the sheet
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default HowToPlay;
