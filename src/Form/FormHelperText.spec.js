import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import FormHelperText from './FormHelperText';

describe('<FormHelperText />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<FormHelperText />);
  });

  it('should render a <p />', () => {
    const wrapper = shallow(<FormHelperText className="woofHelperText" />);
    assert.strictEqual(wrapper.name(), 'p');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woofHelperText'), true, 'should have the user class');
  });

  describe('prop: component', () => {
    it('should render the prop component', () => {
      const wrapper = shallow(<FormHelperText component="div" />);
      assert.strictEqual(wrapper.name(), 'div');
    });
  });

  describe('prop: error', () => {
    it('should have an error class', () => {
      const wrapper = shallow(<FormHelperText error />);
      assert.strictEqual(wrapper.hasClass(classes.error), true);
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setContext({ muiFormControl });
    }

    beforeEach(() => {
      wrapper = shallow(<FormHelperText>Foo</FormHelperText>);
    });
    ['error', 'disabled'].forEach(visualState => {
      describe(visualState, () => {
        beforeEach(() => {
          setFormControlContext({ [visualState]: true });
        });

        it(`should have the ${visualState} class`, () => {
          assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
        });

        it('should be overridden by props', () => {
          assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
          wrapper.setProps({ [visualState]: false });
          assert.strictEqual(wrapper.hasClass(classes[visualState]), false);
          wrapper.setProps({ [visualState]: true });
          assert.strictEqual(wrapper.hasClass(classes[visualState]), true);
        });
      });
    });

    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({ margin: 'dense' });
        });

        it('should have the dense class', () => {
          assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
        });
      });

      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.hasClass(classes.marginDense), false);
        wrapper.setProps({ margin: 'dense' });
        assert.strictEqual(wrapper.hasClass(classes.marginDense), true);
      });
    });
  });
});
