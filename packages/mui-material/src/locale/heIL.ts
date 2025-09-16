import type { Localization } from './utils/LocaleTextApi';

export const heIL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'הצג נתיב',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'לעמוד הראשון';
          }
          if (type === 'last') {
            return 'לעמוד האחרון';
          }
          if (type === 'next') {
            return 'לעמוד הבא';
          }
          // if (type === 'previous') {
          return 'לעמוד הקודם';
        },
        labelRowsPerPage: 'שורות בעמוד:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} כוכב${value !== 1 ? 'ים' : ''}`,
        emptyLabelText: 'ריק',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'נקה',
        closeText: 'סגור',
        loadingText: 'טוען…',
        noOptionsText: 'אין אופציות',
        openText: 'פתח',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'סגור',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ניווט בעמודים',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ל '}עמוד ${page}`;
          }
          if (type === 'first') {
            return 'לעמוד הראשון';
          }
          if (type === 'last') {
            return 'לעמוד האחרון';
          }
          if (type === 'next') {
            return 'לעמוד הבא';
          }
          // if (type === 'previous') {
          return 'לעמוד הקודם';
        },
      },
    },
  },
};
