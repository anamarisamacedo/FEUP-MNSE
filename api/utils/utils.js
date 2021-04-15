/**
 * Transforms an array into an array of { index, elem } pairs where
 * elem is each one of the elements of the original array
 * @param {*} arr an array
 * @returns the array with indexes
 */
function withIndexes(arr) {
  const arrWithIndexes = [];

  for (let i = 0; i < arr.length; i += 1) {
    arrWithIndexes.push({ index: i, elem: arr[i] });
  }

  return arrWithIndexes;
}

module.exports = {
  withIndexes,
};
