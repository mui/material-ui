// false positive
// eslint-disable-next-line import/order
import { findPages } from 'docs/src/modules/utils/find';

const api = require('docs/static/api.json');

const pages = [
  {
    children: Object.keys(api.components).map(componentName => {
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
