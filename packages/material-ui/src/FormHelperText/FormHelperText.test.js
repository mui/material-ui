import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import FormHelperText from './FormHelperText';
import FormControlContext from '../FormControl/FormControlContext';

describe('<FormHelperText />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FormHelperText />);
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
      const wrapper = findOutermostIntrinsic(mount(<FormHelperText error />));
      assert.strictEqual(wrapper.hasClass(classes.error), true);
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;

    function setFormControlContext(muiFormControlContext) {
      wrapper.setProps({ context: muiFormControlContext });
    }

    beforeEach(() => {
      function Provider(props) {
        const { context, ...other } = props;

        return (
          <FormControlContext.Provider value={context}>
            <FormHelperText {...other}>Foo</FormHelperText>
          </FormControlContext.Provider>
        );
      }
      Provider.propTypes = {
        context: PropTypes.object,
      };

      wrapper = mount(<Provider />);
    });
    ['error', 'disabled'].forEach(visualState => {
      describe(visualState, () => {
        beforeEach(() => {
          setFormControlContext({ [visualState]: true });
        });

        it(`should have the ${visualState} class`, () => {
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes[visualState]), true);
        });

        it('should be overridden by props', () => {
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes[visualState]), true);
          wrapper.setProps({ [visualState]: false });
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes[visualState]), false);
          wrapper.setProps({ [visualState]: true });
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes[visualState]), true);
        });
      });
    });

    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({ margin: 'dense' });
        });

        it('should have the dense class', () => {
          assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), true);
        });
      });

      it('should be overridden by props', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), false);
        wrapper.setProps({ margin: 'dense' });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), true);
      });
    });
  });
});
