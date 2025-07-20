import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const pageRegex = /(\.js|\.tsx)$/;
const blackList = ['/.eslintrc', '/_document', '/_app'];

interface NextJSPage {
  pathname: string;
  children?: NextJSPage[];
}

interface FindPagesOptions {
  front?: boolean;
}

/**
 * Returns the Next.js pages available in a nested format.
 * The output is in the next.js format.
 * Each pathname is a route you can navigate to.
 */
// eslint-disable-next-line import/prefer-default-export
export function findPages(
  options: FindPagesOptions = {},
  directory: string = path.resolve(currentDirectory, '../../../pages'),
  pages: NextJSPage[] = [],
): NextJSPage[] {
  fs.readdirSync(directory).forEach((item) => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/pages/, '')
      .replace('.js', '')
      .replace('.tsx', '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, '');

    if (pathname.includes('.eslintrc')) {
      return;
    }

    if (options.front && !pathname.includes('/components') && !pathname.includes('/api-docs')) {
      return;
    }

    if (fs.statSync(itemPath).isDirectory()) {
      const children: NextJSPage[] = [];
      pages.push({
        pathname,
        children,
      });
      findPages(options, itemPath, children);
      return;
    }

    if (!pageRegex.test(item) || blackList.includes(pathname)) {
      return;
    }

    pages.push({
      pathname,
    });
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) {
      return -1;
    }
    if (pathnameA > pathnameB) {
      return 1;
    }
    return 0;
  });

  return pages;
}
