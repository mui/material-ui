/* eslint-disable no-console */

const path = require('path');
const fse = require('fs-extra');
const { pageToTitle } = require('../src/modules/utils/helpers');
const pages = require('../src/pages');

async function run() {
  try {
    const translationsFilename = path.join(__dirname, '../translations/translations.json');
    const translationsFile = await fse.readFile(translationsFilename, 'utf8');
    const output = JSON.parse(translationsFile);

    const traverse = pages2 => {
      pages2.forEach(page => {
        if (page.pathname.indexOf('api') === -1) {
          const title = pageToTitle(page);

          if (title) {
            const pathname = page.subheader || page.pathname;
            output.pages[pathname] = title;
          }
        }

        if (page.children) {
          traverse(page.children);
        }
      });
    };

    traverse(pages);

    await fse.writeFile(translationsFilename, `${JSON.stringify(output, null, 2)}\n`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

run();
