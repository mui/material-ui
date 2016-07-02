/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import TableBody from './TableBody';
import TableRow from './TableRow';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TableBody />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it("does not set child TableRow's hoverable prop to false when showRowHover prop is not specified", () => {
    const wrapper = shallowWithContext(
      <TableBody>
        <TableRow hoverable={true} />
      </TableBody>
    );
    const tableRow = wrapper.find(TableRow);

    assert.isTrue(tableRow.props().hoverable, 'tableRow hoverable should be true');
  });

  it("does not set child TableRow's hoverable prop to false when showRowHover prop is set to false", () => {
    const wrapper = shallowWithContext(
      <TableBody showRowHover={false}>
        <TableRow hoverable={true} />
      </TableBody>
    );
    const tableRow = wrapper.find(TableRow);

    assert.isTrue(tableRow.props().hoverable, 'tableRow hoverable should be true');
  });

  it("sets child TableRow's hoverable prop to true when showRowHover prop is set to true", () => {
    const wrapper = shallowWithContext(
      <TableBody showRowHover={true}>
        <TableRow />
      </TableBody>
    );
    const tableRow = wrapper.find(TableRow);

    assert.isTrue(tableRow.props().hoverable, 'tableRow hoverable should be true');
  });
});
