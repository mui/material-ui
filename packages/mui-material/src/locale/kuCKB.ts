import type { Localization } from './utils/LocaleTextApi';

export const kuCKB: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'ڕێچکە پیشان بدە',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'چوونە یەکەم پەڕە';
          }
          if (type === 'last') {
            return 'چوونە کۆتا پەڕە';
          }
          if (type === 'next') {
            return 'چوونە پەڕەی دواتر';
          }
          // if (type === 'previous') {
          return 'گەڕانەوە بۆ پەڕەی پێشوو';
        },
        labelRowsPerPage: 'ژمارەی ڕیزەکان لە هەر پەڕەیەک:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} لە ${count !== -1 ? count : ` زیاترە لە${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'ئەستێرەکان' : 'ئەستێرە'}`,
        emptyLabelText: 'خاڵیە',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'سڕینەوە',
        closeText: 'داخستن',
        loadingText: 'لە بارکردندایە...',
        noOptionsText: 'هیچ بژاردەیەک نیە',
        openText: 'کردنەوە',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'داخستن',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'گەڕان لە پەڕەکان',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'چوون بۆ '} پەڕەی ${page}`;
          }
          if (type === 'first') {
            return 'چوونە یەکەم پەڕە';
          }
          if (type === 'last') {
            return 'چوونە کۆتا پەڕە';
          }
          if (type === 'next') {
            return 'چوونە پەڕەی دواتر';
          }
          // if (type === 'previous') {
          return 'گەڕانەوە بۆ پەڕەی پێشوو';
        },
      },
    },
  },
};
