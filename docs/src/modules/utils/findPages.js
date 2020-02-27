// false positive
// eslint-disable-next-line import/order
import { findPages } from 'docs/src/modules/utils/find';
import glob from 'glob';
import * as path from 'path';

const apiDir = path.resolve(__dirname, '../static/api');
const components = glob
  .sync(path.resolve(__dirname, path.join(apiDir, '*.json')))
  .map(filename => path.basename(filename, '.json'))
  .sort((a, b) => a.localeCompare(b));

const pages = [
  {
    children: components.map(componentName => {
      return {
        pathname: `/api/${componentName}`,
        title: componentName,
      };
    }),
    pathname: '/api',
  },
].concat(
  findPages({
    front: true,
  }),
);

export default pages;
