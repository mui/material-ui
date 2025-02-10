/* eslint-disable no-console */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { $ } from 'execa';
import * as path from 'path';
import * as fs from 'fs/promises';

interface WorkspaceDefinition {
  name: string;
  version: string;
  path: string;
  private: boolean;
}

interface Manifest {
  packages: Record<string, string>;
}

interface RunOptions {
  packages?: string[];
  outDir: string;
  concurrency: number;
}

async function packWorkspace(workspace: WorkspaceDefinition, outDir: string): Promise<string> {
  const packages: Record<string, string> = {};
  const { stdout: zipFilePath } = await $({
    cwd: workspace.path,
  })`pnpm pack --pack-destination ${outDir}`;
  packages[workspace.name] = zipFilePath;
  return zipFilePath;
}

async function run({ packages, outDir, concurrency }: RunOptions) {
  const allWorkspaces: WorkspaceDefinition[] = await $`pnpm -r ls --depth -1 --json`.then(
    (result) => JSON.parse(result.stdout),
  );
  const workspacesMap = new Map(allWorkspaces.map((workspace) => [workspace.name, workspace]));

  const publicPackages = allWorkspaces
    .filter((workspace) => !workspace.private)
    .map((workspace) => workspace.name);
  const packagesToPack = packages || publicPackages;

  const workspacesToPack = packagesToPack.map((name) => {
    const workspace = workspacesMap.get(name);
    if (!workspace) {
      throw new Error(`Workspace ${name} not found`);
    }
    return workspace;
  });

  const absoluteDestination = path.resolve(outDir);

  const workspacesIterator = workspacesToPack.values();
  const manifest: Manifest = { packages: {} };
  const workers = Array.from({ length: concurrency }).map(async () => {
    for (const workspace of workspacesIterator) {
      /* eslint-disable no-await-in-loop */
      console.log(`packing "${workspace.name}"`);
      const zipFilePath = await packWorkspace(workspace, absoluteDestination);
      const newName = path.join(absoluteDestination, `${workspace.name}.tgz`);
      await fs.mkdir(path.dirname(newName), { recursive: true });
      await fs.rename(zipFilePath, newName);
      const relativeZipFilePath = path.relative(absoluteDestination, newName);
      manifest.packages[workspace.name] = relativeZipFilePath;
      console.log(`packed "${zipFilePath}"`);
      /* eslint-enable no-await-in-loop */
    }
  });

  await Promise.all(workers);

  await fs.writeFile(
    path.join(absoluteDestination, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );
}

yargs(hideBin(process.argv))
  .command<RunOptions>(
    '$0',
    'Pack workspaces.',
    (command) => {
      return command
        .option('packages', {
          describe: 'Workspace Packages to pack, defaults to public packages',
          type: 'array',
          alias: 'p',
        })
        .option('outDir', {
          default: './packed',
          describe: 'Destination folder',
          type: 'string',
        })
        .option('concurrency', {
          default: 5,
          describe: 'Number of concurrent packing processes',
          type: 'number',
        });
    },
    run,
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
