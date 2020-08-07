import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import FormHelperText from './FormHelperText';
import FormControl from '../FormControl';

describe('<FormHelperText />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<FormHelperText />);
  });

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    mount,
    refInstanceof: window.HTMLParagraphElement,
    testComponentPropWith: 'div',
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
        function FormHelperTextInFormControl(props) {
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

          expect(getByText(/Foo/)).to.have.class(classes[visualState]);
        });

        it('should be overridden by props', () => {
          const { getByText, setProps } = render(
            <FormHelperTextInFormControl {...{ [visualState]: false }}>
              Foo
            </FormHelperTextInFormControl>,
          );

          expect(getByText(/Foo/)).not.to.have.class(classes[visualState]);

          setProps({ [visualState]: true });
          expect(getByText(/Foo/)).to.have.class(classes[visualState]);
        });
      });
    });

    describe('margin', () => {
      describe('dense margin FormControl', () => {
        it('should have the dense class', () => {
          const { getByText } = render(
            <FormControl margin="dense">
              <FormHelperText>Foo</FormHelperText>
            </FormControl>,
          );

          expect(getByText(/Foo/)).to.have.class(classes.marginDense);
        });
      });

      it('should be overridden by props', () => {
        function FormHelperTextInFormControl(props) {
          return (
            <FormControl dense="none">
              <FormHelperText {...props}>Foo</FormHelperText>
            </FormControl>
          );
        }

        const { getByText, setProps } = render(
          <FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>,
        );

        expect(getByText(/Foo/)).not.to.have.class(classes.marginDense);
        setProps({ margin: 'dense' });
        expect(getByText(/Foo/)).to.have.class(classes.marginDense);
      });
    });
  });
});
