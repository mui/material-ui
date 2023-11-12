import path from 'path';
import { PackageManager, PkgInstallerMap } from 'src/installers';

import bootstrapProject from './bootstrapProject';
import installPackages from './installPackages';

export type FrameworkOption = 'react-cra' | 'react-vite' | 'next-app' | 'next-pages';

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  framework: FrameworkOption;
  typescript: boolean;
  packageManager: PackageManager;
}

export default async function createProject({
  packages,
  projectName,
  framework,
  typescript,
  packageManager,
}: CreateProjectOptions) {
  const projectDir = path.resolve(process.cwd(), projectName);

  await bootstrapProject({ projectDir, projectName, framework, typescript, packageManager });

  installPackages({ projectDir, projectName, packageManager, packages, typescript, framework });

  return projectDir;
}
