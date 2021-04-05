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

export default TopBar;
