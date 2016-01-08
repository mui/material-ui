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
    <PropTypeDescription code={tableBodyCode} header="### Table Body Properties"/>
    <PropTypeDescription code={tableFooterCode} header="### Table Footer Properties"/>
    <PropTypeDescription code={tableHeaderColumnCode} header="### Table Header Column Properties"/>
    <PropTypeDescription code={tableHeaderCode} header="### Table Header Properties"/>
    <PropTypeDescription code={tableRowColumnCode} header="### Table Row Column Properties"/>
    <PropTypeDescription code={tableRowCode} header="### Table Row Properties"/>
  </div>
);

export default TablePage;
