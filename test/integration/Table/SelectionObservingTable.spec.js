/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from 'src/styles/getMuiTheme';
import SelectionObservingTable from './SelectionObservingTable';

describe('<SelectionObservingTable />', () => {
  it('preserves selected change', () => {
    const muiTheme = getMuiTheme();
    const mountWithContext = (node) => mount(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object},
    });

    const wrapper = mountWithContext(
      <SelectionObservingTable />
    );

    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        false,
        false,
        false,
      ],
      'should use the selected property for the initial value'
    );

    let input;
    input = wrapper.find('Checkbox').at(1).find('input');
    input.node.checked = !input.node.checked;
    input.simulate('change');

    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        true,
        false,
        false,
      ],
      'should preserve initial selection'
    );

    input = wrapper.find('Checkbox').at(2).find('input');
    input.node.checked = !input.node.checked;
    input.simulate('change');

    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        false,
        true,
        false,
      ],
      'should preserve updated selection'
    );
  });
});
