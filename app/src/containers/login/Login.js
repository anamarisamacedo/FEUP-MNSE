import { Redirect } from 'react-router-dom';
import { getUsername } from '../../utils/UserData';
import NavLinks from '../../routing/navLinks.json';

function Login() {
  if (getUsername())
    return <Redirect to={NavLinks.home.link} />
  
  return <div>Login Page</div>
}

export default Login;