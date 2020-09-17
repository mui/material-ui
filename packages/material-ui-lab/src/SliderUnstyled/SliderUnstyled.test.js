import * as React from 'react';
import { createMount, describeConformance } from 'test/utils';
import SliderUnstyled from './SliderUnstyled';

describe('<SliderUnstyled />', () => {
  if (typeof Touch === 'undefined') {
    return;
  }

  const mount = createMount();

  describeConformance(<SliderUnstyled value={0} />, () => ({
    classes: {},
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));
});
