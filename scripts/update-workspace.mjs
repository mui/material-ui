import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { findWorkspacePackages } from '@pnpm/workspace.find-packages';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(currentDirectory, '..');

const packageMap = {};

(await findWorkspacePackages(workspaceRoot)).forEach((p) => {
  packageMap[p.manifest.name] = p.manifest.version;
});

console.log(packageMap);
