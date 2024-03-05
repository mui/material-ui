import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import FormHelperText, {
  formHelperTextClasses as classes,
  FormHelperTextClasses,
} from '@mui/material-next/FormHelperText';
import FormControl from '@mui/material-next/FormControl';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import describeConformance from '../../test/describeConformance';

describe('<FormHelperText />', () => {
  let originalMatchmedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    window.matchMedia = () =>
      ({
        addListener: () => {},
        removeListener: () => {},
      }) as unknown as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  const { render } = createRenderer();

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    refInstanceof: window.HTMLParagraphElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormHelperText',
    testVariantProps: { size: 'small' },
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
    skip: ['componentsProp'],
  }));

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormHelperText error />);
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    ['error', 'disabled'].forEach((visualState) => {
      describe(visualState, () => {
        function FormHelperTextInFormControl(props: { children: React.ReactNode }) {
          return (
            <FormControl {...{ [visualState]: true }}>
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        it(`should have the ${visualState} class`, () => {
          const { getByText } = render(
            <FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>,
          );

          expect(getByText(/Foo/)).to.have.class(
            classes[visualState as keyof FormHelperTextClasses],
          );
        });

        it('should be overrideable by props', () => {
          const { getByText, setProps } = render(
            <FormHelperTextInFormControl {...{ [visualState]: false }}>
              Foo
            </FormHelperTextInFormControl>,
          );

          expect(getByText(/Foo/)).not.to.have.class(
            classes[visualState as keyof FormHelperTextClasses],
          );

          setProps({ [visualState]: true });
          expect(getByText(/Foo/)).to.have.class(
            classes[visualState as keyof FormHelperTextClasses],
          );
        });
      });
    });

    describe('size', () => {
      describe('small margin FormControl', () => {
        it('should have the small class', () => {
          const { getByText } = render(
            <FormControl size="small">
              <FormHelperText>Foo</FormHelperText>
            </FormControl>,
          );

          expect(getByText(/Foo/)).to.have.class(classes.sizeSmall);
        });
      });

      it('should be overrideable by props', () => {
        function FormHelperTextInFormControl(props: { children: React.ReactNode }) {
          return (
            <FormControl size="medium">
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        const { getByText, setProps } = render(
          <FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>,
        );

        expect(getByText(/Foo/)).not.to.have.class(classes.sizeSmall);
        setProps({ size: 'small' });
        expect(getByText(/Foo/)).to.have.class(classes.sizeSmall);
      });
    });
  });
});
