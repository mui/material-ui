import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import RadioGroup, { radioGroupClasses as classes, RadioGroupProps } from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

describe('<RadioGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<RadioGroup value="" />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'JoyRadioGroup',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { orientation: 'horizontal' },
    testCustomVariant: true,
    skip: ['componentProp', 'componentsProp', 'classesRoot', 'propsSpread'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should have `orientation` class', () => {
    const { getByRole } = render(<RadioGroup value="" orientation="horizontal" />);

    expect(getByRole('radiogroup')).to.have.class(classes.horizontal);
  });

  it('the root component has the radiogroup role', () => {
    const { container } = render(<RadioGroup value="" />);

    expect(container.firstChild).to.have.attribute('role', 'radiogroup');
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const { container } = render(<RadioGroup value="" onBlur={handleBlur} />);

    fireEvent.blur(container.firstChild as ChildNode);

    expect(handleBlur.callCount).to.equal(1);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const { getByRole } = render(<RadioGroup tabIndex={-1} value="" onKeyDown={handleKeyDown} />);
    const radiogroup = getByRole('radiogroup');

    act(() => {
      radiogroup.focus();
    });

    fireEvent.keyDown(radiogroup);

    expect(handleKeyDown.callCount).to.equal(1);
  });

  it('should support uncontrolled mode', () => {
    const { getByRole } = render(
      <RadioGroup name="group">
        <Radio value="one" />
      </RadioGroup>,
    );

    const radio = getByRole('radio') as HTMLInputElement;

    fireEvent.click(radio);

    expect(radio.checked).to.equal(true);
  });

  it('should support default value in uncontrolled mode', () => {
    const { getAllByRole } = render(
      <RadioGroup name="group" defaultValue="zero">
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    const radios = getAllByRole('radio') as Array<HTMLInputElement>;

    expect(radios[0].checked).to.equal(true);

    fireEvent.click(radios[1]);

    expect(radios[1].checked).to.equal(true);
  });

  it('should have a default name', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    const [arbitraryRadio, ...radios] = getAllByRole('radio') as Array<HTMLInputElement>;
    // `name` **property** will always be a string even if the **attribute** is omitted
    expect(arbitraryRadio.name).not.to.equal('');
    // all input[type="radio"] have the same name
    expect(new Set(radios.map((radio) => radio.name))).to.have.length(1);
  });

  it('should support number value', () => {
    render(
      <RadioGroup name="group" defaultValue={1}>
        <Radio value={1} />
        <Radio value={2} />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole('radio') as Array<HTMLInputElement>;
    expect(radios[0]).to.have.attribute('value', '1');
    expect(radios[0].checked).to.equal(true);
    expect(radios[1].checked).to.equal(false);

    fireEvent.click(radios[1]);

    expect(radios[0].checked).to.equal(false);
    expect(radios[1].checked).to.equal(true);
  });

  it('should accept invalid child', () => {
    render(
      <RadioGroup value="">
        <Radio />
        {null}
      </RadioGroup>,
    );
  });

  describe('prop: onChange', () => {
    it('should fire onChange', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <RadioGroup value="" onChange={handleChange}>
          <Radio value="woofRadioGroup" />
          <Radio />
        </RadioGroup>,
      );

      const radios = getAllByRole('radio');

      fireEvent.click(radios[0]);

      expect(handleChange.callCount).to.equal(1);
    });

    it('should chain the onChange property', () => {
      const handleChange1 = spy();
      const handleChange2 = spy();
      const { getAllByRole } = render(
        <RadioGroup value="" onChange={handleChange1}>
          <Radio value="woofRadioGroup" onChange={handleChange2} />
          <Radio />
        </RadioGroup>,
      );

      const radios = getAllByRole('radio');

      fireEvent.click(radios[0]);

      expect(handleChange1.callCount).to.equal(1);
      expect(handleChange2.callCount).to.equal(1);
    });

    describe('with non-string values', () => {
      it('passes the value of the selected Radio as a string', () => {
        function Test(props: RadioGroupProps & { values: Array<RadioGroupProps['value']> }) {
          const { values, ...other } = props;
          return (
            <RadioGroup {...other}>
              {values.map((value) => {
                return <Radio key={value.id} value={value} />;
              })}
            </RadioGroup>
          );
        }
        Test.propTypes = {
          values: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
        };

        const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        const handleChange = spy();

        const { getAllByRole } = render(
          <Test onChange={handleChange} value={values[1]} values={values} />,
        );

        const radios = getAllByRole('radio') as Array<HTMLInputElement>;

        expect(radios[0].checked).to.equal(false);
        expect(radios[1].checked).to.equal(true);

        fireEvent.click(radios[0]);

        // on updates, however, we compare against event.target.value
        // object information is lost on stringification.
        expect(radios[0].checked).to.equal(false);
        expect(radios[1].checked).to.equal(true);
        expect(handleChange.firstCall.args[0].target.value).to.equal('[object Object]');
      });
    });
  });

  describe('warnings', () => {
    it('should warn when switching from controlled to uncontrolled', () => {
      const { setProps } = render(
        <RadioGroup value="foo">
          <Radio value="foo" />
        </RadioGroup>,
      );

      expect(() => {
        setProps({ value: undefined });
      }).toErrorDev(
        'MUI: A component is changing the controlled value state of RadioGroup to be uncontrolled.',
      );
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const { setProps } = render(
        <RadioGroup>
          <Radio value="foo" />
        </RadioGroup>,
      );

      expect(() => {
        setProps({ value: 'foo' });
      }).toErrorDev(
        'MUI: A component is changing the uncontrolled value state of RadioGroup to be controlled.',
      );
    });
  });
});
