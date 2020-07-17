import combineWithBreakpoints from './combineWithBreakpoints';

const displaysProps = {
  'd-inline': { display: 'inline' },
  'd-block': { display: 'block' },
  'd-contents': { display: 'contents' },
  'd-flex': { display: 'flex' },
  'd-grid': { display: 'grid' },
  'd-inline-block': { display: 'inline-block' },
  'd-inline-flex': { display: 'inline-flex' },
  'd-inline-grid': { display: 'inline-grid' },
  'd-inline-table': { display: 'inline-table' },
  'd-list-item': { display: 'list-item' },
  'd-run-in': { display: 'run-in' },
  'd-table': { display: 'table' },
  'd-table-caption': { display: 'table-caption' },
  'd-table-column-group': { display: 'table-column-group' },
  'd-table-header-group': { display: 'table-header-group' },
  'd-table-footer-group': { display: 'table-footer-group' },
  'd-table-row-group': { display: 'table-row-group' },
  'd-table-cell': { display: 'table-cell' },
  'd-table-column': { display: 'table-column' },
  'd-table-row': { display: 'table-row' },
  'd-none': { display: 'none' },
  'd-initial': { display: 'initial' },
  'd-inherit': { display: 'inherit' },
  'print\\:d-inline': { '@media print': { display: 'inline' } },
  'print\\:d-block': { '@media print': { display: 'block' } },
  'print\\:d-contents': { '@media print': { display: 'contents' } },
  'print\\:d-flex': { '@media print': { display: 'flex' } },
  'print\\:d-grid': { '@media print': { display: 'grid' } },
  'print\\:d-inline-block': { '@media print': { display: 'inline-block' } },
  'print\\:d-inline-flex': { '@media print': { display: 'inline-flex' } },
  'print\\:d-inline-grid': { '@media print': { display: 'inline-grid' } },
  'print\\:d-inline-table': { '@media print': { display: 'inline-table' } },
  'print\\:d-list-item': { '@media print': { display: 'list-item' } },
  'print\\:d-run-in': { '@media print': { display: 'run-in' } },
  'print\\:d-table': { '@media print': { display: 'table' } },
  'print\\:d-table-caption': { '@media print': { display: 'table-caption' } },
  'print\\:d-table-column-group': {
    '@media print': { display: 'table-column-group' },
  },
  'print\\:d-table-header-group': {
    '@media print': { display: 'table-header-group' },
  },
  'print\\:d-table-footer-group': {
    '@media print': { display: 'table-footer-group' },
  },
  'print\\:d-table-row-group': {
    '@media print': { display: 'table-row-group' },
  },
  'print\\:d-table-cell': { '@media print': { display: 'table-cell' } },
  'print\\:d-table-column': { '@media print': { display: 'table-column' } },
  'print\\:d-table-row': { '@media print': { display: 'table-row' } },
  'print\\:d-none': { '@media print': { display: 'none' } },
  'print\\:d-initial': { '@media print': { display: 'initial' } },
  'print\\:d-inherit': { '@media print': { display: 'inherit' } },
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
  'overflow-visible': { overflow: 'visible' },
  'overflow-hidden': { overflow: 'hidden' },
  'overflow-scroll': { overflow: 'scroll' },
  'overflow-auto': { overflow: 'auto' },
  'overflow-initial': { overflow: 'initial' },
  'overflow-inherit': { overflow: 'inherit' },
};

const textOverflows = {
  'text-overflow-clip': { textOverflow: 'clip' },
  'text-overflow-ellipsis': { textOverflow: 'ellipsis' },
  'text-overflow-initial': { textOverflow: 'initial' },
  'text-overflow-inherit': { textOverflow: 'inherit' },
};

const visibilities = {
  'v-visible': { visibility: 'visible' },
  'v-hidden': { visibility: 'hidden' },
  'v-collapse': { visibility: 'collapse' },
  'v-initial': { visibility: 'initial' },
  'v-inherit': { visibility: 'inherit' },
};

const whiteSpaces = {
  'ws-normal': { whiteSpace: 'normal' },
  'ws-nowrap': { whiteSpace: 'nowrap' },
  'ws-pre': { whiteSpace: 'pre' },
  'ws-pre-line': { whiteSpace: 'pre-line' },
  'ws-pre-wrap': { whiteSpace: 'pre-wrap' },
  'ws-initial': { whiteSpace: 'initial' },
  'ws-inherit': { whiteSpace: 'inherit' },
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
