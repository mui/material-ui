import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import TabScrollButton from './TabScrollButton';
import describeConformance from '../test-utils/describeConformance';

describe('<TabScrollButton />', () => {
  const defaultProps = {
    direction: 'left',
    orientation: 'horizontal',
  };
  const render = createClientRender();
  let classes;
  let mount;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<TabScrollButton {...defaultProps} />);
  });

  describeConformance(<TabScrollButton {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    after: () => mount.cleanUp(),
  }));

  it('should render as a button with the root class', () => {
    const { container } = render(<TabScrollButton {...defaultProps} />);
    const button = container.firstChild;
    expect(button).to.have.class(classes.root);
  });

  describe('prop: disabled', () => {
    it('should render with a opacity of 0', () => {
      const { container } = render(<TabScrollButton {...defaultProps} disabled />);
      const button = container.firstChild;
      expect(button).to.have.class(classes.disabled);
    });
  });

  describe('prop: direction', () => {
    it('should render with the left icon', () => {
      const { container } = render(
        <TabScrollButton {...defaultProps} {...defaultProps} direction="left" disabled />,
      );
      expect(
        container.querySelectorAll('svg[data-mui-test="KeyboardArrowLeftIcon"]').length,
      ).to.equal(1);
    });

    it('should render with the right icon', () => {
      const { container } = render(
        <TabScrollButton {...defaultProps} {...defaultProps} direction="right" disabled />,
      );
      expect(
        container.querySelectorAll('svg[data-mui-test="KeyboardArrowRightIcon"]').length,
      ).to.equal(1);
    });
  });
});
