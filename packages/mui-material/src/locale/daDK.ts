import type {Localization} from './utils/LocaleTextApi';

export const daDK: Localization = {
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
            return 'Gå til den første side';
          }
          if (type === 'last') {
            return 'Gå til den sidste side';
          }
          if (type === 'next') {
            return 'Gå til den næste side';
          }
          // if (type === 'previous') {
          return 'Gå til den forrige side';
        },
        labelRowsPerPage: 'Rækker pr side:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} af ${count !== -1 ? count : `mere end ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stjern${value !== 1 ? 'er' : ''}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Slet',
        closeText: 'Luk',
        loadingText: 'Indlæser…',
        noOptionsText: 'Ingen muligheder',
        openText: 'Åben',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Luk',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sideinddelings navigation',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Go to '}page ${page}`;
          }
          if (type === 'first') {
            return 'Gå til den første side';
          }
          if (type === 'last') {
            return 'Gå til den sidste side';
          }
          if (type === 'next') {
            return 'Gå til den næste side';
          }
          // if (type === 'previous') {
          return 'Gå til den forrige side';
        },
      },
    },
  },
};
