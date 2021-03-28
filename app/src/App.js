import { Switch, Route } from 'react-router-dom';
import NavLinks from './routing/navLinks.json';
import Login from './containers/login/Login';
import MainContainer from './containers/MainContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={NavLinks.login.link} component={Login} />
        <Route path={NavLinks.home.link} component={MainContainer} />
      </Switch>
    </div>
  );
}

export default App;
