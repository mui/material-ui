import * as React from 'react';
import { createMount, describeConformance } from 'test/utils';
import Slider from './Slider';

describe('<Slider />', () => {
  if (typeof Touch === 'undefined') {
    return;
  }

  const mount = createMount();

  describeConformance(<Slider value={0} />, () => ({
    classes: {},
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));
});
