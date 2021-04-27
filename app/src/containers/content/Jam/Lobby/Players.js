import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Connection from '../../../../utils/Connection';
import { withAppContext } from '../../../../utils/AppContext';

class Players extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
    };
  }

  async componentDidMount() {
    const conn = this.props.connection;

    // this.setState({ currentUsers: this.props.users });

    conn.socket.on('current-users', (currentUsers) => {
      this.setState({ currentUsers });
    });
  }

  render() {
    return (
      <div>
        <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
          Players
        </Typography>
        <List>
          {this.state.currentUsers.map((user) => (
            <ListItem key={user}>
              <ListItemAvatar>
                <Avatar src="https://i.pravatar.cc/300" />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="body1">{user}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Players.propTypes = {
  connection: PropTypes.instanceOf(Connection).isRequired,
  // users: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withAppContext(Players);
