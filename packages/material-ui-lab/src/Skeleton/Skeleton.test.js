import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Skeleton from './Skeleton';

describe('<Skeleton />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<Skeleton />);
  });

  describeConformance(<Skeleton />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
  }));

  it('should render', () => {
    const { container } = render(<Skeleton />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should get withChildren class when passed children', () => {
    const { container } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(container.firstChild).to.have.class(classes.withChildren);
  });

  it('should get fullWidth class when passed fullWidth', () => {
    const { container } = render(<Skeleton fullWidth />);

    expect(container.firstChild).to.have.class(classes.fullWidth);
  });
});
