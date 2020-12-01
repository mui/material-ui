import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import SwitchThumb from './SwitchThumb';

describe('<SwitchThumb />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<SwitchThumb />);
  });

  describeConformance(<SwitchThumb />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'span',
  }));

  it('should render children', () => {
    const children = <p data-testid="thumb-child">AB</p>;
    const { getByTestId } = render(<SwitchThumb>{children}</SwitchThumb>);
    expect(getByTestId('thumb-child')).to.not.equal(null);
  });
});
