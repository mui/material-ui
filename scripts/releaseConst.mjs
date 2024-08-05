import fs from 'fs';
import yargs from 'yargs';
import { getWorkspaceRoot } from './utils.mjs';

// Packages to add the version to
const packages = ['mui-material', 'mui-system'];

function run() {
  for (const packageName of packages) {
    // Define the path to the package folder
    const packagePath = `${getWorkspaceRoot()}/packages/${packageName}`;

    // Define the path to the package.json file
    const packageJsonPath = `${packagePath}/package.json`;

    // Define the path to the index.js file
    const indexPath = `${packagePath}/src/index.js`;

    // Read the file content
    fs.readFile(packageJsonPath, 'utf8', (err1, packageJsonData) => {
      if (err1) {
        console.error('Error reading the file:', err1);
        return;
      }

      try {
        // Parse the JSON content
        const packageJson = JSON.parse(packageJsonData);
        const version = packageJson.version;

        if (version) {
          // Write the updated version to the index.js file
          fs.readFile(indexPath, 'utf8', (err2, indexData) => {
            if (err2) {
              console.error('Error reading the file:', err2);
              return;
            }

            if (!indexData.includes('export const version =')) {
              console.error(`The version const is not found in the ${indexPath} file.`);
              return;
            }

            // Replace the version in the file content
            const result = indexData.replace(
              /export const version.*;/g,
              `export const version = '${version}';`,
            );

            // // Write the updated content to the file
            fs.writeFile(indexPath, result, 'utf8', (writeErr) => {
              if (writeErr) {
                console.error('Error writing the file:', writeErr);
              }
            });
          });
        }
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    });
  }
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    description: 'Updates the version const in the index.js files of the packages.',
    builder: () => {},
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
