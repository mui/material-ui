import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import Radio, { radioClasses as classes } from '@mui/joy/Radio';
import { ThemeProvider, extendTheme } from '@mui/joy/styles';
import FormControl from '@mui/joy/FormControl';
import RadioGroup from '@mui/joy/RadioGroup';
import describeConformance from '../../test/describeConformance';

describe('<Radio />', () => {
  const { render } = createRenderer();

  describeConformance(<Radio label="demo" />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'JoyRadio',
    testDeepOverrides: [{ slotName: 'input', slotClassName: classes.input }],
    testVariantProps: { variant: 'soft' },
    testCustomVariant: true,
    refInstanceof: window.HTMLSpanElement,
    slots: {
      root: { expectedClassName: classes.root },
      radio: { expectedClassName: classes.radio },
      icon: { expectedClassName: classes.icon },
      action: { expectedClassName: classes.action },
      input: { expectedClassName: classes.input },
      label: { expectedClassName: classes.label },
    },
    skip: ['componentProp', 'componentsProp', 'classesRoot', 'propsSpread'],
  }));

  it('should have the classes required for Radio', () => {
    expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
  });

  it('renders a `role="radio"` with the id', () => {
    const { getByRole } = render(<Radio id="foo" />);

    expect(getByRole('radio')).to.have.property('id', 'foo');
  });

  it('renders a `role="radio"` with the name', () => {
    const { getByRole } = render(<Radio name="bar" />);

    expect(getByRole('radio')).to.have.property('name', 'bar');
  });

  it('renders a `role="radio"` with the required attribute', () => {
    const { getByRole } = render(<Radio name="bar" required />);

    expect(getByRole('radio')).to.have.attribute('required');
  });

  it('renders a `role="radio"` with the readOnly attribute', () => {
    const { getByRole } = render(<Radio name="bar" readOnly />);

    expect(getByRole('radio')).to.have.attribute('readonly');
  });

  it('renders a `role="radio"` with the Unchecked state by default', () => {
    const { getByRole } = render(<Radio />);

    expect(getByRole('radio')).to.have.property('checked', false);
  });

  it('renders a radio with the Checked state when checked', () => {
    const { getByRole } = render(<Radio defaultChecked />);

    expect(getByRole('radio')).to.have.property('checked', true);
  });

  it('the radio can be disabled', () => {
    const { getByRole } = render(<Radio disabled />);

    expect(getByRole('radio')).to.have.property('disabled', true);
  });

  it('disabled prop from FormControl should take precedence over disabled prop from theme', () => {
    const { getByRole } = render(
      <ThemeProvider
        theme={extendTheme({
          components: {
            JoyRadio: {
              defaultProps: {
                disabled: false,
              },
            },
          },
        })}
      >
        <FormControl disabled>
          <Radio value="outlined" label="Outlined" />
        </FormControl>
      </ThemeProvider>,
    );

    expect(getByRole('radio')).to.have.property('disabled', true);
  });

  it('the Checked state changes after change events', () => {
    const { getByRole } = render(<Radio defaultChecked />);

    // how a user would trigger it
    act(() => {
      getByRole('radio').click();
      fireEvent.change(getByRole('radio'), { target: { checked: '' } });
    });

    expect(getByRole('radio')).to.have.property('checked', false);
  });

  it('should have configurable color', () => {
    const { container, rerender } = render(<Radio />);

    expect(container.firstChild).to.have.class(classes.colorNeutral); // default

    rerender(<Radio color="primary" />);
    expect(container.firstChild).to.have.class(classes.colorPrimary);
  });

  it('should have configurable variant', () => {
    const { container, rerender } = render(<Radio />);

    expect(container.firstChild).to.have.class(classes.variantOutlined); // default

    rerender(<Radio variant="soft" />);
    expect(container.firstChild).to.have.class(classes.variantSoft);
  });

  it('should have configurable size', () => {
    const { container, rerender } = render(<Radio />);

    expect(container.firstChild).to.have.class(classes.sizeMd); // default

    rerender(<Radio size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  it('should be checked when it is selected in the radio group', () => {
    const { getByRole } = render(
      <RadioGroup defaultValue="1">
        <Radio value="1" />
        <Radio value="2" />
      </RadioGroup>,
    );

    expect(getByRole('radio', { checked: true })).to.have.property('value', '1');
  });

  it('should be checked when changing the value', () => {
    const { getByRole } = render(
      <RadioGroup defaultValue={1}>
        <Radio name="0" value={0} />
        <Radio name="1" value={1} />
      </RadioGroup>,
    );

    expect(getByRole('radio', { checked: true })).to.have.property('value', '1');

    act(() => {
      getByRole('radio', { checked: false }).click();
    });

    expect(getByRole('radio', { checked: true })).to.have.property('value', '0');

    act(() => {
      getByRole('radio', { checked: false }).click();
    });

    expect(getByRole('radio', { checked: true })).to.have.property('value', '1');
  });
});
