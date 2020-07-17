import combineWithBreakpoints from './combineWithBreakpoints';

const displaysProps = {
  'd-inline': { display: 'inline !important' },
  'd-block': { display: 'block !important' },
  'd-contents': { display: 'contents !important' },
  'd-flex': { display: 'flex !important' },
  'd-grid': { display: 'grid !important' },
  'd-inline-block': { display: 'inline-block !important' },
  'd-inline-flex': { display: 'inline-flex !important' },
  'd-inline-grid': { display: 'inline-grid !important' },
  'd-inline-table': { display: 'inline-table !important' },
  'd-list-item': { display: 'list-item !important' },
  'd-run-in': { display: 'run-in !important' },
  'd-table': { display: 'table !important' },
  'd-table-caption': { display: 'table-caption !important' },
  'd-table-column-group': { display: 'table-column-group !important' },
  'd-table-header-group': { display: 'table-header-group !important' },
  'd-table-footer-group': { display: 'table-footer-group !important' },
  'd-table-row-group': { display: 'table-row-group !important' },
  'd-table-cell': { display: 'table-cell !important' },
  'd-table-column': { display: 'table-column !important' },
  'd-table-row': { display: 'table-row !important' },
  'd-none': { display: 'none !important' },
  'd-initial': { display: 'initial !important' },
  'd-inherit': { display: 'inherit !important' },
  'print\\:d-inline': { '@media print': { display: 'inline !important' } },
  'print\\:d-block': { '@media print': { display: 'block !important' } },
  'print\\:d-contents': { '@media print': { display: 'contents !important' } },
  'print\\:d-flex': { '@media print': { display: 'flex !important' } },
  'print\\:d-grid': { '@media print': { display: 'grid !important' } },
  'print\\:d-inline-block': { '@media print': { display: 'inline-block !important' } },
  'print\\:d-inline-flex': { '@media print': { display: 'inline-flex !important' } },
  'print\\:d-inline-grid': { '@media print': { display: 'inline-grid !important' } },
  'print\\:d-inline-table': { '@media print': { display: 'inline-table !important' } },
  'print\\:d-list-item': { '@media print': { display: 'list-item !important' } },
  'print\\:d-run-in': { '@media print': { display: 'run-in !important' } },
  'print\\:d-table': { '@media print': { display: 'table !important' } },
  'print\\:d-table-caption': { '@media print': { display: 'table-caption !important' } },
  'print\\:d-table-column-group': {
    '@media print': { display: 'table-column-group !important' },
  },
  'print\\:d-table-header-group': {
    '@media print': { display: 'table-header-group !important' },
  },
  'print\\:d-table-footer-group': {
    '@media print': { display: 'table-footer-group !important' },
  },
  'print\\:d-table-row-group': {
    '@media print': { display: 'table-row-group !important' },
  },
  'print\\:d-table-cell': { '@media print': { display: 'table-cell !important' } },
  'print\\:d-table-column': { '@media print': { display: 'table-column !important' } },
  'print\\:d-table-row': { '@media print': { display: 'table-row !important' } },
  'print\\:d-none': { '@media print': { display: 'none !important' } },
  'print\\:d-initial': { '@media print': { display: 'initial !important' } },
  'print\\:d-inherit': { '@media print': { display: 'inherit !important' } },
  'd-sr-only': {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
};

const overflows = {
  'overflow-visible': { overflow: 'visible !important' },
  'overflow-hidden': { overflow: 'hidden !important' },
  'overflow-scroll': { overflow: 'scroll !important' },
  'overflow-auto': { overflow: 'auto !important' },
  'overflow-initial': { overflow: 'initial !important' },
  'overflow-inherit': { overflow: 'inherit !important' },
};

const textOverflows = {
  'text-overflow-clip': { textOverflow: 'clip !important' },
  'text-overflow-ellipsis': { textOverflow: 'ellipsis !important' },
  'text-overflow-initial': { textOverflow: 'initial !important' },
  'text-overflow-inherit': { textOverflow: 'inherit !important' },
};

const visibilities = {
  'v-visible': { visibility: 'visible !important' },
  'v-hidden': { visibility: 'hidden !important' },
  'v-collapse': { visibility: 'collapse !important' },
  'v-initial': { visibility: 'initial !important' },
  'v-inherit': { visibility: 'inherit !important' },
};

const whiteSpaces = {
  'ws-normal': { whiteSpace: 'normal !important' },
  'ws-nowrap': { whiteSpace: 'nowrap !important' },
  'ws-pre': { whiteSpace: 'pre !important' },
  'ws-pre-line': { whiteSpace: 'pre-line !important' },
  'ws-pre-wrap': { whiteSpace: 'pre-wrap !important' },
  'ws-initial': { whiteSpace: 'initial !important' },
  'ws-inherit': { whiteSpace: 'inherit !important' },
};

export default function displays(theme) {
  const result = {
    ...combineWithBreakpoints(theme, displaysProps),
    ...combineWithBreakpoints(theme, overflows),
    ...combineWithBreakpoints(theme, textOverflows),
    ...combineWithBreakpoints(theme, visibilities),
    ...combineWithBreakpoints(theme, whiteSpaces),
  };

  return result;
}
