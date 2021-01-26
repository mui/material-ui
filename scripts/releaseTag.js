const childProcess = require('child_process');
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

const exec = promisify(childProcess.exec);

/**
 * Find the remote pointing to mui-org/material-ui.
 *
 * Conventionally this should be named `upstream` but some collaborators might've used a different naming scheme.
 */
async function findMuiOrgRemote() {
  const { stdout } = await exec(['git', 'remote', '-v'].join(' '));
  const remoteLines = stdout.trim().split(/\r?\n/);

  return remoteLines
    .map((remoteLine) => {
      const [name, url, method] = remoteLine.split(/\s/);
      return { name, url, method };
    })
    .find((remote) => {
      return remote.url.indexOf('mui-org/material-ui') && remote.method === '(push)';
    });
}

async function main(argv) {
  const { dryRun } = argv;

  const rootWorkspace = path.resolve(__dirname, '..');
  const rootWorkspaceManifest = await fse.readJSON(path.join(rootWorkspace, 'package.json'));

  const tag = `v${rootWorkspaceManifest.version}`;
  const message = `Version ${rootWorkspaceManifest.version}`;

  await exec(['git', 'tag', '-a', tag, '-m', `"${message}"`].join(' '));
  // eslint-disable-next-line no-console -- verbose logging
  console.log(`Created tag '${tag}'. To remove enter 'git tag -d ${tag}'`);

  if (!dryRun) {
    const muiOrgRemote = await findMuiOrgRemote();
    if (muiOrgRemote === undefined) {
      throw new TypeError(
        'Unable to find the upstream remote. It should be a remote pointing to "mui-org/material-ui". Did you forget to add it via `git remote add upstream git@github.com:mui-org/material-ui.git`?',
      );
    }

    await exec(['git', 'push', muiOrgRemote.name, tag].join(' '));
    // eslint-disable-next-line no-console -- verbose logging
    console.log(
      `Pushed tag '${tag}' to . This should not be reversed. In case of emergency enter 'git push --delete ${muiOrgRemote} ${tag}' to remove.`,
    );
  }
}

yargs
  .command({
    command: '$0',
    description: 'Tags the current release and pushes these changes to mui-org/material-ui.',
    builder: (command) => {
      return command.option('dryRun', {
        default: false,
        describe: "If true, tags won't be pushed.",
        type: 'boolean',
      });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
