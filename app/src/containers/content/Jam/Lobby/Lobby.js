import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withAppContext } from "../../../../utils/AppContext";
import Connection from "../../../../utils/Connection";
import Panel from "../../../../components/Panel/Panel";
import logo from "../../../../logo.png";
import styles from "./Lobby.module.css";
import Settings from "./Settings";
import Players from "./Players";

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        title: "",
        bpm: 100,
        measures: 5,
        turnDuration: 60,
        instruments: [],
      },
      copied: false,
      copyUrl: "",
      leader: false,
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handleSetSettings = this.handleSetSettings.bind(this);
  }

  componentDidMount() {
    const conn = this.props.connection;
    this.setState({ copyUrl: `http://localhost:3000/jam/${conn.jamId}` });
    if (this.props.connection.username === this.props.leader) {
      this.setState({ leader: true });
    }
  }

  handleSetSettings(title, bpm, measures, turnDuration, instruments) {
    this.setState({
      settings: {
        title,
        bpm,
        measures,
        turnDuration,
        instruments,
      },
    });
  }

  handlePlay() {
    this.props.onPlay(true, this.state.settings);
  }

  render() {
    return (
      <div>
        <Grid container spacing={3} direction="row">
          <Grid item xs sm={3} style={{ marginTop: "1%", marginLeft: "1%" }}>
            <Button
              variant="contained"
              startIcon={<PlayArrowOutlinedIcon color="secondary" />}
              href="/jam"
            >
              Back
            </Button>
          </Grid>
          <Grid item xs sm={6} style={{ marginTop: "1%", textAlign: "center" }}>
            <Grid container spacing={1} direction="column">
              <Grid item xs>
                <img src={logo} alt="Logo" width="auto" height="50" />
              </Grid>
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  styles={{ fontFamily: "Galada" }}
                >
                  Jam It!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" textAlign="center">
          <Grid item xs sm={6} styles={{ textAlign: "center" }}>
            <Panel
              className={styles.Panel}
              style={{ height: "65vh", width: "45vh", textAlign: "center" }}
            >
              <Players users={this.props.users} />
            </Panel>
          </Grid>
          <Grid item xs sm={6}>
            <Grid container spacing={1} direction="column" alignItems="center">
              <Grid item xs>
                {this.state.leader ? (
                  <Panel
                    className={styles.Panel}
                    style={{
                      height: "60vh",
                      width: "100vh",
                      textAlign: "center",
                    }}
                  >
                    <Settings
                      onSetSettings={this.handleSetSettings}
                      leader={this.state.leader}
                    />
                  </Panel>
                ) : (
                  <Panel
                    className={styles.Panel}
                    style={{
                      height: "70vh",
                      width: "100vh",
                      textAlign: "center",
                    }}
                  >
                    <Settings
                      onSetSettings={this.handleSetSettings}
                      leader={this.state.leader}
                    />
                  </Panel>
                )}
              </Grid>
              {this.state.leader ? (
                <Grid item xs>
                  <Grid
                    container
                    spacing={10}
                    direction="row"
                    alignItems="center"
                  >
                    <Grid item xs sm={6}>
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        alignItems="center"
                      >
                        <Grid item xs>
                          <CopyToClipboard
                            text={this.state.copyUrl}
                            onCopy={() => this.setState({ copied: true })}
                          >
                            <Button
                              variant="contained"
                              endIcon={
                                <PlayArrowOutlinedIcon color="secondary" />
                              }
                            >
                              Invite
                            </Button>
                          </CopyToClipboard>
                        </Grid>
                        <Grid item xs>
                          {this.state.copied ? (
                            <span style={{ color: "white" }}>Link copied!</span>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs sm={6}>
                      <Button
                        variant="contained"
                        endIcon={<PlayArrowOutlinedIcon color="secondary" />}
                        onClick={this.handlePlay}
                      >
                        Play
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Lobby.propTypes = {
  connection: PropTypes.instanceOf(Connection).isRequired,
  onPlay: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  leader: PropTypes.string.isRequired,
};

Lobby.defaultProps = {
  onPlay: () => {},
};

export default withAppContext(Lobby);
