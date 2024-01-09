const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');
const yargs = require('yargs');

async function run(argv) {
  const workspaceRoot = path.resolve(__dirname, '../');

  const gitignore = fs.readFileSync(path.join(workspaceRoot, '.gitignore'), { encoding: 'utf8' });
  const ignore = gitignore
    .split(/\r?\n/)
    .filter((pattern) => {
      return pattern.length > 0 && !pattern.startsWith('#');
    })
    .map((line) => {
      if (line.startsWith('/')) {
        // "/" marks the cwd of the ignore file.
        // Since we declare the dirname of the gitignore the cwd we can prepend "." as a shortcut.
        return `.${line}`;
      }
      return line;
    });
  const globPattern = `**/*${argv.testFilePattern.replace(/\\/g, '/')}*`;
  const spec = glob
    .sync(globPattern, {
      cwd: workspaceRoot,
      ignore,
      followSymbolicLinks: false,
    })
    .filter((relativeFile) => {
      return /\.test\.(js|ts|tsx)$/.test(relativeFile);
    });

  if (spec.length === 0) {
    throw new Error(`Could not find any file test files matching '${globPattern}'`);
  }

  const args = ['mocha'].concat(spec);
  if (argv.bail) {
    args.push('--bail');
  }
  if (argv.debug || argv.inspecting) {
    args.push('--timeout 0');
  }
  if (argv.debug) {
    args.push('--inspect-brk');
  }
  if (!argv.single) {
    args.push('--watch');
  }
  if (argv.testNamePattern !== undefined) {
    args.push(`--grep '${argv.testNamePattern}'`);
  }

  const mochaProcess = childProcess.spawn('pnpm', args, {
    env: {
      ...process.env,
      BABEL_ENV: 'test',
      NODE_ENV: argv.production ? 'production' : 'test',
    },
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit'],
  });

  mochaProcess.once('exit', (signal) => {
    process.exit(signal !== null ? signal : undefined);
  });

  process.on('SIGINT', () => {
    // Forward interrupt.
    // Otherwise cli.js exits and the you get dangling console output from mocha.
    // "dangling" meaning that you get mocha output in the new terminal input.
    mochaProcess.kill('SIGINT');
  });
}

yargs
  .command({
    command: '$0 <testFilePattern>',
    description: 'Test cli for developing',
    builder: (command) => {
      return command
        .positional('testFilePattern', {
          description: 'Only test files match "**/*{testFilePattern}*.test.{js,ts,tsx}"',
          type: 'string',
        })
        .option('bail', {
          alias: 'b',
          description: 'Stop on first error.',
          type: 'boolean',
        })
        .option('debug', {
          alias: 'd',
          description:
            'Allows attaching a debugger and waits for the debugger to start code execution.',
          type: 'boolean',
        })
        .option('inspecting', {
          description: 'In case you expect to hit breakpoints that may interrupt a test.',
          type: 'boolean',
        })
        .option('production', {
          alias: 'p',
          description:
            'Run tests in production environment. WARNING: Will not work with most tests.',
          type: 'boolean',
        })
        .option('single', {
          alias: 's',
          description: 'Run only once i.e. not in watch mode.',
          type: 'boolean',
        })
        .option('testNamePattern', {
          alias: 't',
          description: 'Limit tests by their name given a pattern.',
          type: 'string',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
