import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import Input from '../Input';
import Select from '../Select';
import FormControl from './FormControl';
import FormControlContext from './FormControlContext';

describe('<FormControl />', () => {
  let mount;
  let classes;

  function setState(wrapper, state) {
    return wrapper.find('FormControl').setState(state);
  }

  function getState(wrapper) {
    return wrapper.find('FormControl').instance().state;
  }

  before(() => {
    mount = createMount();
    classes = getClasses(<FormControl />);
  });

  after(() => {
    mount.cleanUp();
  });

  describe('initial state', () => {
    it('should render a div with the root and user classes', () => {
      const wrapper = mount(<FormControl className="woofFormControl" />);

      assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofFormControl'), true);
    });

    it('should have no margin', () => {
      const wrapper = mount(<FormControl />);

      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginNormal), false);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), false);
    });

    it('should have the margin normal class', () => {
      const wrapper = mount(<FormControl margin="normal" />);

      assert.strictEqual(wrapper.getDOMNode().nodeName, 'DIV');
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginNormal), true);
    });

    it('should have the margin dense class', () => {
      const wrapper = mount(<FormControl margin="dense" />);

      assert.strictEqual(findOutermostIntrinsic(wrapper).name(), 'div');
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), true);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginNormal), false);
    });

    it('should not be filled initially', () => {
      const wrapper = mount(<FormControl />);
      assert.strictEqual(getState(wrapper).filled, false);
    });

    it('should not be focused initially', () => {
      const wrapper = mount(<FormControl />);
      assert.strictEqual(getState(wrapper).focused, false);
    });
  });

  describe('prop: required', () => {
    it('should not apply it to the DOM', () => {
      const wrapper = mount(<FormControl required />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).props().required, undefined);
    });
  });

  describe('prop: disabled', () => {
    it('will be unfocused if it gets disabled', () => {
      const wrapper = mount(<FormControl />);
      setState(wrapper, { focused: true });
      wrapper.setProps({ disabled: true });
      assert.strictEqual(getState(wrapper).focused, false);
    });
  });

  describe('input', () => {
    it('should be filled with a value', () => {
      const wrapper = mount(
        <FormControl>
          <Input value="bar" />
        </FormControl>,
      );
      assert.strictEqual(getState(wrapper).filled, true);
    });

    it('should be filled with a defaultValue', () => {
      const wrapper = mount(
        <FormControl>
          <Input defaultValue="bar" />
        </FormControl>,
      );
      assert.strictEqual(getState(wrapper).filled, true);
    });

    it('should be adorned with an endAdornment', () => {
      const wrapper = mount(
        <FormControl>
          <Input endAdornment={<div />} />
        </FormControl>,
      );
      assert.strictEqual(getState(wrapper).adornedStart, false);
    });

    it('should be adorned with a startAdornment', () => {
      const wrapper = mount(
        <FormControl>
          <Input startAdornment={<div />} />
        </FormControl>,
      );
      assert.strictEqual(getState(wrapper).adornedStart, true);
    });
  });

  describe('select', () => {
    it('should not be adorned without a startAdornment', () => {
      const wrapper = mount(
        <FormControl>
          <Select value="" />
        </FormControl>,
      );
      assert.strictEqual(getState(wrapper).adornedStart, false);
    });

    it('should be adorned with a startAdornment', () => {
      const wrapper = mount(
        <FormControl>
          <Select value="" input={<Input startAdornment={<div />} />} />
        </FormControl>,
      );
      assert.strictEqual(getState(wrapper).adornedStart, true);
    });
  });

  describe('muiFormControl child context', () => {
    let wrapper;
    let muiFormControlContext;

    beforeEach(() => {
      wrapper = mount(
        <FormControl>
          <FormControlContext.Consumer>
            {context => {
              muiFormControlContext = context;
            }}
          </FormControlContext.Consumer>
        </FormControl>,
      );
    });

    describe('from state', () => {
      it('should have the filled state from the instance', () => {
        assert.strictEqual(muiFormControlContext.filled, false);
        setState(wrapper, { filled: true });
        assert.strictEqual(muiFormControlContext.filled, true);
      });

      it('should have the focused state from the instance', () => {
        assert.strictEqual(muiFormControlContext.focused, false);
        setState(wrapper, { focused: true });
        assert.strictEqual(muiFormControlContext.focused, true);
      });

      it('should have the adornedStart state from the instance', () => {
        assert.strictEqual(muiFormControlContext.adornedStart, false);
        setState(wrapper, { adornedStart: true });
        assert.strictEqual(muiFormControlContext.adornedStart, true);
      });
    });

    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.required, false);
        wrapper.setProps({ required: true });
        assert.strictEqual(muiFormControlContext.required, true);
      });

      it('should have the error prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.error, false);
        wrapper.setProps({ error: true });
        assert.strictEqual(muiFormControlContext.error, true);
      });

      it('should have the margin prop from the instance', () => {
        assert.strictEqual(muiFormControlContext.margin, 'none');
        wrapper.setProps({ margin: 'dense' });
        assert.strictEqual(muiFormControlContext.margin, 'dense');
      });
    });

    describe('callbacks', () => {
      describe('onFilled', () => {
        it('should set the filled state', () => {
          assert.strictEqual(muiFormControlContext.filled, false);
          muiFormControlContext.onFilled();
          assert.strictEqual(muiFormControlContext.filled, true);
          muiFormControlContext.onFilled();
          assert.strictEqual(muiFormControlContext.filled, true);
        });
      });

      describe('onEmpty', () => {
        it('should clean the filled state', () => {
          muiFormControlContext.onFilled();
          assert.strictEqual(muiFormControlContext.filled, true);
          muiFormControlContext.onEmpty();
          assert.strictEqual(muiFormControlContext.filled, false);
          muiFormControlContext.onEmpty();
          assert.strictEqual(muiFormControlContext.filled, false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', () => {
          assert.strictEqual(getState(wrapper).focused, false);
          muiFormControlContext.onFocus();
          assert.strictEqual(getState(wrapper).focused, true);
          muiFormControlContext.onFocus();
          assert.strictEqual(getState(wrapper).focused, true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          assert.strictEqual(getState(wrapper).focused, false);
          muiFormControlContext.onFocus();
          assert.strictEqual(getState(wrapper).focused, true);
          muiFormControlContext.onBlur();
          assert.strictEqual(getState(wrapper).focused, false);
          muiFormControlContext.onBlur();
          assert.strictEqual(getState(wrapper).focused, false);
        });
      });
    });
  });
});
