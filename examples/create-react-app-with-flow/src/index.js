// @flow

import React from 'react';
import { render } from 'react-dom';
import Index from './pages/index';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Index />, rootElement);
}
