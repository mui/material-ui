import type { Localization } from './utils/LocaleTextApi';

export const nnNO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Vis sti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til førre side';
        },
        labelRowsPerPage: 'Rader per side:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} av ${count !== -1 ? count : `fleire enn ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} stjerne${value !== 1 ? 'r' : ''}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tøm',
        closeText: 'Lukk',
        loadingText: 'Lastar inn…',
        noOptionsText: 'Ingen alternativ',
        openText: 'Opna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Lukk',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigasjon for paginering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå til '}side ${page}`;
          }
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til førre side';
        },
      },
    },
  },
};
