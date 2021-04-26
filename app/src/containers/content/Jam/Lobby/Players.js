import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Connection from "../../../../utils/Connection";
import { withAppContext } from "../../../../utils/AppContext";

class Players extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
    };
  }

  async componentDidMount() {
    const conn = this.props.connection;
    
    this.setState((props) => ({ currentUsers: props.users }));
    console.log(this.props.users)
    console.log(this.state.currentUsers)
    conn.socket.on("current-users", (currentUsers) => {
      console.log("current-users");
      this.setState({ currentUsers });
      console.log(currentUsers);
    });
  }

  render() {
    return (
      <div>
        <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
          Players
        </Typography>
        
      </div>
    );
  }
}

/*
<GridList cols={1}>
          {this.state.currentUsers.map((user) => (
            <GridListTile>
              <Typography variant="body1">{{ user }}</Typography>
            </GridListTile>
          ))}
        </GridList>*/

Players.propTypes = {
  connection: PropTypes.instanceOf(Connection).isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withAppContext(Players);
