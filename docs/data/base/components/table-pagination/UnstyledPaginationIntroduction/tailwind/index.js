import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@mui/system';
import { TablePagination } from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledPaginationIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
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
        className="text-sm font-sans [&>th]:p-4 [&>td]:p-4 border border-solid border-zinc-200 dark:border-[#303740] bg-white dark:bg-[#1C2025] rounded-xl shadow-md dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] w-full"
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
                  slots: {
                    firstPageIcon: FirstPageRoundedIcon,
                    lastPageIcon: LastPageRoundedIcon,
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon,
                  },
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

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const CustomTablePagination = React.forwardRef((props, ref) => {
  return (
    <TablePagination
      ref={ref}
      {...props}
      className={clsx('CustomTablePagination p-4', props.className)}
      slotProps={{
        ...props.slotProps,
        select: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.select,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'font-sans py-[2px] pl-[4px] pr-[2px] border border-solid border-zinc-200 dark:border-[#303740] rounded-[6px] bg-transparent hover:bg-zinc-20 hover:dark:bg-zinc-800 focus:outline-0 [&>button:focus]:ring-[3px] focus:border-purple-400 focus:dark:border-purple-400 focus:hover:border-purple-400 focus:hover:dark:border-purple-400 transition',
              resolvedSlotProps?.className,
            ),
          };
        },
        actions: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.actions,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'flex gap-[6px] text-center [&>button]:my-0 [&>button]:p-0 [&>button]:flex [&>button]:items-center [&>button]:rounded-full [&>button]:bg-transparent [&>button]:border [&>button]:border-solid [&>button]:border-zinc-300 [&>button]:dark:border-[#303740] [&>button:hover]:dark:border-zinc-700 [&>button:hover]:bg-zinc-100 [&>button:hover]:border-zinc-400 [&>button:hover]:dark:bg-zinc-800 [&>button:focus]:outline-0 [&>button:focus]:ring-[2px] [&>button:focus]:border-purple-400 [&>button:focus]:dark:border-purple-400 [&>button:focus:hover]:border-purple-400 [&>button:focus:hover]:dark:border-purple-400 [&>button>svg]:text-[22px] [&>button:disabled]:opacity-[0.3] [&>button:disabled:hover]:bg-transparent [&>button:disabled:hover]:border-zinc-300 [&>button:disabled:hover]:dark:border-zinc-700',
              resolvedSlotProps?.className,
            ),
          };
        },
        spacer: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.spacer,
            ownerState,
          );

          return {
            ...resolvedSlotProps,
            className: clsx('hidden', resolvedSlotProps?.className),
          };
        },
        toolbar: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.toolbar,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'flex flex-col items-start gap-[8px] md:flex-row md:items-center',
              resolvedSlotProps?.className,
            ),
          };
        },
        selectLabel: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.selectLabel,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx('m-0', resolvedSlotProps?.className),
          };
        },
        displayedRows: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.displayedRows,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx('m-0 md:ml-auto', resolvedSlotProps?.className),
          };
        },
      }}
    />
  );
});

CustomTablePagination.propTypes = {
  className: PropTypes.string,
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps: PropTypes.shape({
    actions: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        count: PropTypes.number,
        direction: PropTypes.oneOf(['ltr', 'rtl']),
        getItemAriaLabel: PropTypes.func,
        onPageChange: PropTypes.func,
        page: PropTypes.number,
        rowsPerPage: PropTypes.number,
        showFirstButton: PropTypes.bool,
        showLastButton: PropTypes.bool,
        slotProps: PropTypes.shape({
          backButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          firstButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          lastButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          nextButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
          root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        }),
        slots: PropTypes.shape({
          backButton: PropTypes.elementType,
          backPageIcon: PropTypes.elementType,
          firstButton: PropTypes.elementType,
          firstPageIcon: PropTypes.elementType,
          lastButton: PropTypes.elementType,
          lastPageIcon: PropTypes.elementType,
          nextButton: PropTypes.elementType,
          nextPageIcon: PropTypes.elementType,
          root: PropTypes.elementType,
        }),
      }),
    ]),
    displayedRows: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    menuItem: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    select: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    spacer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    toolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};
