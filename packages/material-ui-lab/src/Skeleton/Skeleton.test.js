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

  it('should get fitContent class when passed children and no width', () => {
    const { container: containerWithoutWidth } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutWidth.firstChild).to.have.class(classes.fitContent);

    const { container: containerWithWidth } = render(
      <Skeleton width="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithWidth.firstChild).not.to.have.class(classes.fitContent);
  });

  it('should get heightAuto class when passed children and no height', () => {
    const { container: containerWithoutHeight } = render(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutHeight.firstChild).to.have.class(classes.heightAuto);

    const { container: containerWithHeight } = render(
      <Skeleton height="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithHeight.firstChild).not.to.have.class(classes.heightAuto);
  });
});
