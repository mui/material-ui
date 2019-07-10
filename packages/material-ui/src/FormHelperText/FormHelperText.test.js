import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import FormHelperText from './FormHelperText';
import FormControl from '../FormControl';

describe('<FormHelperText />', () => {
  let mount;
  const render = createClientRender({ strict: true });
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FormHelperText />);
  });

  afterEach(() => {
    cleanup();
  });

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    mount,
    refInstanceof: window.HTMLParagraphElement,
    testComponentPropWith: 'div',
    after: () => mount.cleanUp(),
  }));

  describe('prop: error', () => {
    it('should have an error class', () => {
      const { container } = render(<FormHelperText error />);
      expect(container.firstChild).to.have.class(classes.error);
    });
  });

  describe('with FormControl', () => {
    ['error', 'disabled'].forEach(visualState => {
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
