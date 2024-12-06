import TablePagination from '@mui/material/TablePagination';
import { TablePagination as MyTablePagination } from '@mui/material';

<TablePagination slots={{
  actions: "div"
}} slotProps={{
  select: { native: true }
}} />;
<TablePagination
  slots={{
    actions: 'div',
    select: 'div',
  }}
  slotProps={{
    select: { native: true }
  }} />;
<TablePagination
  slots={{
    root: 'div',
    actions: "div"
  }}
  slotProps={{
    root: { 'aria-label': '' },
    select: { native: true }
  }} />;
<TablePagination
  slots={{ actions: () => null }}
  slotProps={{ select: {
    ...{ native: true },
    ...{ native: false }
  } }} />;

<MyTablePagination slots={{
  actions: "div"
}} slotProps={{
  select: { native: true }
}} />;

<CustomTablePagination ActionsComponent="div" SelectProps={{ native: true }} />;
