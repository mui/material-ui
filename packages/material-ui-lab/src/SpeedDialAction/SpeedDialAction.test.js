import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from 'test/utils';
import { useFakeTimers } from 'sinon';
import createMount from 'test/utils/createMount';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import describeConformance from 'test/utils/describeConformance';
import SpeedDialAction from './SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const mount = createMount({ strict: true });
  const render = createClientRender();
  let classes;
  const fabClasses = getClasses(<Fab>Fab</Fab>);

  before(() => {
    classes = getClasses(<SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />);
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
    act(() => {
      clock.tick(100);
    });

    expect(getByText('placeholder')).to.have.class('bar');

    // TODO: Unclear why not running triggers microtasks but runAll does not trigger microtasks
    // can be removed once Popper#update is sync
    clock.runAll();
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
