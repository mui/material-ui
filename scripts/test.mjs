import { spawn } from 'node:child_process';

if (process.argv.length < 3) {
  console.log('Running ESLint, type checker, and unit tests...');
  spawn('pnpm', ['test:extended'], {
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit'],
  });
} else {
  console.log('Running selected tests in watch mode...');
  spawn('pnpm', ['test:cli', ...process.argv.slice(2)], {
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit'],
  });
}
