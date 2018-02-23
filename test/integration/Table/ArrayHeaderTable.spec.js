/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from 'src/styles/getMuiTheme';
import ArrayHeaderTable from './ArrayHeaderTable';

function getHeaderContent(wrapper) {
  const headers = wrapper.find('TableHeader');
  if (headers.length !== 1) {
    return undefined;
  }

  const mapHeaderColumn = (headerColumn) => headerColumn.props().children;
  const mapHeaderRow = (headerRow) => headerRow.find('TableHeaderColumn').map(mapHeaderColumn).join();

  const rows = headers.at(0).find('TableRow');
  const mappedRows = rows.map(mapHeaderRow);

  return mappedRows.join('\n');
}

describe('<ArrayHeaderTable />', () => {
  let muiTheme;
  let mountWithContext;

  before(() => {
    window.getSelection = () => ({
      removeAllRanges: () => { },
    });
    muiTheme = getMuiTheme();
    mountWithContext = (node) => mount(node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: PropTypes.object},
    });
  });

  describe('uncontrolled', () => {
    it('should render empty header', () => {
      const headers = [];
      const wrapper = mountWithContext(
        <ArrayHeaderTable headers={headers} />
      );

      assert.deepEqual(getHeaderContent(wrapper),
        '',
        'should be the header content'
      );
    });

    it('should render single header row', () => {
      const headers = [{columns: ['One', 'Two']}];
      const wrapper = mountWithContext(
        <ArrayHeaderTable headers={headers} />
      );

      assert.deepEqual(getHeaderContent(wrapper),
        'One,Two',
        'should be the header content'
      );
    });

    it('should render both header rows', () => {
      const headers = [{columns: ['One', 'Two']}, {columns: ['Three', 'Four']}];
      const wrapper = mountWithContext(
        <ArrayHeaderTable headers={headers} />
      );

      assert.deepEqual(getHeaderContent(wrapper),
        'One,Two\nThree,Four',
        'should be the header content'
      );
    });
  });
});
