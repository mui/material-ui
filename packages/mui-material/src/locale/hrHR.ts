import type { Localization } from './utils/LocaleTextApi';

// Croatian - Hrvatski
export const hrHR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaži putanju',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Idi na prvu stranicu';
          }
          if (type === 'last') {
            return 'Idi na posljednju stranicu';
          }
          if (type === 'next') {
            return 'Idi na sljedeću stranicu';
          }
          // if (type === 'previous') {
          return 'Idi na prethodnu stranicu';
        },
        labelRowsPerPage: 'Redova po stranici:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} od ${count !== -1 ? count : `više nego ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          const lastTwoDigits = value % 100;
          if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
            return 'Zvijezde';
          }
          return 'Zvijezda';
        },
        emptyLabelText: 'Prazno',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Briši',
        closeText: 'Zatvori',
        loadingText: 'Učitavanje…',
        noOptionsText: 'Nema opcija',
        openText: 'Otvori',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zatvori',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigacija po stranicama',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Idi na '}stranicu ${page}`;
          }
          if (type === 'first') {
            return 'Idi na prvu stranicu';
          }
          if (type === 'last') {
            return 'Idi na zadnju stranicu';
          }
          if (type === 'next') {
            return 'Idi na sljedeću stranicu';
          }
          // if (type === 'previous') {
          return 'Idi na prethodnu stranicu';
        },
      },
    },
  },
};
