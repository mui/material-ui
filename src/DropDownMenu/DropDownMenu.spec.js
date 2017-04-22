/* eslint-env mocha */
import React, {PropTypes, Component} from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import keycode from 'keycode';
import {spy} from 'sinon';
import DropDownMenu from './DropDownMenu';
import getMuiTheme from '../styles/getMuiTheme';
import MenuItem from '../MenuItem';
import Menu from '../Menu/Menu';
import IconButton from '../IconButton';
import TestUtils from 'react-addons-test-utils';

describe('<DropDownMenu />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  describe('prop: value', () => {
    it('should display the right selected value text', () => {
      const wrapper = shallowWithContext(
        <DropDownMenu value={1}>
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
        </DropDownMenu>
      );

      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).node, 'Never');
    });
  });

  describe('prop: disabled', () => {
    it('should forward the property', () => {
      const wrapper = shallowWithContext(
        <DropDownMenu disabled={true} />
      );
      assert.strictEqual(wrapper.find('IconButton').prop('disabled'), true, 'should be disabled');
    });
  });

  describe('prop: children', () => {
    it('should work with null child', () => {
      const wrapper = shallowWithContext(
        <DropDownMenu value={1}>
          <MenuItem value={1} primaryText="Never" />
          {null}
        </DropDownMenu>
      );

      assert.strictEqual(wrapper.childAt(0).childAt(0).childAt(0).node, 'Never');
    });
  });

  describe('prop: iconButton', () => {
    it('should render IconButton with given icon node', () => {
      const iconNode = <div>test</div>;
      const wrapper = shallowWithContext(
        <DropDownMenu iconButton={iconNode} />
      );
      assert.strictEqual(wrapper.find(IconButton).childAt(0).node, iconNode);
    });

    it('should render IconButton with default icon node', () => {
      const wrapper = shallowWithContext(
        <DropDownMenu />
      );
      assert.strictEqual(wrapper.find(IconButton).childAt(0).node, DropDownMenu.defaultProps.iconButton);
    });
  });

  describe('prop: onClose', () => {
    it('should call onClose when an item is selected', (done) => {
      const handleClose = spy();
      const wrapper = shallowWithContext(
        <DropDownMenu onClose={handleClose}>
          <MenuItem primaryText="Never" />
        </DropDownMenu>
      );

      wrapper.setState({
        open: true,
      });
      wrapper.find(Menu).props().onItemTouchTap({
        persist: () => {},
      });

      setTimeout(() => {
        assert.strictEqual(wrapper.state().open, false);
        assert.strictEqual(handleClose.callCount, 1);
        done();
      }, 0);
    });
  });

  describe('prop: onChange', () => {
    it('should call onChange when an item is selected', (done) => {
      const handleChange = spy();
      const wrapper = shallowWithContext(
        <DropDownMenu onChange={handleChange}>
          <MenuItem primaryText="Never" />
        </DropDownMenu>
      );

      wrapper.setState({
        open: true,
      });
      const event = {
        persist: () => {},
      };
      wrapper.find(Menu).props().onItemTouchTap(
        event,
        {
          props: {
            value: 'foo',
          },
        },
        3
      );

      setTimeout(() => {
        assert.strictEqual(wrapper.state().open, false);
        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0], [
          event,
          3,
          'foo',
        ]);
        done();
      }, 0);
    });
  });

  it('passes expected props through to the underlying Menu', () => {
    const props = {
      listStyle: {
        color: 'black',
      },
      maxHeight: 10,
      menuStyle: {
        color: 'white',
      },
      menuItemStyle: {
        fontWeight: 'bold',
      },
      selectedMenuItemStyle: {
        color: 'blue',
      },
      value: 1,
    };

    const wrapper = shallowWithContext(
      <DropDownMenu {...props}>
        <div value={1} primaryText="Never" />
        <div value={2} primaryText="Every Night" />
        <div value={3} primaryText="Weeknights" />
      </DropDownMenu>
    );

    const menu = wrapper.childAt(1).childAt(0);
    assert.include(menu.props(), {
      desktop: true,
      listStyle: props.listStyle,
      maxHeight: props.maxHeight,
      menuItemStyle: props.menuItemStyle,
      selectedMenuItemStyle: props.selectedMenuItemStyle,
      style: props.menuStyle,
      value: props.value,
    });
  });

  describe('focus handling', () => {
    it('should open the menu when users interact', () => {
      const wrapper = mountWithContext(
        <DropDownMenu value={1}>
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
        </DropDownMenu>
      );

      wrapper.find(IconButton).simulate('keydown', {
        keyCode: keycode('enter'),
      });
      assert.strictEqual(wrapper.state().open, true, 'it should open the menu');
    });
  });

  describe('MultiSelect', () => {
    let wrapper;

    it('should multi select 2 items after selecting 3 and deselecting 1', () => {
      class MyComponent1 extends Component {
        state = {
          value: null,
        }

        handleChange = (event, key, value) => {
          this.setState({value});
        }

        render() {
          return (
            <DropDownMenu
              multiple={true}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem className="item1" value="item1" primaryText="item 1" />
              <MenuItem className="item2" value="item2" primaryText="item 2" />
              <MenuItem className="item3" value="item3" primaryText="item 3" />
            </DropDownMenu>
          );
        }
      }
      wrapper = mountWithContext(<MyComponent1 />);
      wrapper.find('IconButton').simulate('touchTap');   // open

      const item1 = document.getElementsByClassName('item1')[0];
      assert.ok(item1);
      const item2 = document.getElementsByClassName('item2')[0];
      assert.ok(item2);
      const item3 = document.getElementsByClassName('item3')[0];
      assert.ok(item3);

      TestUtils.Simulate.touchTap(item1);
      TestUtils.Simulate.touchTap(item2);
      TestUtils.Simulate.touchTap(item3);
      assert.deepEqual(wrapper.state().value, ['item1', 'item2', 'item3']);

      TestUtils.Simulate.touchTap(item1);  // deselect
      assert.deepEqual(wrapper.state().value, ['item2', 'item3']);
    });

    afterEach(function() {
      if (wrapper) wrapper.unmount();
    });
  });
});
