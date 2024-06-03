import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import Checkbox, { checkboxClasses as classes } from '@mui/joy/Checkbox';
import { ThemeProvider } from '@mui/joy/styles';
import CloseIcon from '../internal/svg-icons/Close';
import describeConformance from '../../test/describeConformance';

describe('<Checkbox />', () => {
  const { render } = createRenderer();

  describeConformance(<Checkbox label="demo" />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'JoyCheckbox',
    testDeepOverrides: [{ slotName: 'input', slotClassName: classes.input }],
    refInstanceof: window.HTMLSpanElement,
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      checkbox: { expectedClassName: classes.checkbox },
      input: { expectedClassName: classes.input },
      action: { expectedClassName: classes.action },
      label: { expectedClassName: classes.label },
    },
    skip: ['componentProp', 'componentsProp', 'classesRoot', 'propsSpread', 'themeVariants'],
  }));

  it('should have the classes required for Checkbox', () => {
    expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
  });

  it('renders a `role="checkbox"` with the id', () => {
    const { getByRole } = render(<Checkbox id="foo" />);

    expect(getByRole('checkbox')).to.have.property('id', 'foo');
  });

  it('renders a `role="checkbox"` with the name', () => {
    const { getByRole } = render(<Checkbox name="bar" />);

    expect(getByRole('checkbox')).to.have.property('name', 'bar');
  });

  it('renders a `role="checkbox"` with required attribute', () => {
    const { getByRole } = render(<Checkbox name="bar" required />);

    expect(getByRole('checkbox')).to.have.attribute('required');
  });

  it('renders a `role="checkbox"` with readOnly attribute', () => {
    const { getByRole } = render(<Checkbox name="bar" readOnly />);

    expect(getByRole('checkbox')).to.have.attribute('readonly');
  });

  it('renders a `role="checkbox"` with the Unchecked state by default', () => {
    const { getByRole } = render(<Checkbox />);

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders a checkbox with the Checked state when checked', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);

    expect(getByRole('checkbox')).to.have.property('checked', true);
  });

  it('renders a label', () => {
    const { getByLabelText, getByRole } = render(<Checkbox label="foo" />);

    expect(getByLabelText('foo')).toBeVisible();

    act(() => {
      getByLabelText('foo').click();
    });

    expect(getByRole('checkbox')).to.have.property('checked', true);
  });

  it('the checkbox can be disabled', () => {
    const { getByRole } = render(<Checkbox disabled />);

    expect(getByRole('checkbox')).to.have.property('disabled', true);
  });

  it('the Checked state changes after change events', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);

    // how a user would trigger it
    act(() => {
      getByRole('checkbox').click();
      fireEvent.change(getByRole('checkbox'), { target: { checked: '' } });
    });

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('should have configurable color', () => {
    const { container, rerender } = render(<Checkbox />);

    expect(container.firstChild).to.have.class(classes.colorNeutral); // default

    rerender(<Checkbox color="primary" />);
    expect(container.firstChild).to.have.class(classes.colorPrimary);
  });

  it('should have configurable variant', () => {
    const { container, rerender } = render(<Checkbox />);

    expect(container.firstChild).to.have.class(classes.variantOutlined); // default

    rerender(<Checkbox variant="soft" />);
    expect(container.firstChild).to.have.class(classes.variantSoft);
  });

  it('should have configurable size', () => {
    const { container, rerender } = render(<Checkbox />);

    expect(container.firstChild).to.have.class(classes.sizeMd); // default

    rerender(<Checkbox size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const { getByTestId } = render(<Checkbox indeterminate />);
      expect(getByTestId('HorizontalRuleIcon')).not.to.equal(null);
    });

    it('should have aria-checked="mixed"', () => {
      const { getByRole } = render(<Checkbox indeterminate />);
      expect(getByRole('checkbox')).to.have.attribute('aria-checked', 'mixed');
    });
  });

  describe('icon', () => {
    it('should render an indeterminate icon when both checked and indeterminate is true', () => {
      const { getByTestId } = render(<Checkbox indeterminate checked />);
      expect(getByTestId('HorizontalRuleIcon')).not.to.equal(null);
    });

    it('should render checked icon', () => {
      const { getByTestId } = render(<Checkbox checked />);
      expect(getByTestId('CheckIcon')).not.to.equal(null);
    });

    it('should render unchecked icon', () => {
      const { getByTestId } = render(<Checkbox uncheckedIcon={<CloseIcon />} />);
      expect(getByTestId('CloseIcon')).not.to.equal(null);
    });

    it('should not render icon', () => {
      const { queryByTestId } = render(
        <Checkbox disableIcon checked indeterminate uncheckedIcon={<CloseIcon />} />,
      );

      expect(queryByTestId('CheckIcon')).to.equal(null);
      expect(queryByTestId('CloseIcon')).to.equal(null);
      expect(queryByTestId('HorizontalRuleIcon')).to.equal(null);
    });
  });
});
