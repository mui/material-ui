import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import yargs from 'yargs';
import { readPackageJson } from '@pnpm/read-package-json';
import { findWorkspacePackages } from '@pnpm/workspace.find-packages';
import { writeProjectManifest } from '@pnpm/write-project-manifest';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(currentDirectory, '..');

const packageMap = {};

(await findWorkspacePackages(workspaceRoot)).forEach((p) => {
  packageMap[p.manifest.name] = p.manifest.version;
});

function getDependencyVersion(name, versionSpecifier) {
  const workspaceVersion = packageMap[name];
  if (!workspaceVersion) {
    throw new Error(`Could not find ${name} project in the workspace.`);
  }

  switch (versionSpecifier) {
    case 'workspace:*':
      return workspaceVersion;

    case 'workspace:^':
      return `^${workspaceVersion}`;

    case 'workspace:~':
      return `~${workspaceVersion}`;

    default:
      throw new Error(
        `Unsupported version specifier found for package '${name}': '${versionSpecifier}'`,
      );
  }
}

function processDependencies(dependencies) {
  if (!dependencies) {
    return;
  }

  Object.keys(dependencies).forEach((name) => {
    const versionSpecifier = dependencies[name];
    if (/workspace:/.test(versionSpecifier)) {
      const workspaceProjectVersion = getDependencyVersion(name, versionSpecifier);
      dependencies[name] = workspaceProjectVersion;
      // eslint-disable-next-line no-console
      console.log(`${chalk.green`✔`} ${name}: ${versionSpecifier} 🠖 ${workspaceProjectVersion}`);
    }
  });
}

async function run(argv) {
  const { path } = argv;
  const packageJson = await readPackageJson(path);

  // eslint-disable-next-line no-console
  console.log('Converting workspace version specifiers...');

  processDependencies(packageJson.dependencies);
  processDependencies(packageJson.peerDependencies);

  // @pnpm/read-package-json adds readme and _id fields to the package.json.
  // They can be removed.
  if (packageJson.readme.startsWith('ERROR')) {
    delete packageJson.readme;
  }

  // eslint-disable-next-line no-underscore-dangle
  delete packageJson._id;

  await writeProjectManifest(path, packageJson);
}

yargs(process.argv.slice(2))
  .command({
    command: '$0 <path>',
    description: 'Convert pnpm workspace version specifier to valid version number',
    builder: (command) => {
      return command.positional('path', {
        description: 'Path to the package.json to process',
        type: 'string',
      });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
