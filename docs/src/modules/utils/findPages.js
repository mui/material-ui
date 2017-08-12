// @flow

import path from 'path';
import { findPages } from './find';

const pages = findPages(path.resolve(__dirname, '../../../../pages'), {
  front: true,
});

export default pages;
