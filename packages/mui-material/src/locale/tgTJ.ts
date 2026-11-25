import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('tg-TJ');

export const tgTJ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Нишон додани масири пурра',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Гузаштан ба саҳифаи аввал';
          }
          if (type === 'last') {
            return 'Гузаштан ба саҳифаи охирин';
          }
          if (type === 'next') {
            return 'Гузаштан ба саҳифаи баъдӣ';
          }
          // if (type === 'previous') {
          return 'Гузаштан ба саҳифаи қаблӣ';
        },
        labelRowsPerPage: 'Сатрҳо дар саҳифа:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} аз ${count !== -1 ? formatNumber(count) : `зиёда аз ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ситора`,
        emptyLabelText: 'Баҳо нест',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Пок кардан',
        closeText: 'Пӯшидан',
        loadingText: 'Бор шуда истодааст…',
        noOptionsText: 'Имконот нест',
        openText: 'Кушодан',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Пӯшидан',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Паймоиш дар саҳифаҳо',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return selected ? `Саҳифаи ${page}` : `Гузаштан ба саҳифаи ${page}`;
          }
          if (type === 'first') {
            return 'Гузаштан ба саҳифаи аввал';
          }
          if (type === 'last') {
            return 'Гузаштан ба саҳифаи охирин';
          }
          if (type === 'next') {
            return 'Гузаштан ба саҳифаи баъдӣ';
          }
          // if (type === 'previous') {
          return 'Гузаштан ба саҳифаи қаблӣ';
        },
      },
    },
  },
};
