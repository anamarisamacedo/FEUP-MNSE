import { createContext } from 'react';
import PropTypes from 'prop-types';
import Connection from './Connection';

const UserContext = createContext();
const ConnectionContext = createContext();

const AppContextProvider = (props) => (
  <UserContext.Provider value={props.username}>
    <ConnectionContext.Provider value={props.connection}>
      { props.children }
    </ConnectionContext.Provider>
  </UserContext.Provider>
);

AppContextProvider.propTypes = {
  username: PropTypes.string.isRequired,
  connection: PropTypes.instanceOf(Connection).isRequired,
  children: PropTypes.node.isRequired,
};

const withAppContext = (Component) => (
  (props) => (
    <UserContext.Consumer>
      {(username) => (
        <ConnectionContext.Consumer>
          {(connection) => (
            <Component username={username} connection={connection} {...props} />
          )}
        </ConnectionContext.Consumer>
      )}
    </UserContext.Consumer>
  )
);

export {
  AppContextProvider,
  withAppContext,
};
