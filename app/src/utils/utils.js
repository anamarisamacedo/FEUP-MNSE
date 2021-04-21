/* eslint-disable import/prefer-default-export */
function formatSeconds(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export {
  formatSeconds,
};
