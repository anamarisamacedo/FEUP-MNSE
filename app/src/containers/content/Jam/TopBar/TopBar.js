import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styles from './TopBar.module.css';

function TopBar(props) {
  return (
    <div className={styles.TopBar}>
      <Typography variant="h4">
        {props.jamTitle}
      </Typography>
    </div>
  );
}

TopBar.propTypes = {
  jamTitle: PropTypes.string,
};

TopBar.defaultProps = {
  jamTitle: 'Jam',
};

export default TopBar;
