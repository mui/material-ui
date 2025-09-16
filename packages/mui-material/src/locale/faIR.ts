import type { Localization } from './utils/LocaleTextApi';

export const faIR: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'نمایش مسیر',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'رفتن به اولین صفحه';
          }
          if (type === 'last') {
            return 'رفتن به آخرین صفحه';
          }
          if (type === 'next') {
            return 'رفتن به صفحه‌ی بعدی';
          }
          // if (type === 'previous') {
          return 'رفتن به صفحه‌ی قبلی';
        },
        labelRowsPerPage: 'تعداد سطرهای هر صفحه:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستاره`,
        emptyLabelText: 'خالی',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'پاک‌کردن',
        closeText: 'بستن',
        loadingText: 'در حال بارگذاری…',
        noOptionsText: 'بی‌نتیجه',
        openText: 'بازکردن',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'بستن',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ناوبری صفحه',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'رفتن به '}صفحهٔ ${page}`;
          }
          if (type === 'first') {
            return 'رفتن به اولین صفحه';
          }
          if (type === 'last') {
            return 'رفتن به آخرین صفحه';
          }
          if (type === 'next') {
            return 'رفتن به صفحه‌ی بعدی';
          }
          // if (type === 'previous') {
          return 'رفتن به صفحه‌ی قبلی';
        },
      },
    },
  },
};
