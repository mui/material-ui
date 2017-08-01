/* eslint-env mocha */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from '../styles/getMuiTheme';
import SelectField from './SelectField';
import TouchRipple from '../internal/TouchRipple';
import MenuItem from '../MenuItem';
import TestUtils from 'react-dom/test-utils';

describe('<SelectField />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  describe('prop: disabled', () => {
    it('disables the ripple effect', () => {
      const wrapper = mountWithContext(
        <SelectField disabled={true} />
      );
      assert.strictEqual(wrapper.find(TouchRipple).length, 0, 'should not contain a TouchRipple');
    });
  });

  describe('MultiSelect', () => {
    let wrapper;

    it('should multi select 2 items after selecting 3 and deselecting 1', () => {
      class MyComponent2 extends Component {
        state = {
          value: null,
        }

        handleChange = (event, key, value) => {
          this.setState({value});
        }

        render() {
          return (
            <SelectField
              multiple={true}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem className="item1" value="item1" primaryText="item 1" />
              <MenuItem className="item2" value="item2" primaryText="item 2" />
              <MenuItem className="item3" value="item3" primaryText="item 3" />
            </SelectField>
          );
        }
      }
      wrapper = mountWithContext(<MyComponent2 />);
      wrapper.find('IconButton').simulate('click');   // open

      const item1 = document.getElementsByClassName('item1')[0];
      assert.ok(item1);
      const item2 = document.getElementsByClassName('item2')[0];
      assert.ok(item2);
      const item3 = document.getElementsByClassName('item3')[0];
      assert.ok(item3);

      TestUtils.Simulate.click(item1);
      TestUtils.Simulate.click(item2);
      TestUtils.Simulate.click(item3);
      assert.deepEqual(wrapper.state().value, ['item1', 'item2', 'item3']);

      TestUtils.Simulate.click(item1);  // deselect
      assert.deepEqual(wrapper.state().value, ['item2', 'item3']);
    });

    it('should multi select 3 items and render their values colon separated', () => {
      class MyComponent2 extends Component {
        state = {
          value: null,
        }

        selectionRenderer(value) {
          return <span id="selection1">{value.join(';')}</span>;
        }

        handleChange = (event, key, value) => {
          this.setState({value});
        }

        render() {
          return (
            <SelectField
              multiple={true}
              value={this.state.value}
              onChange={this.handleChange}
              selectionRenderer={this.selectionRenderer}
            >
              <MenuItem className="item1" value="item1" primaryText="item 1" />
              <MenuItem className="item2" value="item2" primaryText="item 2" />
              <MenuItem className="item3" value="item3" primaryText="item 3" />
            </SelectField>
          );
        }
      }
      wrapper = mountWithContext(<MyComponent2 />);
      wrapper.find('IconButton').simulate('click');   // open

      const item1 = document.getElementsByClassName('item1')[0];
      assert.ok(item1);
      const item2 = document.getElementsByClassName('item2')[0];
      assert.ok(item2);
      const item3 = document.getElementsByClassName('item3')[0];
      assert.ok(item3);

      TestUtils.Simulate.click(item1);
      TestUtils.Simulate.click(item2);
      TestUtils.Simulate.click(item3);
      assert.deepEqual(wrapper.state().value, ['item1', 'item2', 'item3']);

      wrapper.find('IconButton').simulate('click');   // close
      assert.deepEqual(wrapper.find('#selection1').text(), 'item1;item2;item3');
    });

    afterEach(function() {
      if (wrapper) wrapper.unmount();
    });
  });
});
