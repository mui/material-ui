import fs from 'fs-extra';
import path from 'path';
import sortPackageJson from 'sort-package-json';
import {
  type AvailableDependencies,
  dependencyVersionMap,
} from 'src/installers/dependencyVersionMap';
import { type PackageJson } from 'type-fest';

export default function addDependency(opts: {
  dependencies: AvailableDependencies[];
  devMode: boolean;
  projectDir: string;
}) {
  const { dependencies, devMode, projectDir } = opts;
  const pkgJson = fs.readJSONSync(path.join(projectDir, 'package.json')) as PackageJson;

  dependencies.forEach((dep) => {
    const version = dependencyVersionMap[dep];

    if (devMode && pkgJson.devDependencies) {
      pkgJson.devDependencies[dep] = version;
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[dep] = version;
    }
  });

  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, 'package.json'), sortedPkgJson, { spaces: 2 });
}
