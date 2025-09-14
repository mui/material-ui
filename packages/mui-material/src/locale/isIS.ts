import type {Localization} from './utils/LocaleTextApi';

const isIS: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Sýna slóð',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Fara á fyrstu síðu';
          }
          if (type === 'last') {
            return 'Fara á síðustu síðu';
          }
          if (type === 'next') {
            return 'Fara á næstu síðu';
          }
          // if (type === 'previous') {
          return 'Fara á fyrri síðu';
        },
        labelRowsPerPage: 'Raðir á síðu:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} af ${count !== -1 ? count : `fleiri en ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value === 1 ? 'stjarna' : 'stjörnur'}`,
        emptyLabelText: 'Tómt',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hreinsa',
        closeText: 'Loka',
        loadingText: 'Hlaða…',
        noOptionsText: 'Engar niðurstöður',
        openText: 'Opna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Loka',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Síðuflakk',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? 'Síða' : 'Fara á síðu'} ${page}`;
          }
          if (type === 'first') {
            return 'Fara á fyrstu síðu';
          }
          if (type === 'last') {
            return 'Fara á síðustu síðu';
          }
          if (type === 'next') {
            return 'Fara á næstu síðu';
          }
          // if (type === 'previous') {
          return 'Fara á fyrri síðu';
        },
      },
    },
  },
};

export default isIS
