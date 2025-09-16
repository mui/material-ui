import type { Localization } from './utils/LocaleTextApi';

export const khKH: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'បង្ហាញផ្លូវ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ទៅទំព័រដំបូង';
          }
          if (type === 'last') {
            return 'ទៅទំព័រចុងក្រោយ';
          }
          if (type === 'next') {
            return 'ទៅទំព័របន្ទាប់';
          }
          // if (type === 'previous') {
          return 'ទៅទំព័រមុន';
        },
        labelRowsPerPage: 'ចំនួនជួរដេកក្នុងមួយទំព័រ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from} - ${to} នៃ ${count !== -1 ? count : `ច្រើនជាង ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ផ្កាយ${value !== 1 ? '' : ''}`,
        emptyLabelText: 'ទទេ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'លុបចោល',
        closeText: 'បិទ',
        loadingText: 'កំពុងលោត…',
        noOptionsText: 'គ្មានជម្រើស',
        openText: 'បើក',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'បិទ',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'រុករកទំព័រ',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ទៅ '}ទំព័រ ${page}`;
          }
          if (type === 'first') {
            return 'ទៅទំព័រដំបូង';
          }
          if (type === 'last') {
            return 'ទៅទំព័រចុងក្រោយ';
          }
          if (type === 'next') {
            return 'ទៅទំព័របន្ទាប់';
          }
          // if (type === 'previous') {
          return 'ទៅទំព័រមុន';
        },
      },
    },
  },
};
