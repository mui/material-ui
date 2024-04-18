import fs from 'fs';
import path from 'path';
import findIndexFile from './findIndexFile';

const componentRegex = /^(Unstable_)?([A-Z][a-z]+)+2?\.(js|tsx)/;

function defaultIsComponent(item: string) {
  return componentRegex.test(item);
}

/**
 * Returns the component source in a flat array.
 * @param {string} directory
 * @param {Array<{ filename: string, indexFilename: string }>} components
 * @param {(filename: string) => boolean} isComponent
 */
export default function findComponents(
  directory: string,
  components: { filename: string; indexFilename: string | null }[] = [],
  isComponent: (filename: string) => boolean = defaultIsComponent,
) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findComponents(itemPath, components, isComponent);
      return;
    }

    if (!isComponent(item)) {
      return;
    }

    const indexFile = findIndexFile(directory);

    components.push({
      filename: itemPath,
      ...indexFile,
    });
  });

  return components;
}
