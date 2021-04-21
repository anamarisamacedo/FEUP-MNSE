import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { formatSeconds } from '../../../../../utils/utils';

function BottomBar(props) {
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

      <Grid item container xs={6} justify="flex-end">
        <Typography align="left" variant="h2" style={{ fontWeight: 'bold', width: '5em' }}>
          { props.timeLeft ? formatSeconds(props.timeLeft) : '00:00' }
        </Typography>
      </Grid>

    </Grid>
  );
}

BottomBar.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};

export default BottomBar;
