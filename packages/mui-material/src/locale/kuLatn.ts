import type { Localization } from './utils/LocaleTextApi';

export const kuLatn: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Rê nîşan bide',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Biçe rûpela yekem';
          }
          if (type === 'last') {
            return 'Biçe rûpela dawî';
          }
          if (type === 'next') {
            return 'Biçe rûpela din';
          }
          // if (type === 'previous') {
          return 'Biçe rûpela berê';
        },
        labelRowsPerPage: 'Rêz li ser rûpelê:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} of ${count !== -1 ? count : `zêdetir ji ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stêrk`,
        emptyLabelText: 'Vala',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Paqij bike',
        closeText: 'Bigre',
        loadingText: 'Tê barkirin…',
        noOptionsText: 'Vebijêrk tune',
        openText: 'Veke',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bigre',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navîgasyona rûpelan',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Biçe '}rûpel ${page}`;
          }
          if (type === 'first') {
            return 'Biçe rûpela yekem';
          }
          if (type === 'last') {
            return 'Biçe rûpela dawî';
          }
          if (type === 'next') {
            return 'Biçe rûpela din';
          }
          // if (type === 'previous') {
          return 'Biçe rûpela berê';
        },
      },
    },
  },
};
