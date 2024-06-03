import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Switch, { switchClasses as classes } from '@mui/joy/Switch';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

describe('<Switch />', () => {
  const { render } = createRenderer();

  describeConformance(<Switch startDecorator="1" endDecorator="2" />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'JoySwitch',
    inheritComponent: 'div',
    testDeepOverrides: [
      { slotName: 'track', slotClassName: classes.track },
      { slotName: 'input', slotClassName: classes.input },
      { slotName: 'thumb', slotClassName: classes.thumb },
    ],
    testVariantProps: { variant: 'soft' },
    testCustomVariant: true,
    refInstanceof: window.HTMLDivElement,
    slots: {
      root: { expectedClassName: classes.root },
      thumb: { expectedClassName: classes.thumb },
      track: { expectedClassName: classes.track },
      action: { expectedClassName: classes.action },
      input: { expectedClassName: classes.input },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
    skip: ['componentProp', 'componentsProp', 'classesRoot'],
  }));

  it('should pass `slotProps` down to slots', () => {
    const { container } = render(
      <Switch
        data-testid="root-switch"
        slotProps={{
          thumb: { className: 'custom-thumb' },
          track: { className: 'custom-track' },
          action: { className: 'custom-action' },
          input: { className: 'custom-input' },
        }}
      />,
    );

    expect(screen.getByTestId('root-switch')).toBeVisible();
    expect(container.querySelector('.custom-thumb')).to.have.class(classes.thumb);
    expect(container.querySelector('.custom-track')).to.have.class(classes.track);
    expect(container.querySelector('.custom-action')).to.have.class(classes.action);
    expect(container.querySelector('.custom-input')).to.have.class(classes.input);
  });

  it('should have the classes required for Switch', () => {
    expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
  });

  it('should render the track as the first child of the Switch', () => {
    const { container } = render(<Switch />);

    const switchComponent = container.firstChild!;

    expect(switchComponent.childNodes[0]).to.have.property('tagName', 'SPAN');
    expect(switchComponent.childNodes[0]).to.have.class(classes.track);
  });

  it('renders a `role="switch"` with the Off state by default', () => {
    const { getByRole } = render(<Switch />);

    expect(getByRole('switch')).to.have.property('checked', false);
  });

  it('renders a switch with the Checked state when On', () => {
    const { getByRole } = render(<Switch defaultChecked />);

    expect(getByRole('switch')).to.have.property('checked', true);
  });

  it('the switch can be disabled', () => {
    const { getByRole } = render(<Switch disabled />);

    expect(getByRole('switch')).to.have.property('disabled', true);
  });

  it('the switch can be readonly', () => {
    const { getByRole } = render(<Switch readOnly />);

    expect(getByRole('switch')).to.have.property('readOnly', true);
  });

  it('the Checked state changes after change events', () => {
    const { getByRole } = render(<Switch defaultChecked />);

    // how a user would trigger it
    act(() => {
      getByRole('switch').click();
      fireEvent.change(getByRole('switch'), { target: { checked: '' } });
    });

    expect(getByRole('switch')).to.have.property('checked', false);
  });

  describe('decorator', () => {
    it('can receive startDecorator as string', () => {
      const { getByText } = render(<Switch startDecorator="foo" />);

      expect(getByText('foo')).toBeVisible();
    });

    it('can receive endDecorator as string', () => {
      const { getByText } = render(<Switch endDecorator="bar" />);

      expect(getByText('bar')).toBeVisible();
    });

    it('can receive startDecorator as function', () => {
      const { getByText, getByRole } = render(
        <Switch startDecorator={({ checked }) => (checked ? 'On' : 'Off')} />,
      );

      expect(getByText('Off')).toBeVisible();

      // how a user would trigger it
      act(() => {
        getByRole('switch').click();
        fireEvent.change(getByRole('switch'), { target: { checked: '' } });
      });

      expect(getByText('On')).toBeVisible();
    });

    it('can receive endDecorator as function', () => {
      const { getByText, getByRole } = render(
        <Switch endDecorator={({ checked }) => (checked ? 'On' : 'Off')} />,
      );

      expect(getByText('Off')).toBeVisible();

      // how a user would trigger it
      act(() => {
        getByRole('switch').click();
        fireEvent.change(getByRole('switch'), { target: { checked: '' } });
      });

      expect(getByText('On')).toBeVisible();
    });
  });
});
