import type {Localization} from './utils/LocaleTextApi';

const arSA: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'إظهار المسار',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'الانتقال إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'الانتقال إلى الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'الانتقال إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'الانتقال إلى الصفحة السابقة';
        },
        labelRowsPerPage: 'عدد الصفوف في الصفحة:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} من ${count !== -1 ? count : ` أكثر من${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'نجوم' : 'نجمة'}`,
        emptyLabelText: 'فارغ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'مسح',
        closeText: 'إغلاق',
        loadingText: 'جار التحميل...',
        noOptionsText: 'لا توجد خيارات',
        openText: 'فتح',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'إغلاق',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'التنقل عبر الصفحات',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'الانتقال إلى '} صفحة ${page}`;
          }
          if (type === 'first') {
            return 'الانتقال إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'الانتقال الي الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'الانتقال إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'الانتقال إلى الصفحة السابقة';
        },
      },
    },
  },
};

export default arSA;
