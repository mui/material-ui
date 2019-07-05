import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import FormHelperText from './FormHelperText';
import FormControl from '../FormControl';
import { createMuiTheme, MuiThemeProvider } from '../styles';

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

  after(() => {
    mount.cleanUp();
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
    ['error', 'disabled'].forEach(visualState => {
      describe(visualState, () => {
        it(`should have the ${visualState} class`, () => {
          const { getByText } = render(
            <FormControl {...{ [visualState]: true }}>
              <FormHelperText>Foo</FormHelperText>
            </FormControl>,
          );
          expect(getByText(/Foo/)).to.have.class(classes[visualState]);
        });

        it('should be overridden by props', () => {
          function FormHelperTextInFormControl(props) {
            return (
              <FormControl {...{ [visualState]: true }}>
                <FormHelperText {...props}>Foo</FormHelperText>
              </FormControl>
            );
          }

          const { getByText, setProps } = render(
            <FormHelperTextInFormControl>Foo</FormHelperTextInFormControl>,
          );

          expect(getByText(/Foo/)).to.have.class(classes[visualState]);

          setProps({ [visualState]: false });
          expect(getByText(/Foo/)).not.to.have.class(classes[visualState]);

          setProps({ [visualState]: true });
          expect(getByText(/Foo/)).to.have.class(classes[visualState]);
        });
      });
    });
  });

  describe('margin', () => {
    it('has no dense margin by default', () => {
      const { getByText } = render(<FormHelperText>Foo</FormHelperText>);

      expect(getByText(/Foo/)).not.to.have.class(classes.marginDense);
    });

    it('has dense margin in a dense theme', () => {
      const { getByText } = render(
        <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
          <FormHelperText>Foo</FormHelperText>
        </MuiThemeProvider>,
      );

      expect(getByText(/Foo/)).to.have.class(classes.marginDense);
    });

    it('has dense margin in a dense FormControl', () => {
      const { getByText } = render(
        <FormControl margin="dense">
          <FormHelperText>Foo</FormHelperText>
        </FormControl>,
      );

      expect(getByText(/Foo/)).to.have.class(classes.marginDense);
    });

    it('can have dense margin via props', () => {
      const { getByText } = render(<FormHelperText margin="dense">Foo</FormHelperText>);

      expect(getByText(/Foo/)).to.have.class(classes.marginDense);
    });

    it('prefers FormControl margin over dense theme', () => {
      const { getByText } = render(
        <MuiThemeProvider theme={createMuiTheme({ dense: true })}>
          <FormControl margin="none">
            <FormHelperText>Foo</FormHelperText>
          </FormControl>
        </MuiThemeProvider>,
      );

      expect(getByText(/Foo/)).not.to.have.class(classes.marginDense);
    });
  });
});
