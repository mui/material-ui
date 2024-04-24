import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { $ } from 'execa';
import chalk from 'chalk';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(currentDirectory, '..');

interface PackageInfo {
  name: string;
  path: string;
  version: string;
  private: boolean;
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

async function setAccessToken(npmAccessToken) {
  if (!npmAccessToken && !process.env.NPM_TOKEN) {
    console.error(
      '❌ NPM access token is required. Either pass it as an argument or set it as an NPM_TOKEN environment variable.',
    );
    process.exit(1);
  }

  const npmrcPath = resolve(workspaceRoot, '.npmrc');

  await fs.appendFile(
    npmrcPath,
    `//registry.npmjs.org/:_authToken=${npmAccessToken ?? process.env.NPM_TOKEN}\n`,
  );
}

async function getChangedPackages(baseline: string | undefined): Promise<PackageInfo[]> {
  if (!baseline) {
    const { stdout: latestTag } = await $`git describe --abbrev=0`;
    baseline = latestTag;
  }

  console.log(`Looking for changed public packages since ${baseline}`);

  const { stdout } =
    await $`pnpm list --recursive --filter ...[${baseline}] --depth -1 --only-projects --json`;

  const packages = JSON.parse(stdout).filter((pkg) => pkg.private === false) as PackageInfo[];
  if (packages.length === 0) {
    console.log('No public changed packages found');
    return packages;
  }

  for (const pkg of packages) {
    console.log(` - ${pkg.name}`);
  }

  return packages;
}

async function setVersion(packages: PackageInfo[]) {
  console.log('\nSetting new versions');
  const { stdout: currentRevisionSha } = await $`git rev-parse --short HEAD`;
  const timestamp = formatDate(new Date());
  let hasError = false;

  const tasks = packages.map(async (pkg) => {
    const packageJsonPath = resolve(pkg.path, './package.json');
    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: 'utf8' }));
      const version = packageJson.version;
      const dashIndex = version.indexOf('-');
      let newVersion = version;
      if (dashIndex !== -1) {
        newVersion = version.slice(0, dashIndex);
      }

      newVersion = `${newVersion}-dev.${timestamp}-${currentRevisionSha}`;
      packageJson.version = newVersion;

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
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
  // yyMMddHHmmss
  return date
    .toISOString()
    .replace(/[-:TZ]/g, '')
    .slice(2, 14);
}

async function publishPackages(packages: PackageInfo[], dryRun: boolean) {
  console.log(`\nPublishing packages${dryRun ? ' (dry run)' : ''}`);
  const tasks = packages.map(async (pkg) => {
    try {
      await $({
        stdio: 'inherit',
      })`pnpm publish ${pkg.path} --tag canary --no-git-checks ${dryRun ? '--dry-run' : ''}`;
    } catch (error) {
      console.error(chalk.red(`❌ ${pkg.name}`), error);
    }
  });

  await Promise.allSettled(tasks);
}

async function cleanUp() {
  await $`git restore .`;
}

interface RunOptions {
  dryRun: boolean;
  npmAccessToken?: string;
  baseline?: string;
}

async function run({ dryRun, npmAccessToken, baseline }: RunOptions) {
  ensureCleanWorkingDirectory();
  try {
    setAccessToken(npmAccessToken);
    const changedPackages = await getChangedPackages(baseline);
    await setVersion(changedPackages);
    await publishPackages(changedPackages, dryRun);
  } finally {
    await cleanUp();
  }
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
        });
    },
    run,
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
