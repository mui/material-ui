import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../internals/data/gridData';

export default function CustomizedDataGrid() {
  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={rows}
      columns={columns}
      rowHeight={40}
      columnHeaderHeight={40}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      sx={{
        overflow: 'clip',
        '& .MuiTablePagination-actions': {
          '& .MuiIconButton-root': {
            width: 32,
            height: 32,
          },
        },
      }}
    />
  );
}
