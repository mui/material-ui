import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import FilledInput, { filledInputClasses as classes } from '@mui/material-next/FilledInput';
import InputBase from '@mui/material-next/InputBase';

describe('<FilledInput />', () => {
  const { render } = createRenderer();

  describeConformance(<FilledInput open />, () => ({
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiFilledInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    slots: {
      root: { expectedClassName: classes.root },
      input: { expectedClassName: classes.input, testWithElement: 'input' },
    },
    skip: [
      'componentProp',
      'componentsProp',
      'slotPropsCallback', // not supported yet
    ],
  }));

  it('should have the underline class', () => {
    const { getByTestId } = render(<FilledInput data-testid="test-input" />);
    const root = getByTestId('test-input');
    expect(root).not.to.equal(null);
    expect(root).to.have.class(classes.underline);
  });

  it('color={undefined} should not result in crash', () => {
    expect(() => {
      render(<FilledInput color={undefined} />);
    }).not.toErrorDev();
  });

  it('can disable the underline', () => {
    const { getByTestId } = render(<FilledInput data-testid="test-input" disableUnderline />);
    const root = getByTestId('test-input');
    expect(root).not.to.have.class(classes.underline);
  });

  it('should forward classes to InputBase', () => {
    render(<FilledInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respect the classes coming from InputBase', () => {
    const { getByTestId } = render(
      <FilledInput
        data-testid="test-input"
        multiline
        sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }}
      />,
    );
    const root = getByTestId('test-input');
    expect(root).toHaveComputedStyle({ marginTop: '10px' });
  });
});
