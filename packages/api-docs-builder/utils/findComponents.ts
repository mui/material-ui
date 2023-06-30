import fs from 'fs';
import path from 'path';

const componentRegex = /^(Unstable_)?([A-Z][a-z]+)+\.(js|tsx)/;

/**
 * Returns the component source in a flat array.
 * @param {string} directory
 * @param {Array<{ filename: string }>} components
 */
export default function findComponents(directory: string, components: { filename: string }[] = []) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findComponents(itemPath, components);
      return;
    }

    if (!componentRegex.test(item)) {
      return;
    }

    components.push({
      filename: itemPath,
    });
  });

  return components;
}
