// @flow

import { render as enzymeRender } from 'enzyme';
import type { Element } from 'react';

// Generate a render to string function.
export default function createRender(options1: Object = {}) {
  const { render = enzymeRender, ...other1 } = options1;

  const renderWithContext = function renderWithContext(node: Element<any>, options2: Object = {}) {
    return render(node, {
      ...other1,
      ...options2,
    });
  };

  return renderWithContext;
}
