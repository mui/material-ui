import type { Localization } from './utils/LocaleTextApi';

export const elGR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Εμφάνιση διαδρομής',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }
          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }
          if (type === 'next') {
            return 'Επόμενη σελίδα';
          }

          // if (type === "previous") {
          return 'Προηγούμενη σελίδα';
        },
        labelRowsPerPage: 'Γραμμές ανα σελίδα:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} από ${count !== -1 ? count : `πάνω από ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Αστέρι${value !== 1 ? 'α' : ''}`,
        emptyLabelText: 'Χωρίς βαθμολόγηση',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Καθαρισμός',
        closeText: 'Κλείσιμο',
        loadingText: 'Φόρτωση…',
        noOptionsText: 'Δεν υπάρχουν επιλογές',
        openText: 'Άνοιγμα',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Κλείσιμο',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Πλοήγηση σε σελίδες',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Μετάβαση '}σελίδα ${page}`;
          }
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }
          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }
          if (type === 'next') {
            return 'Επόμενη σελίδα';
          }

          // if (type === "previous") {
          return 'Προηγούμενη σελίδα';
        },
      },
    },
  },
};
