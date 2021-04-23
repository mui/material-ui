import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import FormHelperText, { formHelperTextClasses as classes } from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

describe('<FormHelperText />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    mount,
    refInstanceof: window.HTMLParagraphElement,
    testComponentPropWith: 'div',
    muiName: 'MuiFormHelperText',
    testVariantProps: { size: 'small' },
    skip: ['componentsProp'],
  }));

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormHelperText error />);
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('prop: disableTypography', () => {
    it('should not add a typography component', () => {
      const { getByTestId } = render(
        <FormHelperText disableTypography data-testid="FormHelperText">
          <span name="test">Pizza</span>
        </FormHelperText>,
      );

      expect(getByTestId('FormHelperText').firstChild).to.have.attribute('name', 'test');
    });

    it('should auto disable when passed a Typography component', () => {
      const { getByTestId } = render(
        <FormHelperText data-testid="FormHelperText">
          <Typography component="span" name="test">
            Pizza
          </Typography>
        </FormHelperText>,
      );

      expect(getByTestId('FormHelperText').firstChild).to.have.attribute('name', 'test');
    });
  });

  describe('componentProps: typography', () => {
    it('should spread its contents to the typography element', () => {
      const { getByTestId } = render(
        <FormHelperText
          componentProps={{
            typography: {
              'data-testid': 'labelTypography',
              name: 'test',
            },
          }}
        >
          Pizza
        </FormHelperText>,
      );

      expect(getByTestId('labelTypography')).to.have.attribute('name', 'test');
    });
  });

  describe('with FormControl', () => {
    ['error', 'disabled'].forEach((visualState) => {
      describe(visualState, () => {
        function FormHelperTextInFormControl({ children, ...props }) {
          return (
            <FormControl {...{ [visualState]: true }}>
              <FormHelperText {...props} data-testid="test">
                {children}
              </FormHelperText>
            </FormControl>
          );
        }

        it(`should have the ${visualState} class`, () => {
          const { getByTestId } = render(
            <FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>,
          );

          expect(getByTestId('test')).to.have.class(classes[visualState]);
        });

        it('should be overridden by props', () => {
          const { getByTestId, setProps } = render(
            <FormHelperTextInFormControl {...{ [visualState]: false }}>
              Foo
            </FormHelperTextInFormControl>,
          );

          expect(getByTestId('test')).not.to.have.class(classes[visualState]);

          setProps({ [visualState]: true });
          expect(getByTestId('test')).to.have.class(classes[visualState]);
        });
      });
    });

    describe('size', () => {
      describe('small margin FormControl', () => {
        it('should have the small class', () => {
          const { getByTestId } = render(
            <FormControl size="small">
              <FormHelperText data-testid="test">Foo</FormHelperText>
            </FormControl>,
          );

          expect(getByTestId('test')).to.have.class(classes.sizeSmall);
        });
      });

      it('should be overridden by props', () => {
        function FormHelperTextInFormControl(props) {
          return (
            <FormControl size="medium">
              <FormHelperText {...props} data-testid="test">
                Foo
              </FormHelperText>
            </FormControl>
          );
        }

        const { getByTestId, setProps } = render(
          <FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>,
        );

        expect(getByTestId('test')).not.to.have.class(classes.sizeSmall);
        setProps({ size: 'small' });
        expect(getByTestId('test')).to.have.class(classes.sizeSmall);
      });
    });
  });
});
