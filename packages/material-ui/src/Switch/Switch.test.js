import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import Switch from './Switch';

describe('<Switch />', () => {
  let mount;
  let classes;
  const render = createClientRender({ strict: true });

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<Switch />);
  });

  describeConformance(<Switch />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLSpanElement,
    after: () => mount.cleanUp(),
  }));

  /* TODO Switch violates root component
  describeConformance(<Switch />, () => ({
    classes,
    inheritComponent: IconButton,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  })); */

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
    });
  });

  specify('should render an .thumb element inside the .switchBase element', () => {
    const { container } = render(
      <Switch classes={{ thumb: 'thumb', switchBase: 'switch-base' }} />,
    );

    expect(container.querySelector('.switch-base .thumb')).to.be.ok;
  });

  it('should render the track as the 2nd child', () => {
    const {
      container: { firstChild: root },
    } = render(<Switch />);

    expect(root.childNodes[1]).to.have.property('tagName', 'SPAN');
    expect(root.childNodes[1]).to.have.class(classes.track);
  });

  it('renders a `role="switch"` with the Off state by default', () => {
    const { getByRole } = render(<Switch />);

    expect(getByRole('switch')).to.have.property('checked', false);
  });

  it('renders a switch with the On state when checked', () => {
    const { getByRole } = render(<Switch checked />);

    expect(getByRole('switch')).to.have.property('checked', true);
  });

  specify('the switch can be disabled', () => {
    const { getByRole } = render(<Switch disabled />);

    expect(getByRole('switch')).to.have.property('disabled', true);
  });

  specify('the switch can be readonly', () => {
    const { getByRole } = render(<Switch readOnly />);

    expect(getByRole('switch')).to.have.property('readOnly', true);
  });
});
