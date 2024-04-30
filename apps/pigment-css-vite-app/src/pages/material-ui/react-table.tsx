import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AccessibleTable from '../../../../../docs/data/material/components/table/AccessibleTable.tsx';
import BasicTable from '../../../../../docs/data/material/components/table/BasicTable.tsx';
import CollapsibleTable from '../../../../../docs/data/material/components/table/CollapsibleTable.tsx';
import ColumnGroupingTable from '../../../../../docs/data/material/components/table/ColumnGroupingTable.tsx';
import CustomPaginationActionsTable from '../../../../../docs/data/material/components/table/CustomPaginationActionsTable.tsx';
import CustomizedTables from '../../../../../docs/data/material/components/table/CustomizedTables.tsx';
import DataTable from '../../../../../docs/data/material/components/table/DataTable.tsx';
import DenseTable from '../../../../../docs/data/material/components/table/DenseTable.tsx';
import ReactVirtualizedTable from '../../../../../docs/data/material/components/table/ReactVirtualizedTable.tsx';
import SpanningTable from '../../../../../docs/data/material/components/table/SpanningTable.tsx';
import StickyHeadTable from '../../../../../docs/data/material/components/table/StickyHeadTable.tsx';

export default function Table() {
  return (
    <MaterialUILayout>
      <h1>Table</h1>
      <section>
        <h2> Accessible Table</h2>
        <div className="demo-container">
          <AccessibleTable />
        </div>
      </section>
      <section>
        <h2> Basic Table</h2>
        <div className="demo-container">
          <BasicTable />
        </div>
      </section>
      <section>
        <h2> Collapsible Table</h2>
        <div className="demo-container">
          <CollapsibleTable />
        </div>
      </section>
      <section>
        <h2> Column Grouping Table</h2>
        <div className="demo-container">
          <ColumnGroupingTable />
        </div>
      </section>
      <section>
        <h2> Custom Pagination Actions Table</h2>
        <div className="demo-container">
          <CustomPaginationActionsTable />
        </div>
      </section>
      <section>
        <h2> Customized Tables</h2>
        <div className="demo-container">
          <CustomizedTables />
        </div>
      </section>
      <section>
        <h2> Data Table</h2>
        <div className="demo-container">
          <DataTable />
        </div>
      </section>
      <section>
        <h2> Dense Table</h2>
        <div className="demo-container">
          <DenseTable />
        </div>
      </section>
      <section>
        <h2> React Virtualized Table</h2>
        <div className="demo-container">
          <ReactVirtualizedTable />
        </div>
      </section>
      <section>
        <h2> Spanning Table</h2>
        <div className="demo-container">
          <SpanningTable />
        </div>
      </section>
      <section>
        <h2> Sticky Head Table</h2>
        <div className="demo-container">
          <StickyHeadTable />
        </div>
      </section>
    </MaterialUILayout>
  );
}
