import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import Button from '@material-ui/core/Button';
import LoadingButton from './LoadingButton';

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
