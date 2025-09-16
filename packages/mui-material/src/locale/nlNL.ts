import type {Localization} from './utils/LocaleTextApi';

export const nlNL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pad tonen',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ga naar eerste pagina';
          }
          if (type === 'last') {
            return 'Ga naar laatste pagina';
          }
          if (type === 'next') {
            return 'Ga naar volgende pagina';
          }
          // if (type === 'previous') {
          return 'Ga naar vorige pagina';
        },
        labelRowsPerPage: 'Regels per pagina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} van ${count !== -1 ? count : `meer dan ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Ster${value !== 1 ? 'ren' : ''}`,
        emptyLabelText: 'Leeg',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wissen',
        closeText: 'Sluiten',
        loadingText: 'Laden…',
        noOptionsText: 'Geen opties',
        openText: 'Openen',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sluiten',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigatie via paginering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ga naar '}pagina ${page}`;
          }
          if (type === 'first') {
            return 'Ga naar eerste pagina';
          }
          if (type === 'last') {
            return 'Ga naar laatste pagina';
          }
          if (type === 'next') {
            return 'Ga naar volgende pagina';
          }
          // if (type === 'previous') {
          return 'Ga naar vorige pagina';
        },
      },
    },
  },
};
