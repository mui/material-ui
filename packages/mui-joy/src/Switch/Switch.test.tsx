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
    const view = render(
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
    expect(view.container.querySelector('.custom-thumb')).to.have.class(classes.thumb);
    expect(view.container.querySelector('.custom-track')).to.have.class(classes.track);
    expect(view.container.querySelector('.custom-action')).to.have.class(classes.action);
    expect(view.container.querySelector('.custom-input')).to.have.class(classes.input);
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
    render(<Switch />);

    expect(screen.getByRole('switch')).to.have.property('checked', false);
  });

  it('renders a switch with the Checked state when On', () => {
    render(<Switch defaultChecked />);

    expect(screen.getByRole('switch')).to.have.property('checked', true);
  });

  it('the switch can be disabled', () => {
    render(<Switch disabled />);

    expect(screen.getByRole('switch')).to.have.property('disabled', true);
  });

  it('the switch can be readonly', () => {
    render(<Switch readOnly />);

    expect(screen.getByRole('switch')).to.have.property('readOnly', true);
  });

  it('the Checked state changes after change events', () => {
    render(<Switch defaultChecked />);

    // how a user would trigger it
    act(() => {
      screen.getByRole('switch').click();
    });
    fireEvent.change(screen.getByRole('switch'), { target: { checked: '' } });

    expect(screen.getByRole('switch')).to.have.property('checked', false);
  });

  describe('decorator', () => {
    it('can receive startDecorator as string', () => {
      render(<Switch startDecorator="foo" />);

      expect(screen.getByText('foo')).toBeVisible();
    });

    it('can receive endDecorator as string', () => {
      render(<Switch endDecorator="bar" />);

      expect(screen.getByText('bar')).toBeVisible();
    });

    it('can receive startDecorator as function', () => {
      render(<Switch startDecorator={({ checked }) => (checked ? 'On' : 'Off')} />);

      expect(screen.getByText('Off')).toBeVisible();

      // how a user would trigger it
      act(() => {
        screen.getByRole('switch').click();
      });
      fireEvent.change(screen.getByRole('switch'), { target: { checked: '' } });

      expect(screen.getByText('On')).toBeVisible();
    });

    it('can receive endDecorator as function', () => {
      render(<Switch endDecorator={({ checked }) => (checked ? 'On' : 'Off')} />);

      expect(screen.getByText('Off')).toBeVisible();

      // how a user would trigger it
      act(() => {
        screen.getByRole('switch').click();
      });
      fireEvent.change(screen.getByRole('switch'), { target: { checked: '' } });

      expect(screen.getByText('On')).toBeVisible();
    });
  });
});
