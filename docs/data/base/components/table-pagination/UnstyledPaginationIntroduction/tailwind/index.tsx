import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from '@mui/system';
import TablePagination, { TablePaginationProps } from '@mui/base/TablePagination';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledPaginationIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      className={isDarkMode ? 'dark' : ''}
      style={{ width: 500, maxWidth: '100%' }}
    >
      <table
        aria-label="custom pagination table"
        className="text-sm [&>th]:p-4 [&>td]:p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md w-full"
      >
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={13}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const CustomTablePagination = React.forwardRef<
  HTMLTableCellElement,
  TablePaginationProps
>((props, ref) => {
  return (
    <TablePagination
      ref={ref}
      {...props}
      className={clsx('CustomTablePagination p-4', props.className)}
      slotProps={{
        ...props.slotProps,
        select: {
          ...props.slotProps?.select,
          className: clsx(
            'px-0.5 py-1.5 border border-solid border-slate-200 dark:border-slate-800 rounded-3xl bg-transparent hover:bg-slate-20 hover:dark:bg-slate-800 focus:outline-0 focus:shadow-outline-purple-xs',
            props.slotProps?.select?.className,
          ),
        },
        actions: {
          ...props.slotProps?.actions,
          className: clsx(
            'p-0.5 border border-solid border-slate-200 dark:border-slate-800 rounded-3xl text-center [&>button]:my-0 [&>button]:mx-2 [&>button]:border-transparent [&>button]:rounded-sm [&>button]:bg-transparent [&>button:hover]:bg-slate-50 [&>button:hover]:dark:bg-slate-800 [&>button:focus]:outline-0 [&>button:focus]:shadow-outline-purple-xs',
            props.slotProps?.actions?.className,
          ),
        },
        spacer: {
          ...props.slotProps?.spacer,
          className: clsx('hidden', props.slotProps?.spacer?.className),
        },
        toolbar: {
          ...props.slotProps?.toolbar,
          className: clsx(
            'flex flex-col items-start gap-2.5 md:flex-row md:items-center',
            props.slotProps?.toolbar?.className,
          ),
        },
        selectLabel: {
          ...props.slotProps?.selectLabel,
          className: clsx('m-0', props.slotProps?.selectLabel?.className),
        },
        displayedRows: {
          ...props.slotProps?.displayedRows,
          className: clsx(
            'm-0 md:ml-auto',
            props.slotProps?.displayedRows?.className,
          ),
        },
      }}
    />
  );
});

declare module '@mui/base/TablePagination' {
  interface TablePaginationRootSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationActionsSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationSelectSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationSelectLabelSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationMenuItemSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationDisplayedRowsSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationToolbarSlotPropsOverrides {
    className?: string;
  }
  interface TablePaginationSpacerSlotPropsOverrides {
    className?: string;
  }
}
