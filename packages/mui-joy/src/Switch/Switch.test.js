import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, act, createRenderer, fireEvent } from 'test/utils';
import Switch, { switchClasses as classes } from '@mui/joy/Switch';
import { ThemeProvider } from '@mui/joy/styles';

describe('<Switch />', () => {
  const { render } = createRenderer();

  describeConformance(<Switch />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'JoySwitch',
    testDeepOverrides: [
      { slotName: 'track', slotClassName: classes.track },
      { slotName: 'input', slotClassName: classes.input },
    ],
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'propsSpread', 'themeDefaultProps', 'themeVariants'],
  }));

  it('should have the classes required for SwitchBase', () => {
    expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
  });

  it('should render the track as the first child of the Switch', () => {
    const {
      container: { firstChild: root },
    } = render(<Switch />);

    expect(root.childNodes[0]).to.have.property('tagName', 'SPAN');
    expect(root.childNodes[0]).to.have.class(classes.track);
  });

  it('renders a `role="checkbox"` with the Unechecked state by default', () => {
    const { getByRole } = render(<Switch />);

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders a checkbox with the Checked state when checked', () => {
    const { getByRole } = render(<Switch defaultChecked />);

    expect(getByRole('checkbox')).to.have.property('checked', true);
  });

  specify('the switch can be disabled', () => {
    const { getByRole } = render(<Switch disabled />);

    expect(getByRole('checkbox')).to.have.property('disabled', true);
  });

  specify('the switch can be readonly', () => {
    const { getByRole } = render(<Switch readOnly />);

    expect(getByRole('checkbox')).to.have.property('readOnly', true);
  });

  specify('the Checked state changes after change events', () => {
    const { getByRole } = render(<Switch defaultChecked />);

    // how a user would trigger it
    act(() => {
      getByRole('checkbox').click();
      fireEvent.change(getByRole('checkbox'), { target: { checked: '' } });
    });

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });
});
