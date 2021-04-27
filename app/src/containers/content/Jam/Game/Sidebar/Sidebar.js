import PropTypes from 'prop-types';
import Players from '../../Lobby/Players';

function Sidebar(props) {
  return (
    <Players users={props.users} />
  );
}

Sidebar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
