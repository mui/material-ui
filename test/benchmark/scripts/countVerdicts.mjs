// Counts the verdicts in a folder of `benchmark --reporter json` outputs from A/A runs, where both
// sides are the same commit, so every `better` or `worse` verdict is a false positive.
// Usage: node countVerdicts.mjs <dir>
/* eslint-disable no-console */
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  throw new Error('Usage: node countVerdicts.mjs <dir>');
}

const files = (await fs.readdir(dir)).filter((file) => /^analysis-.*\.json$/.test(file));

const rows = new Map();
let runs = 0;
let failedRuns = 0;
let runsWithFlag = 0;
let runsWithRegression = 0;

for (const file of files) {
  let analysis;
  try {
    // eslint-disable-next-line no-await-in-loop
    analysis = JSON.parse(await fs.readFile(path.join(dir, file), 'utf8'));
  } catch {
    failedRuns += 1;
    continue;
  }
  runs += 1;
  let flagged = false;
  for (const benchmark of analysis.benchmarks) {
    for (const { metric, comparisons } of benchmark.metrics) {
      for (const comparison of comparisons) {
        const key = `${benchmark.name} | ${metric}`;
        const row = rows.get(key) ?? { better: 0, worse: 0, total: 0, widest: 0 };
        row.total += 1;
        if (comparison.change === 'better' || comparison.change === 'worse') {
          row[comparison.change] += 1;
          flagged = true;
        }
        const width = comparison.relative.high - comparison.relative.low;
        row.widest = Math.max(row.widest, width);
        rows.set(key, row);
      }
    }
  }
  if (flagged) {
    runsWithFlag += 1;
  }
  if (analysis.regressions.length > 0) {
    runsWithRegression += 1;
  }
}

console.table(
  Object.fromEntries(
    [...rows].map(([key, row]) => [
      key,
      {
        runs: row.total,
        better: row.better,
        worse: row.worse,
        'false positive %': Number((((row.better + row.worse) / row.total) * 100).toFixed(1)),
        'widest interval %': Number(row.widest.toFixed(1)),
      },
    ]),
  ),
);
console.log(`Runs: ${runs} (${failedRuns} failed)`);
console.log(`Runs with any better/worse verdict: ${runsWithFlag}`);
console.log(`Runs with a regression alarm: ${runsWithRegression}`);
