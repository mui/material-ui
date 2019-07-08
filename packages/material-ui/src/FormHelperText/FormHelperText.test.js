import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { cleanup, createClientRender } from 'test/utils/createClientRender';
import FormHelperText from './FormHelperText';
import FormControlContext from '../FormControl/FormControlContext';

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

  describe('with muiFormControl context', () => {
    /**
     * @type {ReturnType<typeof render>}
     */
    let wrapper;

    function setFormControlContext(muiFormControlContext) {
      wrapper.setProps({ context: muiFormControlContext });
    }

    beforeEach(() => {
      function ConnectedFormHelperText(props) {
        const { context, ...other } = props;

        return (
          <FormControlContext.Provider value={context}>
            <FormHelperText {...other}>Foo</FormHelperText>
          </FormControlContext.Provider>
        );
      }
      ConnectedFormHelperText.propTypes = {
        context: PropTypes.object,
      };

      wrapper = render(<ConnectedFormHelperText />);
    });

    ['error', 'disabled'].forEach(visualState => {
      describe(visualState, () => {
        beforeEach(() => {
          setFormControlContext({ [visualState]: true });
        });

        it(`should have the ${visualState} class`, () => {
          expect(wrapper.container.firstChild).to.have.class(classes[visualState]);
        });

        it('should be overridden by props', () => {
          expect(wrapper.container.firstChild).to.have.class(classes[visualState]);

          wrapper.setProps({ [visualState]: false });
          expect(wrapper.container.firstChild).not.to.have.class(classes[visualState]);

          wrapper.setProps({ [visualState]: true });
          expect(wrapper.container.firstChild).to.have.class(classes[visualState]);
        });
      });
    });

    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({ margin: 'dense' });
        });

        it('should have the dense class', () => {
          expect(wrapper.container.firstChild).to.have.class(classes.marginDense);
        });
      });

      it('should be overridden by props', () => {
        expect(wrapper.container.firstChild).not.to.have.class(classes.marginDense);
        wrapper.setProps({ margin: 'dense' });
        expect(wrapper.container.firstChild).to.have.class(classes.marginDense);
      });
    });
  });
});
