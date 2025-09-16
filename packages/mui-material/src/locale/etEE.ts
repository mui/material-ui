import type {Localization} from './utils/LocaleTextApi';

export const etEE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näita teed',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }
          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }
          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          }
          // if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        },
        labelRowsPerPage: 'Ridu leheküljel:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} / ${count !== -1 ? count : `rohkem kui ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Tärn${value !== 1 ? 'i' : ''}`,
        emptyLabelText: 'Tühi',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tühjenda',
        closeText: 'Sulge',
        loadingText: 'Laen…',
        noOptionsText: 'Valikuid ei ole',
        openText: 'Ava',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulge',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Lehekülgede valik',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Vali '}lehekülg ${page}`;
          }
          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }
          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }
          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          }
          // if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        },
      },
    },
  },
};
