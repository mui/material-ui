import * as React from 'react';
import { expect } from 'chai';
import { getClasses, describeConformance, Icon, Tooltip, Fab } from '@material-ui/core';
import { useFakeTimers } from 'sinon';
import createMount from 'test/utils/createMount';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import SpeedDialAction from './SpeedDialAction';

describe('<SpeedDialAction />', () => {
  // StrictModeViolation: uses Tooltip
  const mount = createMount({ strict: false });
  const render = createClientRender({ strict: false });
  let classes;
  const fabClasses = getClasses(<Fab>Fab</Fab>);
  let clock;

  before(() => {
    classes = getClasses(<SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />);
  });

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  describeConformance(
    <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    () => ({
      classes,
      inheritComponent: Tooltip,
      mount,
      refInstanceof: window.HTMLButtonElement,
      skip: ['componentProp'],
    }),
  );

  it('should be able to change the Tooltip classes', () => {
    const { getByText, container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        open
        tooltipTitle="placeholder"
        TooltipClasses={{ tooltip: 'bar' }}
      />,
    );

    fireEvent.mouseOver(container.querySelector('button'));
    clock.tick(100);
    expect(getByText('placeholder')).to.have.class('bar');
  });

  it('should render a Fab', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(fabClasses.root);
  });

  it('should render the button with the fab class', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" open />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
    expect(container.querySelector('button')).to.have.class(classes.fabClosed);
  });
});
