/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from 'src/styles/getMuiTheme';
import MultiSelectTable from './MultiSelectTable';

describe('<MultiSelectTable />', () => {
  it('should select and unselect every checkboxes', () => {
    const muiTheme = getMuiTheme();
    const mountWithContext = (node) => mount(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object},
    });

    const tableData = [
      {
        name: 'John Smith',
        selected: true,
      },
      {
        name: 'Randal White',
        selected: true,
      },
      {
        name: 'Olivier',
      },
    ];

    const tableData2 = [
      {
        name: 'John Smith',
        selected: false,
      },
      {
        name: 'Randal White',
        selected: true,
      },
      {
        name: 'Olivier',
      },
    ];

    const wrapper = mountWithContext(
      <MultiSelectTable data={tableData}/>
    );

    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        true,
        true,
        false,
      ],
      'should use the selected property for the initial value'
    );

    let input;
    input = wrapper.find('Checkbox').at(0).find('input');
    input.node.checked = !input.node.checked;
    input.simulate('change');

    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        true,
        true,
        true,
        true,
      ],
      'should check all the checkboxes'
    );

    input = wrapper.find('Checkbox').at(0).find('input');
    input.node.checked = !input.node.checked;
    input.simulate('change');

    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        false,
        false,
        false,
      ],
      'should uncheck all the checkboxes'
    );

    wrapper.update();
    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        false,
        false,
        false,
      ],
      'should be invariant to update'
    );

    wrapper.setProps({data: tableData2})
    assert.deepEqual(
      wrapper.find('Checkbox').map((checkbox) => checkbox.props().checked),
      [
        false,
        false,
        true,
        false,
      ],
      'should be update if selected props change'
    );

  });
});
