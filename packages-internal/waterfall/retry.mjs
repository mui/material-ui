// Inspired by https://github.com/zeit/async-retry
// Without the retry dependency (1 kB gzipped +)
async function retry(tryFunction, options = {}) {
  const { retries = 3 } = options;

  let tries = 0;
  let output = null;
  let exitErr = null;

  const bail = (err) => {
    exitErr = err;
  };

  while (tries < retries) {
    tries += 1;
    try {
      // eslint-disable-next-line no-await-in-loop
      output = await tryFunction({ tries, bail });
      break;
    } catch (err) {
      if (tries >= retries) {
        throw err;
      }
    }
  }

  if (exitErr) {
    throw exitErr;
  }

  return output;
}

export default retry;
