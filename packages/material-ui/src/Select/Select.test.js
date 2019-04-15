import React from 'react';
import { assert } from 'chai';
import { getClasses, createMount, describeConformance } from '@material-ui/core/test-utils';
import MenuItem from '../MenuItem';
import Input from '../Input';
import Select from './Select';
import { spy } from 'sinon';

describe('<Select />', () => {
  let classes;
  let mount;
  const defaultProps = {
    input: <Input />,
    children: [
      <MenuItem key="1" value="1">
        1
      </MenuItem>,
      <MenuItem key="2" value="2">
        2
      </MenuItem>,
    ],
    value: '1',
  };

  before(() => {
    classes = getClasses(<Select {...defaultProps} />);
    // StrictModeViolation: test uses MenuItem
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Select {...defaultProps} />, () => ({
    classes,
    inheritComponent: Input,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'rootClass'],
  }));

  it('should provide the classes to the input component', () => {
    const wrapper = mount(<Select {...defaultProps} />);
    assert.deepEqual(wrapper.find(Input).props().inputProps.classes, classes);
  });

  describe('prop: inputProps', () => {
    it('should be able to provide a custom classes property', () => {
      const wrapper = mount(
        <Select
          {...defaultProps}
          inputProps={{
            classes: { root: 'root' },
          }}
        />,
      );
      assert.deepEqual(wrapper.find(Input).props().inputProps.classes, {
        ...classes,
        root: `${classes.root} root`,
      });
    });
  });

  it('should be able to mount the component', () => {
    const wrapper = mount(
      <Select {...defaultProps} value={10}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>,
    );
    assert.strictEqual(wrapper.find('input').props().value, 10);
  });

  describe('prop: onChange', () => {
    it('should get selected element from arguments', () => {
      const onChangeHandler = spy();
      const wrapper = mount(<Select onChange={onChangeHandler} {...defaultProps} value="1" />);
      wrapper.find('[role="button"]').simulate('click');
      wrapper
        .find(MenuItem)
        .at(1)
        .simulate('click');
      const selected = onChangeHandler.args[0][1];
      assert.strictEqual(React.isValidElement(selected), true);
    });
  });

  describe('prop: value', () => {
    it('should be able to use an object', () => {
      const value = {};
      const wrapper = mount(
        <Select {...defaultProps} value={value}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={value}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );
      assert.strictEqual(wrapper.find(`.${classes.select}`).text(), 'Twenty');
    });
  });
});
