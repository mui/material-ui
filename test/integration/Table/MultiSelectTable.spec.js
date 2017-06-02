/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import {assert} from 'chai';
import {spy} from 'sinon';
import getMuiTheme from 'src/styles/getMuiTheme';
import MultiSelectTable from './MultiSelectTable';

function getCheckboxStates(wrapper) {
  return wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked);
}

describe('<MultiSelectTable />', () => {
  let muiTheme;
  let mountWithContext;

  before(() => {
    window.getSelection = () => ({
      removeAllRanges: () => {},
    });
    muiTheme = getMuiTheme();
    mountWithContext = (node) => mount(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: PropTypes.object},
    });
  });

  describe('uncontrolled', () => {
    it('should select and unselect every checkboxes', () => {
      const rows = [
        'John Smith',
        'Randal White',
        'Christopher Nolan',
      ];

      const wrapper = mountWithContext(
        <MultiSelectTable rows={rows} />
      );

      wrapper.find('TableRow').at(1).find('TableRowColumn').at(0).simulate('click');

      assert.deepEqual(getCheckboxStates(wrapper),
        [false, true, false, false],
        'should take the action into account'
      );

      let input = wrapper.find('Checkbox').at(0).find('input');
      input.node.checked = !input.node.checked;
      input.simulate('change');

      assert.deepEqual(getCheckboxStates(wrapper),
        [true, true, true, true],
        'should check all the checkboxes'
      );

      input = wrapper.find('Checkbox').at(0).find('input');
      input.node.checked = !input.node.checked;
      input.simulate('change');

      assert.deepEqual(getCheckboxStates(wrapper),
        [false, false, false, false],
        'should uncheck all the checkboxes'
      );

      wrapper.update();
      assert.deepEqual(getCheckboxStates(wrapper),
        [false, false, false, false],
        'should be invariant to update'
      );
    });
  });

  describe('controlled', () => {
    it('should allow the component to be controlled', () => {
      const rows = [
        'John Smith',
        'Randal White',
        'Christopher Nolan',
      ];
      const onRowSelection = spy();

      const wrapper = mountWithContext(
        <MultiSelectTable rows={rows} selected={[1]} onRowSelection={onRowSelection} />
      );

      assert.deepEqual(getCheckboxStates(wrapper), [false, false, true, false]);

      wrapper.find('TableRow').at(1).find('TableRowColumn').at(0).simulate('click');
      assert.deepEqual(getCheckboxStates(wrapper), [false, false, true, false]);

      assert.deepEqual(onRowSelection.args[0][0], [0, 1]);

      wrapper.setProps({
        selected: [0, 1],
      });
      assert.deepEqual(getCheckboxStates(wrapper), [false, true, true, false]);
    });
  });
});
