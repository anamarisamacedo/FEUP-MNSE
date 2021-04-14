import { useContext, useEffect } from 'react';
import ConnectionContext from '../../../../utils/ConnectionContext';

function Lobby() {
  const conn = useContext(ConnectionContext);

  useEffect(() => {
    if (!conn) return;
    console.log(conn);
  }, [conn]);

  return (
    <span>Lobby</span>
  );
}

export default Lobby;
