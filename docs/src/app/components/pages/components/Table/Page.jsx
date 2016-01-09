import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tableReadmeText from './README';
import tableCode from '!raw!material-ui/lib/table/table';
import tableRowCode from '!raw!material-ui/lib/table/table';
import tableBodyCode from '!raw!material-ui/lib/table/table-body';
import tableFooterCode from '!raw!material-ui/lib/table/table-footer';
import tableHeaderColumnCode from '!raw!material-ui/lib/table/table-header-column';
import tableHeaderCode from '!raw!material-ui/lib/table/table-header';
import tableRowColumnCode from '!raw!material-ui/lib/table/table-row-column';
import TableExampleSimple from './ExampleSimple';
import tableExampleSimpleCode from '!raw!./ExampleSimple';

const TablePage = () => (
  <div>
    <MarkdownElement text={tableReadmeText} />
    <CodeExample code={tableExampleSimpleCode}>
      <TableExampleSimple />
    </CodeExample>
    <PropTypeDescription code={tableCode} header="### Table Properties"/>
    <PropTypeDescription code={tableBodyCode} header="### TableBody Properties"/>
    <PropTypeDescription code={tableFooterCode} header="### TableFooter Properties"/>
    <PropTypeDescription code={tableHeaderColumnCode} header="### TableHeaderColumn Properties"/>
    <PropTypeDescription code={tableHeaderCode} header="### TableHeader Properties"/>
    <PropTypeDescription code={tableRowColumnCode} header="### TableRowColumn Properties"/>
    <PropTypeDescription code={tableRowCode} header="### TableRow Properties"/>
  </div>
);

export default TablePage;
