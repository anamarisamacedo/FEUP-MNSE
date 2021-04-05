import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import NavLinks from './routing/navLinks.json';
import Login from './containers/login/Login';
import MainContainer from './containers/MainContainer';
import styles from './App.module.css';
import theme from './theme';

function App() {
  return (
    <div className={styles.App}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path={NavLinks.login.link} component={Login} />
          <Route path={NavLinks.home.link} component={MainContainer} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
