import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavLinks from './navLinks.json';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
    };
  }

  render() {
    const { component: RenderComponent, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => (this.state.isLoggedIn ? (
          <RenderComponent props={props} />
        ) : (
          <Redirect to={NavLinks.login.link} />
        ))}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
