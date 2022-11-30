import fs from 'fs';
import path from 'path';

interface MarkdownPage {
  filename: string;
  pathname: string;
}

/**
 * Returns the markdowns of the documentation in a flat array.
 */
export default function findPagesMarkdownNew(
  directory: string = path.resolve(__dirname, '../../../docs/data'),
  pagesMarkdown: MarkdownPage[] = [],
) {
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findPagesMarkdownNew(itemPath, pagesMarkdown);
      return;
    }

    if (!/\.md$/.test(item) || /-(zh|pt)\.md/.test(item)) {
      // neglect translation markdown
      return;
    }

    let pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/data/, '')
      .replace('.md', '');

    // Remove the last pathname segment.
    pathname = pathname.split('/').slice(0, 4).join('/');

    pagesMarkdown.push({
      // Relative location in the path (URL) system.
      pathname,
      // Relative location in the file system.
      filename: itemPath,
    });
  });

  return pagesMarkdown;
}
