import * as React from 'react';
import { expect } from 'chai';
import { ClassNames } from '@emotion/react';
import { createRenderer } from '@mui-internal/test-utils';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import FilledInput, { filledInputClasses as classes } from '@mui/material-next/FilledInput';
import InputBase from '@mui/material-next/InputBase';
import describeConformance from '../../test/describeConformance';

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

  describe('Emotion compatibility', () => {
    it('classes.root should overwrite built-in styles.', () => {
      const { getByTestId } = render(
        <ClassNames>
          {({ css }) => (
            <FilledInput data-testid="root" classes={{ root: css({ position: 'static' }) }} />
          )}
        </ClassNames>,
      );
      const input = getByTestId('root');

      expect(getComputedStyle(input).position).to.equal('static');
    });

    it('className should overwrite classes.root and built-in styles.', () => {
      const { getByTestId } = render(
        <ClassNames>
          {({ css }) => (
            <FilledInput
              data-testid="root"
              className={css({ position: 'sticky' })}
              classes={{ root: css({ position: 'static' }) }}
            />
          )}
        </ClassNames>,
      );
      const input = getByTestId('root');

      expect(getComputedStyle(input).position).to.equal('sticky');
    });
  });
});
