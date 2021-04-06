import PropTypes from 'prop-types';
import styles from './Panel.module.css';

function Panel(props) {
  return (
    <div style={props.style} className={styles.Panel}>
      {props.children}
    </div>
  );
}

Panel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  style: {},
};

export default Panel;
