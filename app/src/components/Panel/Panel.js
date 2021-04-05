import styles from './Panel.module.css';

function Panel(props) {
  return (
    <div style={props.style} className={styles.Panel}>
      {props.children}
    </div>
  );
}

export default Panel