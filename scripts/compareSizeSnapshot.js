const loadComparison = require('./sizeSnapshot/loadComparison');

async function run() {
  const comparison = await loadComparison();

  console.log(`Comparing ${comparison.previous}..${comparison.current}`);

  const summaries = Object.keys(comparison.bundles).map(bundleName => {
    const bundle = comparison.bundles[bundleName];

    return {
      bundle: bundleName,
      'parsed-prev': bundle.parsed.previous,
      'parsed-cur': bundle.parsed.current,
      'parsed-diff-abs': bundle.parsed.current - bundle.parsed.previous,
    };
  });

  console.table(summaries);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
