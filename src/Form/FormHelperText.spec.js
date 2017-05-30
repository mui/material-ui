// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import FormHelperText, { styleSheet } from './FormHelperText';

describe('<FormHelperText />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a <p />', () => {
    const wrapper = shallow(<FormHelperText className="woof" />);
    assert.strictEqual(wrapper.name(), 'p');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
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
      wrapper.setContext({ ...wrapper.context(), muiFormControl });
    }

    beforeEach(() => {
      wrapper = shallow(<FormHelperText>Foo</FormHelperText>);
    });
    ['error'].forEach(visualState => {
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
  });
});
