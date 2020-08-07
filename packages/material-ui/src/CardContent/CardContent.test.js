import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import CardContent from './CardContent';

describe('<CardContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<CardContent />);
  });

  describeConformance(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));
});
