const glob = require('fast-glob');
const fse = require('fs-extra');
const path = require('path');

async function main() {
  const workspaceRoot = path.resolve(__dirname, '..');

  const declarationFiles = await glob('**/build/**/*.d.ts', {
    absolute: true,
    cwd: workspaceRoot,
    ignore: 'node_modules',
  });

  await Promise.all(
    declarationFiles.map(async (declarationFilePath) => {
      const declarationFile = await fse.readFile(declarationFilePath, { encoding: 'utf8' });
      // find occurences of e.g. `import("../../material-ui/src/...")`
      const typeImportsRelativeToWorkspace = declarationFile.match(
        /import\(("|')(\.\.\/)+material-ui/g,
      );

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
