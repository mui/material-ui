import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import FormLabel from './FormLabel';
import FormControlContext from '../FormControl/FormControlContext';

describe('<FormLabel />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<FormLabel />);
  });

  it('should render a <label />', () => {
    const wrapper = findOutermostIntrinsic(mount(<FormLabel className="woofFormLabel" />));
    assert.strictEqual(wrapper.name(), 'label');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofFormLabel'), true);
  });

  describe('prop: required', () => {
    it('should show an asterisk if required is set', () => {
      const wrapper = mount(<FormLabel required />);
      const text = wrapper.text();
      assert.strictEqual(text.slice(-1), '*');
      assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 1);
    });

    it('should not show an asterisk by default', () => {
      const wrapper = mount(<FormLabel />);
      assert.strictEqual(wrapper.find('[data-mui-test="FormLabelAsterisk"]').length, 0);
      assert.strictEqual(wrapper.text().includes('*'), false);
    });
  });

  describe('prop: error', () => {
    it('should have an error class', () => {
      const wrapper = mount(<FormLabel required error />);
      const asteriskWrapper = wrapper.find('[data-mui-test="FormLabelAsterisk"]');
      assert.strictEqual(asteriskWrapper.length, 1);
      assert.strictEqual(asteriskWrapper.hasClass(classes.error), true);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.error), true);
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
            <FormLabel {...other}>Foo</FormLabel>
          </FormControlContext.Provider>
        );
      }
      Provider.propTypes = {
        context: PropTypes.object,
      };

      wrapper = mount(<Provider />);
    });

    ['error', 'focused'].forEach(visualState => {
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

    describe('required', () => {
      beforeEach(() => {
        setFormControlContext({ required: true });
      });

      it('should show an asterisk', () => {
        assert.strictEqual(
          findOutermostIntrinsic(wrapper).find('[data-mui-test="FormLabelAsterisk"]').length,
          1,
        );
      });

      it('should be overridden by props', () => {
        assert.strictEqual(
          findOutermostIntrinsic(wrapper).find('[data-mui-test="FormLabelAsterisk"]').length,
          1,
        );
        wrapper.setProps({ required: false });
        assert.strictEqual(
          findOutermostIntrinsic(wrapper).find('[data-mui-test="FormLabelAsterisk"]').length,
          0,
        );
        wrapper.setProps({ required: true });
        assert.strictEqual(
          findOutermostIntrinsic(wrapper).find('[data-mui-test="FormLabelAsterisk"]').length,
          1,
        );
      });
    });
  });
});
