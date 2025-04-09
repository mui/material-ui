import childProcess from 'child_process';
import fse from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import yargs from 'yargs';
import gitUrlParse from 'git-url-parse';

import { getWorkspaceRoot } from './utils.mjs';

/**
 * Only directly call it with side-effect free commands.
 * Otherwise use the `exec` that's considering whether the context is supposed to be "dry" i.e. have no side-effects.
 */
const execActual = promisify(childProcess.exec);
/**
 * @param {string} command
 * @param {unknown} [options]
 */
function execDry(command, options) {
  // eslint-disable-next-line no-console
  console.log(`exec(\`${command}\`, ${JSON.stringify(options)})`);
}

/**
 * Find the remote pointing to mui/material-ui.
 *
 * Conventionally this should be named `upstream` but some collaborators might've used a different naming scheme.
 *
 * @param {string} repo
 */
async function findMuiOrgRemote(repo) {
  const { stdout } = await execActual(['git', 'remote', '-v'].join(' '));
  const remoteLines = stdout.trim().split(/\r?\n/);

  return remoteLines
    .map((remoteLine) => {
      const [name, url, method] = remoteLine.split(/\s/);
      return { name, url, method };
    })
    .find((remote) => {
      const parsed = gitUrlParse(remote.url);
      return parsed.owner === 'mui' && parsed.name === repo;
    });
}

async function main(argv) {
  const { dryRun, repo } = argv;

  const exec = dryRun ? execDry : execActual;

  const rootWorkspace = getWorkspaceRoot();
  const rootWorkspaceManifest = await fse.readJSON(path.join(rootWorkspace, 'package.json'));

  const tag = `v${rootWorkspaceManifest.version}`;
  const message = `Version ${rootWorkspaceManifest.version}`;

  await exec(['git', 'tag', '-a', tag, '-m', `"${message}"`].join(' '));
  // eslint-disable-next-line no-console -- verbose logging
  console.log(`Created tag '${tag}'. To remove enter 'git tag -d ${tag}'`);

  const muiOrgRemote = await findMuiOrgRemote(repo);
  if (muiOrgRemote === undefined) {
    throw new TypeError(
      'Unable to find the upstream remote. It should be a remote pointing to "mui/material-ui". ' +
        'Did you forget to add it via `git remote add upstream git@github.com:mui/material-ui.git`? ' +
        'If you think this is a bug please include `git remote -v` in your report.',
    );
  }

  await exec(['git', 'push', muiOrgRemote.name, tag].join(' '));

  // eslint-disable-next-line no-console -- verbose logging
  console.log(
    `Pushed tag '${tag}' to . This should not be reversed. In case of emergency enter 'git push --delete ${muiOrgRemote.name} ${tag}' to remove.`,
  );
}

yargs(process.argv.slice(2))
  .command({
    command: '$0',
    description: 'Tags the current release and pushes these changes to mui/material-ui.',
    builder: (command) => {
      return command
        .option('dryRun', {
          default: false,
          describe: 'If true, the script will not have any permanent side-effects.',
          type: 'boolean',
        })
        .option('repo', {
          default: 'material-ui',
          describe: 'Repository to tag',
          type: 'string',
        });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
