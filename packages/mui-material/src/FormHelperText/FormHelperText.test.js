import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import FormHelperText, { formHelperTextClasses as classes } from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import { blend, contrastRatio, WCAG_MINIMUM_RATIO } from '../../test/contrast';

/**
 * The color a dark-mode Paper paints: its `background-color` under the
 * `background-image` overlay, both read from the rendered element.
 */
function paperSurface(paper) {
  const { backgroundColor, backgroundImage } = window.getComputedStyle(paper);
  const overlay = backgroundImage.match(/rgba?\([^)]+\)/);
  if (overlay === null) {
    throw new Error(`Expected a dark-mode overlay, got "${backgroundImage}".`);
  }
  return blend(overlay[0], 1, backgroundColor);
}

describe('<FormHelperText />', () => {
  const { render } = createRenderer();

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    refInstanceof: window.HTMLParagraphElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormHelperText',
    testVariantProps: { size: 'small' },
  }));

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormHelperText error />);
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    ['error', 'disabled'].forEach((visualState) => {
      describe(`${visualState}`, () => {
        function FormHelperTextInFormControl(props) {
          return (
            <FormControl {...{ [visualState]: true }}>
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        it(`should have the ${visualState} class`, () => {
          render(<FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>);

          expect(screen.getByText(/Foo/)).to.have.class(classes[visualState]);
        });

        it('should be overridden by props', () => {
          const { setProps } = render(
            <FormHelperTextInFormControl {...{ [visualState]: false }}>
              Foo
            </FormHelperTextInFormControl>,
          );

          expect(screen.getByText(/Foo/)).not.to.have.class(classes[visualState]);

          setProps({ [visualState]: true });
          expect(screen.getByText(/Foo/)).to.have.class(classes[visualState]);
        });
      });
    });

    describe('size', () => {
      describe('small margin FormControl', () => {
        it('should have the small class', () => {
          render(
            <FormControl size="small">
              <FormHelperText>Foo</FormHelperText>
            </FormControl>,
          );

          expect(screen.getByText(/Foo/)).to.have.class(classes.sizeSmall);
        });
      });

      it('should be overridden by props', () => {
        function FormHelperTextInFormControl(props) {
          return (
            <FormControl size="medium">
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        const { setProps } = render(<FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>);

        expect(screen.getByText(/Foo/)).not.to.have.class(classes.sizeSmall);
        setProps({ size: 'small' });
        expect(screen.getByText(/Foo/)).to.have.class(classes.sizeSmall);
      });
    });
  });

  describe('WCAG 2.2 conformance', () => {
    describe('1.3.1 Info and Relationships', () => {
      it('describes a standalone input only when the author connects it', () => {
        render(
          <FormControl>
            <Input inputProps={{ 'aria-label': 'Promo code' }} />
            <FormHelperText id="promo-help">Promo codes are not case sensitive.</FormHelperText>
          </FormControl>,
        );
        // FormControl does not connect the helper text on its own.
        expect(screen.getByRole('textbox')).toHaveAccessibleDescription('');
      });
    });

    describe('1.4.3 Contrast (Minimum)', () => {
      it('resting and error text reach 4.5:1 on the light page background', () => {
        const theme = createTheme();
        render(
          <React.Fragment>
            <FormHelperText>Resting</FormHelperText>
            <FormHelperText error>Error</FormHelperText>
          </React.Fragment>,
        );

        ['Resting', 'Error'].forEach((text) => {
          const { color } = window.getComputedStyle(screen.getByText(text));
          expect(contrastRatio(color, theme.palette.background.default)).to.be.at.least(
            WCAG_MINIMUM_RATIO.normalText,
            text,
          );
        });
      });

      // jsdom does not resolve the `--Paper-overlay` variable in `background-image`.
      it.skipIf(isJsdom())(
        'dark error text is borderline at elevation 1 and falls short of 4.5:1 at elevation 2 or more (documented gap)',
        () => {
          const elevations = [1, 2, 24];
          render(
            <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
              {elevations.map((elevation) => (
                <Paper key={elevation} elevation={elevation} data-testid={`paper-${elevation}`}>
                  <FormHelperText error>{`Elevation ${elevation}`}</FormHelperText>
                </Paper>
              ))}
            </ThemeProvider>,
          );

          const [elevation1, ...elevated] = elevations.map((elevation) =>
            contrastRatio(
              window.getComputedStyle(screen.getByText(`Elevation ${elevation}`)).color,
              paperSurface(screen.getByTestId(`paper-${elevation}`)),
            ),
          );

          // When this fails, the gap changed: update FormHelperText/accessibility.md and knownGaps.json.
          expect(elevation1).to.be.within(WCAG_MINIMUM_RATIO.normalText, 4.6);
          elevated.forEach((ratio) => {
            expect(ratio).to.be.lessThan(WCAG_MINIMUM_RATIO.normalText);
          });
        },
      );
    });

    it('3.3.1 Error Identification: marks a standalone input invalid and describes the error in words', () => {
      render(
        <FormControl error>
          <Input
            defaultValue="name@"
            inputProps={{ 'aria-label': 'Email address' }}
            aria-describedby="email-error"
          />
          <FormHelperText id="email-error">Enter a valid email address.</FormHelperText>
        </FormControl>,
      );

      const input = screen.getByRole('textbox');
      expect(input).to.have.attribute('aria-invalid', 'true');
      expect(input).toHaveAccessibleDescription('Enter a valid email address.');
    });

    it('4.1.3 Status Messages: adds no live region, so a new error is not announced (documented gap)', () => {
      render(<FormHelperText error>Enter a valid email address.</FormHelperText>);

      const helperText = screen.getByText('Enter a valid email address.');
      // When this fails, the gap may be fixed: update FormHelperText/accessibility.md.
      expect(helperText).not.to.have.attribute('aria-live');
      expect(helperText).not.to.have.attribute('role');
    });

    it('4.1.3 Status Messages: a TextField error adds no live region anywhere (documented gap)', () => {
      const { container } = render(
        <TextField label="Email address" error helperText="Enter a valid email address." />,
      );

      // When this fails, the gap may be fixed: update FormHelperText/accessibility.md.
      expect(container.querySelector('[aria-live], [role="status"], [role="alert"]')).to.equal(
        null,
      );
    });
  });
});
