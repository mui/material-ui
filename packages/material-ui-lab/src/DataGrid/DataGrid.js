import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { VariableSizeList as List } from 'react-window';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableLoading from './TableLoading';
import { ownerDocument, useEventCallback, useForkRef } from '@material-ui/core/utils';
import Button from '@material-ui/core/Button';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    // overflow: 'auto',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    '& table': {
      // width: '100%',
      borderCollapse: 'collapse',
      // Faster than the default auto layout algorithm.
      tableLayout: 'fixed',
      borderSpacing: 0,
    },
    '& th': {
      position: 'relative',
      border: '1px solid red',
      padding: 0,
    },
    '& td': {
      position: 'relative',
      border: '1px solid red',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 0,
      whiteSpace: 'nowrap',
    },
  },
  bodyContainer: {
    maxHeight: 200,
    overflow: 'auto',
  },
  headerLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  resize: {
    cursor: 'col-resize',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1, // Leak on the next cell
    width: 9,
    right: -6,
  },
});

/**
 * I have hesitate to use https://github.com/eligrey/FileSaver.js.
 * If we get bug reports that this project solves, we should consider using it.
 *
 * Related resources.
 * https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
 * https://github.com/mbrn/filefy/blob/ec4ed0b7415d93be7158c23029f2ea1fa0b8e2d9/src/core/BaseBuilder.ts
 * https://unpkg.com/browse/@progress/kendo-file-saver@1.0.7/dist/es/save-as.js
 * https://github.com/ag-grid/ag-grid/blob/9565c219b6210aa85fa833c929d0728f9d163a91/community-modules/csv-export/src/csvExport/downloader.ts
 */
export function saveAs({ blob, filename = document.title, extension = 'txt' }) {
  const fullName = `${filename}.${extension}`;

  // Test download attribute first
  // https://github.com/eligrey/FileSaver.js/issues/193
  if ('download' in HTMLAnchorElement.prototype) {
    // Create an object URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fullName;

    // Programmatically trigger a click on the anchor element
    // Useful if you want the download to happen automatically
    // Without attaching the anchor element to the DOM
    a.click();

    // https://github.com/eligrey/FileSaver.js/issues/205
    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
    return;
  }

  // IE 11 support
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fullName);
    return;
  }

  throw new Error('saveAs not supported');
}

// To replace with .findIndex() once we stop IE 11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

function keyBy(array, comp) {
  const output = {};

  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    output[comp(item)] = item;
  }

  return output;
}

const defaultColumnOptionsDefault = {
  resizable: false,
  sortable: false,
  sortingOrder: ['asc', 'desc', null],
};

const RowSize = 28;

const defaultDataProviderFactory = ({ rowsData, defaultColumnOptions, columnsKeyBy }) => ({
  getList: params =>
    new Promise(resolve => {
      // Clone
      let newRowsData = [...rowsData];

      if (params.sorting.length > 0) {
        // TODO we might need to use a stable sort logic.
        newRowsData.sort((rowA, rowB) => {
          return params.sorting.reduce((acc, sortingItem) => {
            if (acc !== null) {
              return acc;
            }

            const field = sortingItem.field;
            const sortingComparator =
              columnsKeyBy[field].sortingComparator || defaultColumnOptions.sortingComparator;

            if (sortingComparator) {
              return sortingComparator(rowA, rowB, sortingItem.sort);
            }

            if (rowA[field] < rowB[field]) {
              return -1 * (sortingItem.sort === 'asc' ? 1 : -1);
            }

            if (rowA[field] > rowB[field]) {
              return 1 * (sortingItem.sort === 'asc' ? 1 : -1);
            }

            return null;
          }, null);
        });
      }

      if (params.pagination) {
        newRowsData = newRowsData.slice(params.pagination.start, params.pagination.end);
      }

      resolve({
        rows: newRowsData,
        total: rowsData.length,
      });
    }),
});

const emptyArray = [];

const defaultPaginationRowsPerPageOptions = [10, 25, 50, 100, 250, 500];

const DataGrid = React.forwardRef(function DataGrid(props, ref) {
  const {
    classes,
    className,
    columns = emptyArray,
    dataProvider: dataProviderProp,
    defaultColumnOptions: defaultColumnOptionsProp = defaultColumnOptionsDefault,
    defaultSorting = [],
    loading: loadingProp = false,
    onSortingChange,
    pagination = false,
    defaultPage = 0,
    defaultRowsPerPage = 50,
    paginationRowsPerPageOptions: rowsPerPageOptions = defaultPaginationRowsPerPageOptions,
    rowsData = emptyArray,
    sorting: sortingProp,
    text = {
      loading: 'Loading',
      reload: 'Reload',
    },
    ...other
  } = props;

  const defaultColumnOptions = React.useMemo(
    () => ({
      ...defaultColumnOptionsDefault,
      ...defaultColumnOptionsProp,
    }),
    [defaultColumnOptionsProp],
  );

  const columnsKeyBy = React.useMemo(() => keyBy(columns, item => item.field), [columns]);

  const dataProvider = React.useMemo(
    () =>
      dataProviderProp ||
      defaultDataProviderFactory({
        rowsData,
        defaultColumnOptions,
        columnsKeyBy,
      }),
    [dataProviderProp, rowsData, defaultColumnOptions, columnsKeyBy],
  );

  const rootRef = React.useRef();
  const handleRef = useForkRef(ref, rootRef);

  const rowsHeader = [columns];

  const handleResizeMouseMove = useEventCallback(event => {});

  const handleResizeMouseUp = useEventCallback(event => {
    const doc = ownerDocument(rootRef.current);

    // Ignore previously defined value. hope it won't be an issue.
    doc.body.style.removeProperty('cursor');

    doc.removeEventListener('mousemove', handleResizeMouseMove);
    doc.removeEventListener('mouseup', handleResizeMouseUp);
  });

  const handleResizeMouseDown = event => {
    // Avoid text selection.
    event.preventDefault();

    const doc = ownerDocument(rootRef.current);

    doc.body.style.cursor = 'col-resize';

    doc.addEventListener('mousemove', handleResizeMouseMove);
    doc.addEventListener('mouseup', handleResizeMouseUp);
  };

  const handleResizeDoubleClick = () => {
    console.log('autosize');
  };

  const { current: isSortingControlled } = React.useRef(sortingProp !== undefined);
  const [sortingState, setSortingState] = React.useState(defaultSorting);
  const sorting = isSortingControlled ? sortingProp : sortingState;
  const sortingKeyBy = keyBy(sorting, item => item.field);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isSortingControlled !== (sortingProp != null)) {
        console.error(
          [
            `Material-UI: A component is changing ${
              isSortingControlled ? 'a ' : 'an un'
            }controlled DataGrid sorting prop to be ${isSortingControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            'Decide between using a controlled or uncontrolled DataGrid ' +
              'element for the lifetime of the component.',
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [sortingProp, isSortingControlled]);
  }

  const activeKeys = React.useRef([]);

  React.useEffect(() => {
    const validKeys = ['Shift'];
    const handleKeyDown = event => {
      // TODO we might want to use event.keyCode to support IE 11
      if (validKeys.indexOf(event.key) !== -1) {
        activeKeys.current.push(event.key);
      }
    };

    const handleKeyUp = event => {
      if (validKeys.indexOf(event.key) !== -1) {
        const index = activeKeys.current.indexOf(event.key);
        activeKeys.current.splice(index, 1);
      }
    };

    // The keyUp event might not be triggered when the window lose the focus.
    const handleBlur = () => {
      activeKeys.current = [];
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleSortClick = column => event => {
    const sortingOrder = column.sortingOrder || defaultColumnOptions.sortingOrder;
    const columnIndex = findIndex(sorting, sortingColumn => column.field === sortingColumn.field);

    let newSorting;

    // Multi column sort
    if (activeKeys.current.indexOf('Shift') !== -1) {
      newSorting = [...sorting];
    } else {
      newSorting = [];
    }

    if (columnIndex === -1) {
      newSorting.push({
        field: column.field,
        sort: sortingOrder[0],
      });
    } else {
      const newColumn = {
        ...sorting[columnIndex],
        sort:
          sortingOrder[(sortingOrder.indexOf(sorting[columnIndex].sort) + 1) % sortingOrder.length],
      };

      if (activeKeys.current.indexOf('Shift') !== -1) {
        newSorting[columnIndex] = newColumn;

        // Move to the end
        if (columnIndex !== sorting.length - 1) {
          newSorting.push(newSorting[columnIndex]);
          newSorting.splice(columnIndex, 1);
        }
      } else {
        newSorting = [newColumn];
      }

      // Remove last item
      if (newColumn.sort === null) {
        newSorting.splice(newSorting.length - 1, 1);
      }
    }

    setSortingState(newSorting);
    setPageState(defaultPage);

    if (onSortingChange) {
      onSortingChange(event, newSorting);
    }
  };

  const [loadingState, setLoading] = React.useState(false);
  const [retryCounter, setRetryCounter] = React.useState(0);

  const loading = loadingState || loadingProp;

  const [errorMessage, setErrorMessage] = React.useState(null);

  const [data, setData] = React.useState({ rows: [], total: 0 });

  const [pageState, setPageState] = React.useState(defaultPage);
  const [rowsPerPageState, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handlePageChange = (event, page) => {
    setPageState(page);
  };

  const handleRowPerPageChange = event => {
    const rowsPerPage = event.target.value;
    setRowsPerPage(rowsPerPage);

    const newPotentialPage = (rowsPerPageState * pageState) / rowsPerPage;

    if (data.total && rowsPerPage * pageState >= data.total) {
      // Avoid overflow.
      handlePageChange(event, Math.ceil(data.total / rowsPerPage) - 1);
    } else if (newPotentialPage === Math.round(newPotentialPage)) {
      // Show the same rows as before with then new page size.
      handlePageChange(event, newPotentialPage);
    }
  };

  React.useEffect(() => {
    let active = true;

    // Shows the loading state, if the delay is longer than 500ms to reduce user interruption
    const loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 1000);

    dataProvider
      .getList({
        sorting,
        pagination: pagination
          ? {
              start: pageState * rowsPerPageState,
              end: (pageState + 1) * rowsPerPageState,
            }
          : undefined,
      })
      .then(newData => {
        if (active) {
          setData(newData);
        }
      })
      .catch(reason => {
        if (active) {
          setErrorMessage(`Could not load data: ${reason}`);
        }
      })
      .finally(() => {
        clearTimeout(loadingTimer);

        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      clearTimeout(loadingTimer);
    };
  }, [dataProvider, sorting, pageState, rowsPerPageState, retryCounter, pagination]);

  const handleRetryClick = () => {
    setErrorMessage('');
    setRetryCounter(x => x + 1);
  };

  return (
    <div className={clsx(classes.root, className)} ref={handleRef} {...other}>
      <table>
        <thead>
          {rowsHeader.map((row, index) => (
            <tr key={index}>
              {columns.map(column => {
                const sortingColumn = sortingKeyBy[column.field];
                const sortingActive = Boolean(sortingColumn);
                const label = (
                  <div className={classes.headerLabel}>
                    {column.label || column.field}
                    {sortingActive && sorting.length > 1
                      ? ` (${sorting.indexOf(sortingColumn) + 1})`
                      : ''}
                  </div>
                );

                return (
                  <th key={column.field} rowSpan={null} colSpan={null}>
                    {column.sortable || defaultColumnOptions.sortable ? (
                      <TableSortLabel
                        data-mui-test="TableSortLabel"
                        active={sortingActive}
                        direction={sortingColumn ? sortingColumn.sort : 'asc'}
                        onClick={handleSortClick(column)}
                      >
                        {label}
                      </TableSortLabel>
                    ) : (
                      label
                    )}

                    {column.resizable || defaultColumnOptions.resizable ? (
                      <div
                        aria-hidden
                        onMouseDown={handleResizeMouseDown}
                        onDoubleClick={handleResizeDoubleClick}
                        className={classes.resize}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
      </table>
      <TableLoading loading={loading} />
      {loading ? text.loading : null}
      <div className={classes.bodyContainer}>
        <List
          height={pagination ? RowSize * rowsPerPageState : 300} // Show the whole current page, if pagiantion is turned on
          itemCount={data.rows.length}
          outerElementType="div"
          innerElementType="div"
          overscanCount={10}
          itemSize={() => RowSize}
          width={600}
        >
          {({ index, style }) => (
            <div key={index} style={style} role="row">
              {columns.map(column => (
                <span key={column.field}>{data.rows[index][column.field]}</span>
              ))}
            </div>
          )}
        </List>
        {/*
                  -        <table>
                  -          <tbody>
                  -            {rowsData.map((row, index) => (
                  -              <tr key={index}>
                  -                {columns.map(column => (
                  -                  <td key={column.field}>{row[column.field]}</td>
                  -                ))}
                  -              </tr>
                  -            ))}
                  -          </tbody>
                  -        </table>
                  */}
      </div>
      {pagination ? (
        <table>
          <tfoot>
            <tr>
              <TablePagination
                count={data.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowPerPageChange}
                page={pageState}
                rowsPerPage={rowsPerPageState}
                rowsPerPageOptions={rowsPerPageOptions}
              />
            </tr>
          </tfoot>
        </table>
      ) : null}
      {errorMessage && (
        <div>
          <span>{errorMessage}</span>
          <Button onClick={handleRetryClick} color="secondary">
            {text.reload}
          </Button>
        </div>
      )}
    </div>
  );
});

DataGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The columns configuration.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.object),
      field: PropTypes.string.isRequired,
      label: PropTypes.string,
      resizable: PropTypes.bool,
      sortable: PropTypes.bool,
      sortingComparator: PropTypes.func,
      sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc', null])),
    }),
  ),
  /**
   * Manage the communication with the data store.
   */
  dataProvider: PropTypes.shape({
    getList: PropTypes.func.isRequired,
  }),
  /**
   * The default options that get applied to each column.
   */
  defaultColumnOptions: PropTypes.shape({
    resizable: PropTypes.bool,
    sortable: PropTypes.bool,
    sortingComparator: PropTypes.func,
    sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc', null])),
  }),
  /**
   * The initial page to be displayed.
   */
  defaultPage: PropTypes.number,
  /**
   * The initial rows per page size. Must be one of the paginationPageSize options.
   */
  defaultRowsPerPage: PropTypes.number,
  /**
   * The default sorting state. (Uncontrolled)
   */
  defaultSorting: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      sort: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }),
  ),
  /**
   * If `true`, the loading state is displayed.
   * If `false` the component shows the loading state, while it waits for new data being loaded.
   */
  loading: PropTypes.bool,
  /**
   * Callback fired when the user change the column sort.
   *
   * @param {object} event The event source of the callback.
   * @param {SortingType} value The new sorting value.
   */
  onSortingChange: PropTypes.func,
  /**
   * If `true`, the pagination is enabled.
   */
  pagination: PropTypes.bool,
  /**
   * The possible pagination size options to be selected by the user.
   */
  paginationRowsPerPageOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ]),
  ),
  /**
   * The data record array to be rendered.
   */
  rowsData: PropTypes.array,
  /**
   * Sorting state. (Controlled)
   */
  sorting: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      sort: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }),
  ),
  /**
   * The localization strings.
   */
  text: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiDataGrid' })(DataGrid);
