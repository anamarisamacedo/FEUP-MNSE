import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavLinks from '../routing/navLinks.json';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };

  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          this.state.isLoggedIn ? (
            <Component props={props} />
          ) : (
            <Redirect to={NavLinks.login.link} />
          )
        }
      />
    );
  }
}

export default PrivateRoute;