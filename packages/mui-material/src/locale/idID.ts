import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('id-ID');

export const idID: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Tampilkan jalur',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ke halaman pertama';
          }
          if (type === 'last') {
            return 'Ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Ke halaman berikutnya';
          }
          return 'Ke halaman sebelumnya';
        },
        labelRowsPerPage: 'Baris per halaman:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} dari ${count !== -1 ? formatNumber(count) : `lebih dari ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Bintang`,
        emptyLabelText: 'Kosong',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hapus',
        closeText: 'Tutup',
        loadingText: 'Memuat…',
        noOptionsText: 'Tidak ada opsi',
        openText: 'Buka',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tutup',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigasi halaman',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ke '}halaman ${page}`;
          }
          if (type === 'first') {
            return 'Ke halaman pertama';
          }
          if (type === 'last') {
            return 'Ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Ke halaman berikutnya';
          }
          // if (type === 'previous')
          return 'Ke halaman sebelumnya';
        },
      },
    },
  },
};
