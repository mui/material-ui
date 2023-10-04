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
    testLegacyComponentsProp: false,
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

  it.skip('should have the underline class', () => {
    const { container } = render(<FilledInput />);
    const root = container.firstChild;
    expect(root).not.to.equal(null);
  });

  it.skip('color={undefined} should not result in crash', () => {
    expect(() => {
      render(<FilledInput color={undefined} />);
    }).not.toErrorDev();
  });

  it.skip('can disable the underline', () => {
    const { container } = render(<FilledInput disableUnderline />);
    const root = container.firstChild;
    expect(root).not.to.have.class(classes.underline);
  });

  it.skip('should forward classes to InputBase', () => {
    render(<FilledInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('should respects the componentsProps if passed', () => {
    render(<FilledInput componentsProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });

  it.skip('should respect the classes coming from InputBase', () => {
    render(
      <FilledInput
        data-test="test"
        multiline
        sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }}
      />,
    );
    expect(document.querySelector('[data-test=test]')).toHaveComputedStyle({ marginTop: '10px' });
  });
});
