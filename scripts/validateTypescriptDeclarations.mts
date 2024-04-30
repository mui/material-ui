/* eslint-disable no-console */
import { globbySync } from 'globby';
import fs from 'fs';

/**
 * Validates if there are no missing exports from TS files that would
 * result in an import from a local file.
 */
function validateFiles() {
  const declarationFiles = globbySync(['packages/*/build/**/*.d.ts'], {
    followSymbolicLinks: false,
  });
  const invalidFiles = declarationFiles.filter((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /import\(["']packages\//gm;
    return regex.test(content);
  });

  if (invalidFiles.length > 0) {
    console.error('Found invalid imports in the following files:');
    invalidFiles.forEach((file) => console.error(file));
    process.exit(1);
  }

  console.log('Found no invalid import statements in built declaration files.');
}

validateFiles();
