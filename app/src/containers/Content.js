import { Switch, withRouter } from 'react-router-dom';
import NavLinks from '../routing/navLinks.json';
import Home from './content/Home/Home';
import Jam from './content/Jam/Jam';
import PrivateRoute from '../routing/PrivateRoute';

function createRoute(name, component) {
  return <PrivateRoute exact path={name} component={component} />;
}

function Content() {
  return (
    <Switch>
      { createRoute('/', Home) }
      { createRoute(NavLinks.jam.link, Jam) }
    </Switch>
  );
}

export default withRouter(Content);
