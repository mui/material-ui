const fs = require('fs');
const path = require('path');

const pageRegex = /(\.js|\.tsx)$/;
const blackList = ['/.eslintrc', '/_document', '/_app'];

/**
 * @typedef {object} NextJSPage
 * @property {string} pathname
 * @property {NextJSPage[]} [children]
 */

/**
 * Returns the Next.js pages available in a nested format.
 * The output is in the next.js format.
 * Each pathname is a route you can navigate to.
 * @param {{ front: true }} [options]
 * @param {string} [directory]
 * @param {NextJSPage[]} pages
 * @returns {NextJSPage[]}
 */
function findPages(
  options = {},
  directory = path.resolve(__dirname, '../../../pages'),
  pages = [],
) {
  fs.readdirSync(directory).forEach((item) => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/pages/, '')
      .replace('.js', '')
      .replace('.tsx', '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, '');

    if (pathname.indexOf('.eslintrc') !== -1) {
      return;
    }

    if (
      options.front &&
      pathname.indexOf('/components') === -1 &&
      pathname.indexOf('/api-docs') === -1
    ) {
      return;
    }

    if (fs.statSync(itemPath).isDirectory()) {
      const children = [];
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

module.exports = {
  findPages,
};
