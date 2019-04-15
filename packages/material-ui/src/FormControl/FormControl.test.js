import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import Input from '../Input';
import Select from '../Select';
import FormControl from './FormControl';
import FormControlContext from './FormControlContext';

describe('<FormControl />', () => {
  let mount;
  let classes;

  function TestComponent(props) {
    const context = React.useContext(FormControlContext);
    if (props.fn) {
      props.fn(context);
    }
    return null;
  }

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FormControl />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<FormControl />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'fieldset',
  }));

  describe('initial state', () => {
    it('should have no margin', () => {
      const wrapper = mount(<FormControl />);

      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginNormal), false);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), false);
    });

    it('should have the margin normal class', () => {
      const wrapper = mount(<FormControl margin="normal" />);

      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginNormal), true);
    });

    it('should have the margin dense class', () => {
      const wrapper = mount(<FormControl margin="dense" />);

      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginDense), true);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.marginNormal), false);
    });

    it('should not be filled initially', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].filled, false);
    });

    it('should not be focused initially', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].focused, false);
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
      const testFunction = spy();
      const wrapper = mount(
        <FormControl>
          <Input />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].focused, false);
      wrapper.find('input').simulate('focus');
      assert.strictEqual(testFunction.args[1][0].focused, true);
      wrapper.setProps({ disabled: true });
      assert.strictEqual(testFunction.args[2][0].focused, false);
    });
  });

  describe('input', () => {
    it('should be filled with a value', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <Input value="bar" />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].filled, true);
    });

    it('should be filled with a defaultValue', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <Input defaultValue="bar" />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].filled, true);
    });

    it('should not be adornedStart with an endAdornment', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <Input endAdornment={<div />} />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].adornedStart, false);
    });

    it('should be adornedStar with a startAdornment', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <Input startAdornment={<div />} />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].adornedStart, true);
    });
  });

  describe('select', () => {
    it('should not be adorned without a startAdornment', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <Select value="" />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].adornedStart, false);
    });

    it('should be adorned with a startAdornment', () => {
      const testFunction = spy();
      mount(
        <FormControl>
          <Select value="" input={<Input startAdornment={<div />} />} />
          <TestComponent fn={testFunction} />
        </FormControl>,
      );
      assert.strictEqual(testFunction.args[0][0].adornedStart, true);
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
          assert.strictEqual(muiFormControlContext.focused, false);
          muiFormControlContext.onFocus();
          assert.strictEqual(muiFormControlContext.focused, true);
          muiFormControlContext.onFocus();
          assert.strictEqual(muiFormControlContext.focused, true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          assert.strictEqual(muiFormControlContext.focused, false);
          muiFormControlContext.onFocus();
          assert.strictEqual(muiFormControlContext.focused, true);
          muiFormControlContext.onBlur();
          assert.strictEqual(muiFormControlContext.focused, false);
          muiFormControlContext.onBlur();
          assert.strictEqual(muiFormControlContext.focused, false);
        });
      });
    });
  });
});
