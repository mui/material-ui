async function forEach(array, iteratee) {
  for (let i = 0; i < array.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await iteratee(array[i], i);
  }
}

export default forEach;
