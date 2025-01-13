import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import InputBase from '@mui/material/InputBase';
import Input, { inputClasses as classes } from '@mui/material/Input';
import describeConformance from '../../test/describeConformance';
import FormControl from '../FormControl';

describe('<Input />', () => {
  const { render } = createRenderer();

  describeConformance(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    testLegacyComponentsProp: true,
    slots: {
      // can't test with DOM element as Input places an ownerState prop on it unconditionally.
      root: { expectedClassName: classes.root, testWithElement: null },
      input: { expectedClassName: classes.input, testWithElement: null },
    },
    skip: [
      'componentProp',
      'componentsProp',
      'slotPropsCallback', // not supported yet
      'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
    ],
  }));

  it('should forward classes to InputBase', () => {
    render(<Input error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respects the componentsProps if passed', () => {
    render(<Input componentsProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });

  it('should respect the classes coming from InputBase', () => {
    render(
      <Input data-test="test" multiline sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }} />,
    );
    expect(document.querySelector('[data-test=test]')).toHaveComputedStyle({ marginTop: '10px' });
  });

  it('should not have colorSecondary class on Input', () => {
    render(<Input color="secondary" />);
    expect(document.querySelector(`.MuiInput-colorSecondary`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-colorSecondary`)).to.not.equal(null);
  });

  it('should not have formControl class on Input', () => {
    render(
      <FormControl>
        <Input />
      </FormControl>,
    );
    expect(document.querySelector(`.MuiInput-formControl`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-formControl`)).to.not.equal(null);
  });

  it('should not have multiline class on Input', () => {
    render(<Input multiline />);
    expect(document.querySelector(`.MuiInput-multiline`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-multiline`)).to.not.equal(null);
  });

  it('should not have sizeSmall class on Input', () => {
    render(<Input size="small" />);
    expect(document.querySelector(`.MuiInput-sizeSmall`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-sizeSmall`)).to.not.equal(null);
  });

  it('should not have adornedStart class on Input', () => {
    render(<Input startAdornment={<div>Start</div>} />);
    expect(document.querySelector(`.MuiInput-adornedStart`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-adornedStart`)).to.not.equal(null);
  });

  it('should not have adornedEnd class on Input', () => {
    render(<Input endAdornment={<div>End</div>} />);
    expect(document.querySelector(`.MuiInput-adornedEnd`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-adornedEnd`)).to.not.equal(null);
  });

  it('should not have fullWidth class on Input', () => {
    render(<Input fullWidth />);
    expect(document.querySelector(`.MuiInput-fullWidth`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-fullWidth`)).to.not.equal(null);
  });

  it('should not have type class on Input', () => {
    render(<Input type="search" />);
    expect(document.querySelector(`.MuiInput-typeSearch`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-typeSearch`)).to.not.equal(null);
  });

  it('should not have inputAdornedStart class on Input', () => {
    render(<Input startAdornment={<div>Start</div>} />);
    expect(document.querySelector(`.MuiInput-inputAdornedStart`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-inputAdornedStart`)).to.not.equal(null);
  });

  it('should not have inputAdornedEnd class on Input', () => {
    render(<Input endAdornment={<div>End</div>} />);
    expect(document.querySelector(`.MuiInput-inputAdornedEnd`)).to.equal(null);
    expect(document.querySelector(`.MuiInputBase-inputAdornedEnd`)).to.not.equal(null);
  });
});
