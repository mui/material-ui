import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { act, createRenderer } from '@mui-internal/test-utils';
import FormLabel, { formLabelClasses as classes } from '@mui/material-next/FormLabel';
import FormControl, { useFormControl } from '@mui/material-next/FormControl';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import describeConformance from '../../test/describeConformance';

describe('<FormLabel />', () => {
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

  describeConformance(<FormLabel />, () => ({
    classes,
    inheritComponent: 'label',
    render,
    refInstanceof: window.HTMLLabelElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormLabel',
    testVariantProps: { color: 'secondary' },
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
    skip: ['componentsProp'],
  }));

  describe('prop: required', () => {
    it('should visually show an asterisk but not include it in the a11y tree', () => {
      const { container } = render(<FormLabel required>name</FormLabel>);

      expect(container.querySelector('label')).to.have.text('name\u2009*');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelectorAll(`.${classes.asterisk}`)[0]).toBeAriaHidden();
    });

    it('should not show an asterisk by default', () => {
      const { container } = render(<FormLabel>name</FormLabel>);

      expect(container.querySelector('label')).to.have.text('name');
      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(0);
    });
  });

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormLabel required error />);

      expect(container.querySelectorAll(`.${classes.asterisk}`)).to.have.lengthOf(1);
      expect(container.querySelector(`.${classes.asterisk}`)).to.have.class(classes.error);
      expect(container.querySelectorAll(`.${classes.asterisk}`)[0]).toBeAriaHidden();
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    describe('error', () => {
      function Wrapper(props: { children?: React.ReactNode }) {
        return <FormControl error {...props} />;
      }

      it(`should have the error class`, () => {
        const { container } = render(<FormLabel />, {
          wrapper: Wrapper,
        });

        expect(container.querySelector('label')).to.have.class(classes.error);
      });

      it('should be overridden by props', () => {
        const { container, setProps } = render(
          <FormLabel data-testid="FormLabel" error={false} />,
          {
            wrapper: Wrapper,
          },
        );

        expect(container.querySelector('label')).not.to.have.class(classes.error);

        setProps({ error: true });
        expect(container.querySelector('label')).to.have.class(classes.error);
      });
    });

    describe('focused', () => {
      const FormController = React.forwardRef((_, ref) => {
        const formControl = useFormControl();
        React.useImperativeHandle(ref, () => formControl, [formControl]);
        return null;
      });

      it(`should have the focused class`, () => {
        const formControlRef = React.createRef<{ onFocus: () => void }>();
        const { container } = render(
          <FormControl error>
            <FormLabel data-testid="FormLabel" />
            <FormController ref={formControlRef} />
          </FormControl>,
        );

        expect(container.querySelector('label')).not.to.have.class(classes.focused);

        act(() => {
          formControlRef.current?.onFocus();
        });
        expect(container.querySelector('label')).to.have.class(classes.focused);
      });

      it('should be overridden by props', () => {
        const formControlRef = React.createRef<{ onFocus: () => void }>();
        function Wrapper({ children }: { children?: React.ReactNode }) {
          return (
            <FormControl error>
              {children}
              <FormController ref={formControlRef} />
            </FormControl>
          );
        }
        Wrapper.propTypes = { children: PropTypes.node };
        const { container, setProps } = render(<FormLabel data-testid="FormLabel" />, {
          wrapper: Wrapper,
        });
        act(() => {
          formControlRef.current?.onFocus();
        });

        expect(container.querySelector('label')).to.have.class(classes.focused);

        setProps({ focused: false });
        expect(container.querySelector('label')).not.to.have.class(classes.focused);

        setProps({ focused: true });
        expect(container.querySelector('label')).to.have.class(classes.focused);
      });
    });

    describe('required', () => {
      it('should show an asterisk', () => {
        const { container } = render(
          <FormControl required>
            <FormLabel>name</FormLabel>
          </FormControl>,
        );

        expect(container).to.have.text('name\u2009*');
      });

      it('should be overridden by props', () => {
        const { container, setProps } = render(<FormLabel required={false}>name</FormLabel>, {
          wrapper: (props) => <FormControl required {...props} />,
        });

        expect(container).to.have.text('name');

        setProps({ required: true });
        expect(container).to.have.text('name\u2009*');
      });
    });
  });

  const theme = extendTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            [`&.${classes.focused}`]: {
              mixBlendMode: 'darken',
            },
            [`&.${classes.error}`]: {
              mixBlendMode: 'lighten',
            },
          },
        },
      },
    },
  });

  describe('prop: color', () => {
    it('should have color secondary class', () => {
      const { container } = render(<FormLabel color="secondary" />);
      expect(container.firstChild).to.have.class(classes.colorSecondary);
    });

    it('should have the focused class and style', () => {
      const { container, getByTestId } = render(
        <CssVarsProvider theme={theme}>
          <FormLabel data-testid="FormLabel" color="secondary" focused />
        </CssVarsProvider>,
      );
      expect(container.querySelector(`.${classes.colorSecondary}`)).to.have.class(classes.focused);
      expect(getByTestId('FormLabel')).toHaveComputedStyle({
        mixBlendMode: 'darken',
      });
    });

    it('should have the error class and style, even when focused', () => {
      const { container, getByTestId } = render(
        <CssVarsProvider theme={theme}>
          <FormLabel data-testid="FormLabel" color="secondary" focused error />
        </CssVarsProvider>,
      );
      expect(container.querySelector(`.${classes.colorSecondary}`)).to.have.class(classes.error);
      expect(getByTestId('FormLabel')).toHaveComputedStyle({
        mixBlendMode: 'lighten',
      });
    });
  });
});
