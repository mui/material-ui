import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// With `TypeFeatures['optimizedTheme']` enabled, checking a full `createTheme`
// call must not instantiate the deep `Components<Theme>` types.
// Without the optimization the same program produces >100k instantiations.
const LIMIT = 20000;

let output;
try {
  output = execSync('pnpm tsc --noEmit --diagnostics', {
    cwd: dirname,
    encoding: 'utf-8',
    stdio: 'pipe',
  });
} catch (error) {
  // tsc exits non-zero on type errors, diagnostics are still printed
  output = error.stdout ?? '';
  const errors = (output.match(/error TS\d+/g) || []).join(', ');
  if (errors) {
    console.error(output);
    console.error(`tsc reported type errors: ${errors}`);
    process.exit(1);
  }
}

const instantiationsMatch = output.match(/Instantiations:\s+(\d+)/);

if (!instantiationsMatch) {
  console.error(output);
  console.error('Could not find Instantiations in TypeScript diagnostics output');
  process.exit(1);
}

const instantiations = parseInt(instantiationsMatch[1], 10);
// eslint-disable-next-line no-console -- report the number even when passing
console.info(`TypeScript Instantiations: ${instantiations} (limit ${LIMIT})`);

if (instantiations >= LIMIT) {
  console.error(
    `TypeScript Instantiations (${instantiations}) exceeded the limit of ${LIMIT}. ` +
      'The optimizedTheme type feature may have regressed.',
  );
  process.exit(1);
}
