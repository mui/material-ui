/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { $ } from 'execa';
import chalk from 'chalk';

const $$ = $({ stdio: 'inherit' });

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(currentDirectory, '..');

interface PackageInfo {
  name: string;
  path: string;
  version: string;
  private: boolean;
}

interface RunOptions {
  accessToken?: string;
  baseline?: string;
  dryRun: boolean;
  skipLastCommitComparison: boolean;
  yes: boolean;
  ignore: string[];
}

async function run({
  dryRun,
  accessToken,
  baseline,
  skipLastCommitComparison,
  yes,
  ignore,
}: RunOptions) {
  await ensureCleanWorkingDirectory();

  const changedPackages = await getChangedPackages(baseline, skipLastCommitComparison, ignore);
  if (changedPackages.length === 0) {
    return;
  }

  await confirmPublishing(changedPackages, yes);

  try {
    await setAccessToken(accessToken);
    await setVersion(changedPackages);
    await buildPackages();
    await publishPackages(changedPackages, dryRun);
  } finally {
    await cleanUp();
  }
}

async function ensureCleanWorkingDirectory() {
  try {
    await $`git diff --quiet`;
    await $`git diff --quiet --cached`;
  } catch (error) {
    console.error('❌ Working directory is not clean.');
    process.exit(1);
  }
}

async function listPublicChangedPackages(baseline: string) {
  const { stdout: packagesJson } =
    await $`pnpm list --recursive --filter ...[${baseline}] --depth -1 --only-projects --json`;
  const packages = JSON.parse(packagesJson) as PackageInfo[];
  return packages.filter((pkg) => !pkg.private);
}

async function getChangedPackages(
  baseline: string | undefined,
  skipLastCommitComparison: boolean,
  ignore: string[],
): Promise<PackageInfo[]> {
  if (!skipLastCommitComparison) {
    const publicPackagesUpdatedInLastCommit = await listPublicChangedPackages('HEAD~1');
    if (publicPackagesUpdatedInLastCommit.length === 0) {
      console.log('No public packages changed in the last commit.');
      return [];
    }
  }

  if (!baseline) {
    const { stdout: latestTag } = await $`git describe --abbrev=0`;
    baseline = latestTag;
  }

  console.log(`Looking for changed public packages since ${chalk.yellow(baseline)}...`);

  const changedPackages = (await listPublicChangedPackages(baseline)).filter(
    (p) => !ignore.includes(p.name),
  );

  if (changedPackages.length === 0) {
    console.log('Nothing found.');
  }

  return changedPackages;
}

async function confirmPublishing(changedPackages: PackageInfo[], yes: boolean) {
  if (!yes) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('\nFound changes in the following packages:');
    for (const pkg of changedPackages) {
      console.log(` - ${pkg.name}`);
    }

    console.log('\nThis will publish the above packages to the npm registry.');
    const answer = await rl.question('Do you want to proceed? (y/n) ');

    rl.close();

    if (answer.toLowerCase() !== 'y') {
      console.log('Aborted.');
      process.exit(0);
    }
  }
}

async function setAccessToken(npmAccessToken: string | undefined) {
  if (!npmAccessToken && !process.env.NPM_TOKEN) {
    console.error(
      '❌ NPM access token is required. Either pass it as an --access-token argument or set it as an NPM_TOKEN environment variable.',
    );
    process.exit(1);
  }

  const npmrcPath = resolve(workspaceRoot, '.npmrc');

  await appendFile(
    npmrcPath,
    `//registry.npmjs.org/:_authToken=${npmAccessToken ?? process.env.NPM_TOKEN}\n`,
  );
}

async function setVersion(packages: PackageInfo[]) {
  const { stdout: currentRevisionSha } = await $`git rev-parse --short HEAD`;
  const { stdout: commitTimestamp } = await $`git show --no-patch --format=%ct HEAD`;
  const timestamp = formatDate(new Date(+commitTimestamp * 1000));
  let hasError = false;

  const tasks = packages.map(async (pkg) => {
    const packageJsonPath = resolve(pkg.path, './package.json');
    try {
      const packageJson = JSON.parse(await readFile(packageJsonPath, { encoding: 'utf8' }));
      packageJson.version = `${packageJson.version}-dev.${timestamp}-${currentRevisionSha}`;
      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    } catch (error) {
      console.error(`${chalk.red(`❌ ${packageJsonPath}`)}`, error);
      hasError = true;
    }
  });

  await Promise.allSettled(tasks);
  if (hasError) {
    throw new Error('Failed to update package versions');
  }
}

function formatDate(date: Date) {
  // yyyyMMdd-HHmmss
  return date
    .toISOString()
    .replace(/[-:Z.]/g, '')
    .replace('T', '-')
    .slice(0, 15);
}

function buildPackages() {
  if (process.env.CI) {
    return $$`pnpm build:public:ci`;
  }

  return $$`pnpm build:public`;
}

async function publishPackages(packages: PackageInfo[], dryRun: boolean) {
  console.log(`\nPublishing packages${dryRun ? ' (dry run)' : ''}`);
  const tasks = packages.map(async (pkg) => {
    try {
      const args = [pkg.path, '--tag', 'canary', '--no-git-checks'];
      if (dryRun) {
        args.push('--dry-run');
      }
      await $$`pnpm publish ${args}`;
    } catch (error: any) {
      console.error(chalk.red(`❌ ${pkg.name}`), error.shortMessage);
    }
  });

  await Promise.allSettled(tasks);
}

async function cleanUp() {
  await $`git restore .`;
}

yargs(hideBin(process.argv))
  .command<RunOptions>(
    '$0',
    'Publishes packages that have changed since the last release (or a specified commit).',
    (command) => {
      return command
        .option('dryRun', {
          default: false,
          describe: 'If true, no packages will be published to the registry.',
          type: 'boolean',
        })
        .option('accessToken', {
          describe: 'NPM access token',
          type: 'string',
        })
        .option('baseline', {
          describe: 'Baseline tag or commit to compare against (for example `master`).',
          type: 'string',
        })
        .option('skipLastCommitComparison', {
          default: false,
          describe:
            'By default, the script exits when there are no changes in public packages in the latest commit. Setting this flag will skip this check and compare only against the baseline.',
          type: 'boolean',
        })
        .option('yes', {
          default: false,
          describe: "If set, the script doesn't ask for confirmation before publishing packages",
          type: 'boolean',
        })
        .option('ignore', {
          describe: 'List of packages to ignore',
          type: 'string',
          array: true,
          default: [],
        });
    },
    run,
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
