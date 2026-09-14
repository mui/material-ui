const { execSync } = require('child_process');
const path = require('path');

const configPath = path.resolve(process.argv[2]);
const packagesRoot = path.resolve(__dirname, '../../packages');
const fixtureRoot = path.dirname(configPath);
let output;
let failed = false;
try {
  // Windows needs a shell to start the pnpm.cmd shim.
  output = execSync(`pnpm tsc --project "${configPath}" --listFiles --pretty false`, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
} catch (error) {
  output = error.stdout || '';
  failed = true;
}
let declarations = 0;
for (const line of output.split(/\r?\n/)) {
  if (!path.isAbsolute(line)) {
    continue;
  }
  const relative = path.relative(packagesRoot, line);
  if (!relative.startsWith('..') && path.dirname(line) !== fixtureRoot) {
    if (!line.endsWith('.d.ts') || relative.split(path.sep)[1] !== 'build') {
      throw new Error(`Consumer test loaded library source: ${line}`);
    }
    declarations += 1;
  }
}
if (declarations === 0) {
  throw new Error(`Consumer test did not load built declarations.\n${output}`);
}
if (failed) {
  // eslint-disable-next-line no-console -- compiler diagnostics
  console.log(output);
  process.exitCode = 1;
}
