import type { Localization } from './utils/LocaleTextApi';

export const uzUZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yoʻlni koʻrsatish',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Birinchi sahifaga oʻtish';
          }
          if (type === 'last') {
            return 'Oxirgi sahifaga oʻtish';
          }
          if (type === 'next') {
            return 'Keyingi sahifaga oʻtish';
          }
          // if (type === 'previous') {
          return 'Oldingi sahifaga oʻtish';
        },
        labelRowsPerPage: 'Sahifadagi qatorlar:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to}, jami ${count !== -1 ? count : `${to} tadan koʻp`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} yulduz`,
        emptyLabelText: 'Boʻsh',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tozalash',
        closeText: 'Yopish',
        loadingText: 'Yuklanmoqda…',
        noOptionsText: 'Variantlar yoʻq',
        openText: 'Ochish',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Yopish',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sahifalar navigatsiyasi',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return selected ? `${page}-sahifa` : `${page}-sahifaga oʻtish`;
          }
          if (type === 'first') {
            return 'Birinchi sahifaga oʻtish';
          }
          if (type === 'last') {
            return 'Oxirgi sahifaga oʻtish';
          }
          if (type === 'next') {
            return 'Keyingi sahifaga oʻtish';
          }
          // if (type === 'previous') {
          return 'Oldingi sahifaga oʻtish';
        },
      },
    },
  },
};
