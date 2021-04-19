import { useContext } from 'react';
import ConnectionContext from '../../../../utils/ConnectionContext';
import UserContext from '../../../../utils/UserContext';

function Lobby() {
  const conn = useContext(ConnectionContext);
  const username = useContext(UserContext);

  console.log(conn);
  console.log(username);

  return (
    <span>Lobby</span>
  );
}

export default Lobby;
