import { Switch, withRouter } from 'react-router-dom';
import NavLinks from '../routing/navLinks.json';
import Home from './content/Home/Home';
import Session from './content/Session/Session';
import PrivateRoute from '../routing/PrivateRoute';

function createRoute(name, component) {
  return <PrivateRoute exact path={name} component={component} />
}

function Content() {
  return (
    <Switch>
      { createRoute('/', Home) }
      { createRoute(NavLinks.session.link, Session) }
    </Switch>
  );
}

export default withRouter(Content);