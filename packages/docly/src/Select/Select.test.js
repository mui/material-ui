import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses, createMount } from '../test-utils';
import MenuItem from '../MenuItem';
import Input from '../Input';
import Select from './Select';
import { spy } from 'sinon';

describe('<Select />', () => {
  let shallow;
  let classes;
  let mount;
  const defaultProps = {
    input: <Input />,
    children: [<MenuItem value="1">1</MenuItem>, <MenuItem value="2">2</MenuItem>],
  };

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Select {...defaultProps} />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a correct top element', () => {
    const wrapper = shallow(<Select {...defaultProps} />);
    assert.strictEqual(wrapper.type(), Input);
  });

  it('should provide the classes to the input component', () => {
    const wrapper = shallow(<Select {...defaultProps} />);
    assert.deepEqual(wrapper.props().inputProps.classes, classes);
  });

  describe('prop: inputProps', () => {
    it('should be able to provide a custom classes property', () => {
      const wrapper = shallow(
        <Select
          {...defaultProps}
          inputProps={{
            classes: { root: 'root' },
          }}
        />,
      );
      assert.deepEqual(wrapper.props().inputProps.classes, {
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
      const wrapper = mount(<Select onChange={onChangeHandler} {...defaultProps} value={'1'} />);
      wrapper.find('[role="button"]').simulate('click');
      wrapper
        .find(MenuItem)
        .at(1)
        .simulate('click');
      const selected = onChangeHandler.args[0][1];
      assert.strictEqual(React.isValidElement(selected), true);
    });
  });
});
