import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// With `TypeFeatures['optimizedTheme']` enabled, checking a full `createTheme`
// call must not instantiate the deep `Components<Theme>` types.
// Without the optimization the same program produces >100k instantiations.
const OPTIMIZED_LIMIT = 20000;

function runTsc(project) {
  let output;
  try {
    output = execSync(`pnpm tsc -p ${project} --diagnostics`, {
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
      console.error(`${project}: tsc reported type errors: ${errors}`);
      process.exit(1);
    }
  }

  const instantiationsMatch = output.match(/Instantiations:\s+(\d+)/);
  if (!instantiationsMatch) {
    console.error(output);
    console.error(`${project}: could not find Instantiations in tsc diagnostics output`);
    process.exit(1);
  }
  return parseInt(instantiationsMatch[1], 10);
}

// The strict project asserts the default behavior: without the flag,
// `theme.components` keeps the strict types (see strict/theme.ts).
const strict = runTsc('tsconfig.strict.json');
// eslint-disable-next-line no-console -- report the numbers even when passing
console.info(`strict (flag off): ${strict} instantiations`);

const optimized = runTsc('tsconfig.optimized.json');
// eslint-disable-next-line no-console -- report the numbers even when passing
console.info(`optimized (flag on): ${optimized} instantiations (limit ${OPTIMIZED_LIMIT})`);

if (optimized >= OPTIMIZED_LIMIT) {
  console.error(
    `Optimized instantiations (${optimized}) exceeded the limit of ${OPTIMIZED_LIMIT}. ` +
      'The optimizedTheme type feature may have regressed.',
  );
  process.exit(1);
}
