import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent } from '@mui/internal-test-utils';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import { fabClasses } from '@mui/material/Fab';
import SpeedDialAction, { speedDialActionClasses as classes } from '@mui/material/SpeedDialAction';
import describeConformance from '../../test/describeConformance';

describe('<SpeedDialAction />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(
    <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    () => ({
      classes,
      inheritComponent: Tooltip,
      render,
      refInstanceof: window.HTMLButtonElement,
      muiName: 'MuiSpeedDialAction',
      testRootOverrides: { slotName: 'fab' },
      testVariantProps: { tooltipPlacement: 'right' },
      skip: ['componentProp', 'componentsProp'],
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

  it('should have accessible name if tooltipOpen={true}', () => {
    const { getByRole } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" tooltipOpen />,
    );
    const target = getByRole('menuitem');
    expect(target).toHaveAccessibleName('placeholder');
  });

  it('should have accessible name if tooltipOpen={false}', () => {
    const { getByRole } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    const target = getByRole('menuitem');
    expect(target).toHaveAccessibleName('placeholder');
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
