import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import Switch, { switchClasses as classes } from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import describeConformance from '../../test/describeConformance';

describe('<Switch />', () => {
  const { render } = createRenderer();

  describeConformance(<Switch />, () => ({
    classes,
    render,
    muiName: 'MuiSwitch',
    testDeepOverrides: [
      { slotName: 'track', slotClassName: classes.track },
      { slotName: 'input', slotClassName: classes.input },
    ],
    refInstanceof: window.HTMLSpanElement,
    skip: [
      'componentProp',
      'componentsProp',
      'themeDefaultProps',
      'themeVariants',
      // Props are spread to the root's child but className is added to the root
      // We cannot use the standard mergeClassName test which relies on data-testid on the root
      // We should fix this when refactoring with Base UI
      'mergeClassName',
    ],
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
    });
  });

  specify('should render an .thumb element inside the .switchBase element', () => {
    const { container } = render(
      <Switch classes={{ thumb: 'thumb', switchBase: 'switch-base' }} />,
    );

    expect(container.querySelector('.switch-base .thumb')).not.to.equal(null);
  });

  it('should render the track as the 2nd child', () => {
    const {
      container: { firstChild: root },
    } = render(<Switch />);

    expect(root.childNodes[1]).to.have.property('tagName', 'SPAN');
    expect(root.childNodes[1]).to.have.class(classes.track);
  });

  it('renders a `role="checkbox"` with the Unchecked state by default', () => {
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

  specify('renders a custom icon when provided', () => {
    const { getByTestId } = render(<Switch icon={<span data-testid="icon" />} />);

    expect(getByTestId('icon')).toBeVisible();
  });

  specify('renders a custom checked icon when provided', () => {
    const { getByTestId } = render(
      <Switch defaultChecked checkedIcon={<span data-testid="icon" />} />,
    );

    expect(getByTestId('icon')).toBeVisible();
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

  it('should not show warnings when custom `type` is provided', () => {
    expect(() => render(<Switch type="submit" />)).not.toErrorDev();
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByRole } = render(
          <FormControl>
            <Switch />
          </FormControl>,
        );

        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl>
            <Switch disabled />
          </FormControl>,
        );

        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Switch />
          </FormControl>,
        );

        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Switch disabled={false} />
          </FormControl>,
        );

        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('mergeClassName', () => {
    it('should merge the className', () => {
      const { container } = render(<Switch className="test-class-name" />);

      expect(container.firstChild).to.have.class('test-class-name');
    });
  });
});
