/* eslint-disable no-console */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const deduplicate = require('yarn-deduplicate');

const lockFile = path.resolve(__dirname, '../yarn.lock');
const yarnlock = fs.readFileSync(lockFile, 'utf8');

const duplicates = deduplicate.listDuplicates(yarnlock);
if (duplicates.length === 0) {
  console.log('No duplicated packages found');
  process.exit(0);
}

console.log(
  `${duplicates.length} duplicated package(s) found\n${duplicates.map((x) => `  ${x}`).join('\n')}`,
);

if (process.env.CI) {
  console.error(
    [
      `Error: There are currently ${duplicates.length} duplicated package(s).`,
      `To deduplicate run "yarn deduplicate"`,
    ].join('\n'),
  );
  process.exit(1);
}

console.log('Deduplicating package(s)');
fs.writeFileSync(lockFile, deduplicate.fixDuplicates(yarnlock));

const yarn = spawn('yarn', {
  shell: true,
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '..'),
});

yarn.on('close', (code) => {
  process.exit(code);
});
