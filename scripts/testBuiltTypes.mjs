import glob from 'fast-glob';
import fse from 'fs-extra';
import path from 'path';
import { getWorkspaceRoot } from './utils.mjs';

async function main() {
  const workspaceRoot = getWorkspaceRoot();

  const declarationFiles = await glob('**/build/**/*.d.ts', {
    absolute: true,
    cwd: workspaceRoot,
    ignore: ['node_modules'],
    followSymbolicLinks: false,
  });

  await Promise.all(
    declarationFiles.map(async (declarationFilePath) => {
      const declarationFile = await fse.readFile(declarationFilePath, { encoding: 'utf8' });
      // find occurrences of e.g. `import("../../mui-*/src/...")`
      const typeImportsRelativeToWorkspace = declarationFile.match(/import\(("|')(\.\.\/)+mui/g);

      if (typeImportsRelativeToWorkspace !== null) {
        console.error(
          // readable path for CI while making it clickable locally
          `${path.relative(process.cwd(), declarationFilePath)} possibly imports types ${
            typeImportsRelativeToWorkspace.length
          } times that are unreachable once published.`,
        );
        process.exitCode = 1;
      }
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
