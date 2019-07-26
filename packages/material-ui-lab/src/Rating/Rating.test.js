import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import Rating from './Rating';

describe('<Rating />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;
  const defaultProps = {
    value: 2,
  };

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Rating {...defaultProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Rating {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<Rating {...defaultProps} />);

    expect(container.firstChild).to.have.class(classes.root);
  });
});
