import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import LoadingButton from './LoadingButton';
import Button from '@material-ui/core/Button';

describe('<LoadingButton />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<LoadingButton>Hello World</LoadingButton>);
  });

  describeConformance(<LoadingButton>Conformance?</LoadingButton>, () => ({
    classes,
    inheritComponent: Button,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));
});
