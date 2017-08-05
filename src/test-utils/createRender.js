// @flow

import type { Element } from 'react';
import { render as enzymeRender } from 'enzyme';

// Generate a render to string function.
export default function createRender(options: Object = {}) {
  const { render = enzymeRender } = options;
  const renderWithContext = function renderWithContext(node: Element<*>, options2: Object = {}) {
    return render(node, options2);
  };

  return renderWithContext;
}
