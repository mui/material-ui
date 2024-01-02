import * as React from 'react';
import { expect } from 'chai';
import {
  createRenderer,
  describeConformance,
  strictModeDoubleLoggingSuppressed,
} from '@mui-internal/test-utils';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import { typographyClasses } from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FilledInput from '../FilledInput';
import FormControl from '../FormControl';
import InputAdornment, { inputAdornmentClasses as classes } from '.';

describe('<InputAdornment />', () => {
  const { render } = createRenderer();

  describeConformance(<InputAdornment position="start">foo</InputAdornment>, () => ({
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInputAdornment',
    testVariantProps: { color: 'primary' },
    slots: {
      root: { expectedClassName: classes.root },
    },
    skip: ['componentsProp'],
    testComponentPropWith: 'span',
  }));

  it('should wrap text children in a Typography', () => {
    const { container } = render(<InputAdornment position="start">foo</InputAdornment>);
    const typography = container.querySelector(`.${typographyClasses.root}`);

    expect(typography).not.to.equal(null);
    expect(typography).to.have.text('foo');
  });

  it('should have the root and start class when position is start', () => {
    const { getByTestId } = render(
      <InputAdornment data-testid="InputAdornment" position="start">
        foo
      </InputAdornment>,
    );
    const adornment = getByTestId('InputAdornment');

    expect(adornment).to.have.class(classes.root);
    expect(adornment).to.have.class(classes.positionStart);
  });

  it('should have the root and end class when position is end', () => {
    const { getByTestId } = render(
      <InputAdornment data-testid="InputAdornment" position="end">
        foo
      </InputAdornment>,
    );
    const adornment = getByTestId('InputAdornment');

    expect(adornment).to.have.class(classes.root);
    expect(adornment).to.have.class(classes.positionEnd);
  });

  describe('prop: variant', () => {
    // TODO v6: requires material-next/TextField
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip("should inherit the TextField's variant", () => {
      const { getByTestId } = render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment data-testid="InputAdornment" position="start">
                foo
              </InputAdornment>
            ),
          }}
        />,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it("should inherit the FormControl's variant", () => {
      const { getByTestId } = render(
        <FormControl variant="filled">
          <InputAdornment data-testid="InputAdornment" position="start">
            foo
          </InputAdornment>
        </FormControl>,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    // TODO v6: requires material-next/TextField
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('should override the inherited variant', () => {
      const { getByTestId } = render(
        <TextField
          fullWidth
          placeholder="Search"
          label="Search"
          variant="filled"
          InputProps={{
            startAdornment: (
              <InputAdornment data-testid="InputAdornment" variant="outlined" position="start">
                foo
              </InputAdornment>
            ),
          }}
        />,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).not.to.have.class(classes.filled);
    });

    it('should have the filled root and class when variant is filled', () => {
      const { getByTestId } = render(
        <InputAdornment data-testid="InputAdornment" variant="filled" position="start">
          foo
        </InputAdornment>,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment).to.have.class(classes.root);
      expect(adornment).to.have.class(classes.positionStart);
      expect(adornment).to.have.class(classes.filled);
    });

    it('should warn if the variant supplied is equal to the variant inferred', () => {
      expect(() => {
        render(
          <FormControl variant="filled">
            <FilledInput
              startAdornment={
                <InputAdornment variant="filled" position="start">
                  foo
                </InputAdornment>
              }
            />
          </FormControl>,
        );
      }).toErrorDev([
        'MUI: The `InputAdornment` variant infers the variant ' +
          'prop you do not have to provide one.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `InputAdornment` variant infers the variant ' +
            'prop you do not have to provide one.',
      ]);
    });
  });

  it('should have the disabled pointer events class when disabledPointerEvents true', () => {
    const { getByTestId } = render(
      <InputAdornment data-testid="InputAdornment" disablePointerEvents position="start">
        foo
      </InputAdornment>,
    );
    const adornment = getByTestId('InputAdornment');

    expect(adornment).to.have.class(classes.disablePointerEvents);
  });

  it('should not wrap text children in a Typography when disableTypography true', () => {
    const { container } = render(
      <InputAdornment disableTypography position="start">
        foo
      </InputAdornment>,
    );

    expect(container.querySelector(`.${typographyClasses.root}`)).to.equal(null);
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <InputAdornment data-testid="InputAdornment" position="end">
        <div>foo</div>
      </InputAdornment>,
    );
    const adornment = getByTestId('InputAdornment');

    expect(adornment.firstChild).to.have.property('nodeName', 'DIV');
  });

  describe('prop: position', () => {
    it('should render span for vertical baseline alignment', () => {
      const { getByTestId } = render(
        <InputAdornment data-testid="InputAdornment" position="start">
          <div>foo</div>
        </InputAdornment>,
      );
      const adornment = getByTestId('InputAdornment');

      expect(adornment.firstChild).to.have.tagName('span');
      expect(adornment.firstChild).to.have.class('notranslate');
      expect(adornment.childNodes[1]).to.have.tagName('div');
    });
  });

  it('applies a size small class inside <FormControl size="small" />', () => {
    const { getByTestId } = render(
      <FormControl size="small">
        <InputAdornment position="start" data-testid="InputAdornment">
          $
        </InputAdornment>
      </FormControl>,
    );

    expect(getByTestId('InputAdornment')).to.have.class(classes.sizeSmall);
  });

  it('applies a hiddenLabel class inside <FormControl hiddenLabel />', () => {
    const { getByTestId } = render(
      <FormControl hiddenLabel>
        <InputAdornment position="start" data-testid="InputAdornment">
          $
        </InputAdornment>
      </FormControl>,
    );

    expect(getByTestId('InputAdornment')).to.have.class(classes.hiddenLabel);
  });
});
