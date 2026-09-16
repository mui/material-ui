async function mapConcurrently(items, mapper, concurrency) {
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error('Concurrency must be a positive integer.');
  }

  const iterator = items.entries();
  const results = new Array(items.length);
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    for (const [index, item] of iterator) {
      // eslint-disable-next-line no-await-in-loop -- Each worker processes one item at a time.
      results[index] = await mapper(item);
    }
  });
  await Promise.all(workers);
  return results;
}

module.exports = { mapConcurrently };
