/* eslint-env mocha */
import React, {Component, PropTypes} from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import Checkbox from './Checkbox';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Checkbox />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  describe('props: defaultChecked', () => {
    it('should display checkmark when checked by default', () => {
      const wrapper = shallowWithContext(
        <Checkbox defaultChecked={true} />
      );

      const enhancedSwitch = wrapper.find('EnhancedSwitch');
      const svgs = wrapper.prop('switchElement').props.children;
      const checkMarkNode = shallow(svgs[1]);

      assert.ok(enhancedSwitch.prop('switched'));
      assert.strictEqual(svgs[1].type.displayName, 'ToggleCheckBox', 'Should use the right icon.');
      assert.strictEqual(checkMarkNode.props().style.opacity, 1);
    });

    it('should NOT display checkmark when not checked by default', () => {
      const wrapper = shallowWithContext(
        <Checkbox defaultChecked={false} />
      );

      const enhancedSwitch = wrapper.find('EnhancedSwitch');
      const svgs = wrapper.prop('switchElement').props.children;
      const checkMarkNode = shallow(svgs[1]);

      assert.notOk(enhancedSwitch.prop('switched'));
      assert.strictEqual(svgs[1].type.displayName, 'ToggleCheckBox', 'Should use the right icon.');
      assert.strictEqual(checkMarkNode.props().style.opacity, 0);
    });

    describe('when initially unchecked', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mountWithContext(
          <Checkbox defaultChecked={false} />
        );
      });

      it('should display checkmark when clicked once', () => {
        const input = wrapper.find('input');
        input.node.checked = !input.node.checked;
        input.simulate('change');
        const enhancedSwitch = wrapper.find('EnhancedSwitch');
        assert.ok(enhancedSwitch.prop('switched'));
      });

      it('should NOT display checkmark when clicked twice', () => {
        const input = wrapper.find('input');
        input.node.checked = !input.node.checked;
        input.simulate('change');
        input.node.checked = !input.node.checked;
        input.simulate('change');
        const enhancedSwitch = wrapper.find('EnhancedSwitch');
        assert.notOk(enhancedSwitch.prop('switched'));
      });
    });
  });

  describe('props: onChange', () => {
    it('should update the switch state when the component is uncontrolled', () => {
      class CheckboxUncontrolled extends Component {
        handleCheck = () => {
          this.setState({});
        };

        render() {
          return <Checkbox onCheck={this.handleCheck} />;
        }
      }

      const wrapper = mountWithContext(<CheckboxUncontrolled />);
      const enhancedSwitch = wrapper.find('EnhancedSwitch');
      assert.strictEqual(enhancedSwitch.props().switched, false);

      // Simulate a change on the input
      const input = wrapper.find('input');
      input.node.checked = !input.node.checked;
      input.simulate('change');

      assert.strictEqual(enhancedSwitch.props().switched, true,
        'should take into account the input change state');
    });
  });
});

