import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withAppContext } from '../../../../utils/AppContext';

function Players(props) {
  return (
    <div>
      <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
        Players
      </Typography>
      <List>
        {props.users.map((user) => (
          <ListItem key={user}>
            <ListItemAvatar>
              <Avatar src={user.picture} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body1">{user.username}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

Players.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

Players.defaultProps = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default withAppContext(Players);
