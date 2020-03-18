import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Skeleton from './Skeleton';

describe('<Skeleton />', () => {
  let mount;
  const render = createClientRender();
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Skeleton />);
  });

  after(() => {
    mount.cleanUp();
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
});
