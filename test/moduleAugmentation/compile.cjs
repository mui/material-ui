const { execSync } = require('child_process');
const path = require('path');

const configPath = path.resolve(process.argv[2]);
const packagesRoot = path.resolve(__dirname, '../../packages');
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
const lines = output.split(/\r?\n/);
let declarations = 0;
for (const line of lines) {
  if (!path.isAbsolute(line)) {
    continue;
  }
  const relative = path.relative(packagesRoot, line);
  if (!relative.startsWith('..')) {
    if (!/\.d\.(?:ts|mts|cts)$/.test(line) || relative.split(path.sep)[1] !== 'build') {
      throw new Error(`Consumer test loaded library source: ${line}`);
    }
    declarations += 1;
  }
}
if (declarations === 0) {
  throw new Error(`Consumer test did not load built declarations.\n${output}`);
}
if (failed) {
  // Print the diagnostics without the --listFiles paths.
  // eslint-disable-next-line no-console -- compiler diagnostics
  console.log(lines.filter((line) => !path.isAbsolute(line)).join('\n'));
  process.exitCode = 1;
}
