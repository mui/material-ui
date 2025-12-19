import type { Localization } from './utils/LocaleTextApi';

export const zhTW: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展開',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '第一頁';
          }
          if (type === 'last') {
            return '最後一頁';
          }
          if (type === 'next') {
            return '下一頁';
          }
          return '上一頁';
        },
        labelRowsPerPage: '每頁數量:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from} ~ ${to} / ${count !== -1 ? count : `${to} 以上`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 顆星`,
        emptyLabelText: '無標籤',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '關閉',
        loadingText: '載入中…',
        noOptionsText: '沒有可用選項',
        openText: '打開',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉',
      },
    },
  },
};
