import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import FormControlContext from '../FormControl/FormControlContext';
import InputAdornment from '../InputAdornment';
import Textarea from './Textarea';
import InputBase from './InputBase';
import TextField from '../TextField';
import Select from '../Select';

describe('<InputBase />', () => {
  let classes;
  let mount;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<InputBase />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<InputBase />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render an <input /> inside the div', () => {
    const wrapper = mount(<InputBase />);
    const input = wrapper.find('input');
    assert.strictEqual(input.name(), 'input');
    assert.strictEqual(input.props().type, 'text');
    assert.strictEqual(input.hasClass(classes.input), true);
    assert.strictEqual(input.props().required, undefined);
  });

  describe('multiline', () => {
    it('should render an <Textarea /> when passed the multiline prop', () => {
      const wrapper = mount(<InputBase multiline />);
      assert.strictEqual(wrapper.find(Textarea).length, 1);
    });

    it('should render an <textarea /> when passed the multiline and rows props', () => {
      const wrapper = mount(<InputBase multiline rows="4" />);
      assert.strictEqual(wrapper.find('textarea').length, 1);
    });

    it('should forward the value to the Textarea', () => {
      const wrapper = mount(<InputBase multiline rowsMax="4" value="" />);
      assert.strictEqual(wrapper.find(Textarea).props().value, '');
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const wrapper = mount(<InputBase disabled />);
      const input = wrapper.find('input');
      assert.strictEqual(input.name(), 'input');
      assert.strictEqual(input.hasClass(classes.input), true);
      assert.strictEqual(input.hasClass(classes.disabled), true);
    });

    it('should reset the focused state', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const ref = React.createRef();
      const wrapper = mount(<InputBase inputRef={ref} onBlur={handleBlur} onFocus={handleFocus} />);

      // We simulate a focused input that is getting disabled.'
      wrapper.find('input').simulate('focus');
      // check if focus called
      assert.strictEqual(handleFocus.callCount, 1);
      // set input to disable
      wrapper.setProps({ disabled: true });
      // check if blur called
      assert.strictEqual(handleBlur.callCount, 1);
      // check if focus not initiated again
      assert.strictEqual(handleFocus.callCount, 1);
    });

    // IE 11 bug
    it('should not respond the focus event when disabled', () => {
      const wrapper = mount(<InputBase disabled />);
      const event = {
        stopPropagation: spy(),
      };
      wrapper.find('input').simulate('focus', event);
      assert.strictEqual(event.stopPropagation.callCount, 1);
    });
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = mount(<InputBase {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      const initialValue = [];
      const stubValue = 'do not work';
      const wrapper = mount(<InputBase value={initialValue} />);
      const inputEl = wrapper.find('input');
      inputEl.instance().value = stubValue;
      inputEl.simulate('change', { target: { value: stubValue } });

      assert.strictEqual(inputEl.props().value, initialValue);
    });

    ['', 0].forEach(value => {
      describe(`${typeof value} value`, () => {
        let wrapper;
        let handleFilled;
        let handleEmpty;

        before(() => {
          handleEmpty = spy();
          handleFilled = spy();
          wrapper = mount(
            <InputBase value={value} onFilled={handleFilled} onEmpty={handleEmpty} />,
          );
        });

        // don't test number because zero is a empty state, whereas '' is not
        if (typeof value !== 'number') {
          it('should have called the handleEmpty callback', () => {
            assert.strictEqual(handleEmpty.callCount, 1);
          });

          it('should fire the onFilled callback when dirtied', () => {
            assert.strictEqual(handleFilled.callCount, 0);
            wrapper.setProps({ value: typeof value === 'number' ? 2 : 'hello' });
            assert.strictEqual(handleFilled.callCount, 1);
          });

          it('should fire the onEmpty callback when dirtied', () => {
            assert.strictEqual(handleEmpty.callCount, 1);
            wrapper.setProps({ value });
            assert.strictEqual(handleEmpty.callCount, 2);
          });
        }
      });
    });
  });

  describe('prop: inputComponent', () => {
    it('should accept any html component', () => {
      const wrapper = mount(<InputBase inputComponent="span" />);
      assert.strictEqual(wrapper.find('span').length, 1);
    });

    it('should inject onBlur and onFocus', () => {
      let injectedProps;
      function MyInputBase(props) {
        injectedProps = props;
        const { inputRef, ...other } = props;
        return <input ref={inputRef} {...other} />;
      }

      MyInputBase.propTypes = {
        inputRef: PropTypes.func.isRequired,
      };

      mount(<InputBase inputComponent={MyInputBase} />);
      assert.strictEqual(typeof injectedProps.onBlur, 'function');
      assert.strictEqual(typeof injectedProps.onFocus, 'function');
    });
  });

  // Note the initial callback when
  // uncontrolled only fires for a full mount
  describe('uncontrolled', () => {
    function setup() {
      const handleEmpty = spy();
      const handleFilled = spy();
      const wrapper = mount(
        <InputBase onFilled={handleFilled} defaultValue="hell" onEmpty={handleEmpty} />,
      );
      return { wrapper, handleEmpty, handleFilled };
    }

    it('should fire the onFilled callback when dirtied', () => {
      const { wrapper, handleFilled } = setup();
      assert.strictEqual(handleFilled.callCount, 1);
      wrapper.find('input').simulate('change');
      assert.strictEqual(handleFilled.callCount, 2);
    });

    it('should fire the onEmpty callback when cleaned', () => {
      const { wrapper, handleEmpty } = setup();
      // Because of mount() this hasn't fired since there is no mounting
      assert.strictEqual(handleEmpty.callCount, 0);
      wrapper.find('input').instance().value = '';
      wrapper.find('input').simulate('change', {
        target: {
          value: '',
        },
      });
      assert.strictEqual(handleEmpty.callCount, 1);
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;
    let muiFormControl;

    function setFormControlContext(muiFormControlContext) {
      muiFormControl = muiFormControlContext;
      wrapper.setProps({ context: muiFormControlContext });
    }

    beforeEach(() => {
      // we need a class for enzyme otherwise: "Can't call ::setState on functional component"
      // eslint-disable-next-line react/prefer-stateless-function
      class Provider extends React.Component {
        render() {
          const { context, ...other } = this.props;

          return (
            <FormControlContext.Provider value={context}>
              <InputBase {...other} />
            </FormControlContext.Provider>
          );
        }
      }
      Provider.propTypes = {
        context: PropTypes.object,
      };

      wrapper = mount(<Provider />);
    });

    it('should have the formControl class', () => {
      setFormControlContext({});
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.formControl), true);
    });

    describe('callbacks', () => {
      let focus;

      beforeEach(() => {
        focus = spy();
        wrapper.find('input').instance().focus = focus;
        setFormControlContext({
          onFilled: spy(),
          onEmpty: spy(),
          onFocus: spy(),
          onBlur: spy(),
        });
      });

      it('should fire the onFilled muiFormControl and props callback when dirtied', () => {
        const handleFilled = spy();
        wrapper.setProps({
          onFilled: handleFilled,
        });

        wrapper.find('input').instance().value = 'hello';
        wrapper.find('input').simulate('change', { target: { value: 'hello' } });
        assert.strictEqual(handleFilled.callCount, 1);
        assert.strictEqual(muiFormControl.onFilled.callCount, 1);
      });

      it('should fire the onEmpty muiFormControl and props callback when cleaned', () => {
        const handleEmpty = spy();

        // Set value to be cleared
        wrapper.find('input').instance().value = 'test';
        wrapper.find('input').simulate('change', {
          target: {
            value: 'test',
          },
        });
        wrapper.setProps({
          onEmpty: handleEmpty,
        });
        assert.strictEqual(handleEmpty.callCount, 0);
        // Clear value
        wrapper.find('input').instance().value = '';
        wrapper.find('input').simulate('change', {
          target: { value: '' },
        });
        assert.strictEqual(handleEmpty.callCount, 1);
        assert.strictEqual(muiFormControl.onEmpty.callCount, 2);
      });

      it('should fire the onFocus muiFormControl', () => {
        const handleFocus = spy();
        wrapper.setProps({
          onFocus: handleFocus,
        });

        wrapper.find('input').simulate('focus');
        assert.strictEqual(handleFocus.callCount, 1);
        assert.strictEqual(muiFormControl.onFocus.callCount, 1);
      });

      it('should fire the onBlur muiFormControl', () => {
        const handleBlur = spy();
        wrapper.setProps({
          onBlur: handleBlur,
        });

        wrapper.find('input').simulate('blur');
        assert.strictEqual(handleBlur.callCount, 1);
        assert.strictEqual(muiFormControl.onBlur.callCount, 1);
      });

      it('should focus and fire the onClick prop', () => {
        const event = {};
        const handleClick = spy();
        wrapper.setProps({
          onClick: handleClick,
        });

        wrapper.find('div').simulate('click', event);
        assert.strictEqual(handleClick.callCount, 1);
        assert.strictEqual(focus.callCount, 1);
      });
    });

    describe('error', () => {
      beforeEach(() => {
        setFormControlContext({ error: true });
      });

      it('should have the error class', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.error), true);
      });

      it('should be overridden by props', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.error), true);
        wrapper.setProps({ error: false });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.error), false);
        wrapper.setProps({ error: true });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.error), true);
      });
    });

    describe('margin', () => {
      describe('context margin: dense', () => {
        beforeEach(() => {
          setFormControlContext({ margin: 'dense' });
        });

        it('should have the inputMarginDense class', () => {
          assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), true);
        });
      });

      it('should be overridden by props', () => {
        assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), false);
        wrapper.setProps({ margin: 'dense' });
        assert.strictEqual(wrapper.find('input').hasClass(classes.inputMarginDense), true);
      });
    });

    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        setFormControlContext({ required: true });
        const input = wrapper.find('input');
        assert.strictEqual(input.props().required, true);
      });
    });

    describe('focused', () => {
      it('prioritizes context focus', () => {
        wrapper.find('input').simulate('focus');
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.focused), true);

        setFormControlContext({ focused: false });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.focused), false);

        setFormControlContext({ focused: true });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.focused), true);
      });
    });
  });

  describe('mount', () => {
    it('should be able to access the native input', () => {
      const handleRef = spy();
      mount(<InputBase inputRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });

    it('should be able to access the native textarea', () => {
      const handleRef = spy();
      mount(<InputBase multiline inputRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });

  describe('prop: inputProps', () => {
    it('should apply the props on the input', () => {
      const wrapper = mount(<InputBase inputProps={{ className: 'foo', maxLength: 5 }} />);
      const input = wrapper.find('input');
      assert.strictEqual(input.hasClass('foo'), true);
      assert.strictEqual(input.hasClass(classes.input), true);
      assert.strictEqual(input.props().maxLength, 5);
    });

    it('should be able to get a ref', () => {
      const handleRef = spy();
      mount(<InputBase inputProps={{ ref: handleRef }} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });

  describe('prop: startAdornment, prop: endAdornment', () => {
    it('should render adornment before input', () => {
      const wrapper = mount(
        <InputBase startAdornment={<InputAdornment position="start">$</InputAdornment>} />,
      );

      assert.strictEqual(
        findOutermostIntrinsic(wrapper)
          .childAt(0)
          .type(),
        InputAdornment,
      );
    });

    it('should render adornment after input', () => {
      const wrapper = mount(
        <InputBase endAdornment={<InputAdornment position="end">$</InputAdornment>} />,
      );

      assert.strictEqual(
        findOutermostIntrinsic(wrapper)
          .childAt(1)
          .type(),
        InputAdornment,
      );
    });

    it('should allow a Select as an adornment', () => {
      mount(
        <TextField
          value=""
          name="text"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select value="a" name="suffix" />
              </InputAdornment>
            ),
          }}
        />,
      );
    });
  });

  describe('prop: inputRef', () => {
    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      mount(<InputBase inputRef={ref} />);
      assert.strictEqual(ref.current.tagName, 'INPUT');
    });

    it('should be able to return the textarea node via a ref object', () => {
      const ref = React.createRef();
      mount(<InputBase multiline inputRef={ref} />);
      assert.strictEqual(ref.current.tagName, 'TEXTAREA');
    });
  });
});
