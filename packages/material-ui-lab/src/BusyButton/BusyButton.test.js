import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import BusyButton from './BusyButton';
import Button from '@material-ui/core/Button';

describe('<BusyButton />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<BusyButton>Hello World</BusyButton>);
  });

  describeConformance(<BusyButton>Conformance?</BusyButton>, () => ({
    classes,
    inheritComponent: Button,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));
});
