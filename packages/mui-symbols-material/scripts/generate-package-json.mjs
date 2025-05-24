import path from 'path';
import fse from 'fs-extra';
import url from 'url';
import Mustache from 'mustache';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = path.resolve(currentDirectory, '../');
const SRC_DIR = path.resolve(currentDirectory, '../packages');

async function handler() {
  const packageTemplate = await fse.readFile(path.join(ROOT_DIR, 'package-template.json'), {
    encoding: 'utf8',
  });
  const rootPackageJson = await fse.readFile(path.join(ROOT_DIR, 'package.json'), {
    encoding: 'utf8',
  });
  const currentVersion = JSON.parse(rootPackageJson).version;

  const directories = await fse.readdir(SRC_DIR, { withFileTypes: true });
  const dirs = directories.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
  await Promise.all(
    dirs.map((dir) =>
      (async () => {
        const packageJson = Mustache.render(packageTemplate, {
          packageName: dir,
          version: currentVersion,
        });
        await fse.writeFile(path.join(SRC_DIR, dir, 'package.json'), packageJson);
      })(),
    ),
  );
}

handler();
