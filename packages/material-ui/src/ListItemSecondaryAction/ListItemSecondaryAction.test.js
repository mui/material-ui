import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import ListItemSecondaryAction from './ListItemSecondaryAction';

describe('<ListItemSecondaryAction />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<ListItemSecondaryAction />);
  });

  describeConformance(<ListItemSecondaryAction />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
