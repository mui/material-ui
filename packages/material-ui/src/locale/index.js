export const deDE = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Nächste Seite',
      labelRowsPerPage: 'Zeilen pro Seite:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} von ${count}`,
      nextIconButtonText: 'Nächste Seite',
    },
    MuiRating: {
      getLabelText: value => `${value} ${value !== 1 ? 'Sterne' : 'Star'}`,
    },
    MuiAutocomplete: {
      clearText: 'Leeren',
      closeText: 'Schließen',
      loadingText: 'Wird geladen…',
      noOptionsText: 'Keine Optionen',
      openText: 'Öffnen',
    },
  },
};

// default
export const enUS = {};

/**
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Previous page',
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} of ${count}`,
      nextIconButtonText: 'Next page',
    },
    MuiRating: {
      getLabelText: value => `${value} Star${value !== 1 ? 's' : ''}`,
    },
    MuiAutocomplete: {
      clearText: 'Clear',
      closeText: 'Close',
      loadingText: 'Loading…',
      noOptionsText: 'No options',
      openText: 'Open',
    },
  },
*/

export const esES = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Filas por página:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`,
      nextIconButtonText: 'Siguiente página',
    },
    MuiRating: {
      getLabelText: value => `${value} Estrella${value !== 1 ? 's' : ''}`,
    },
    MuiAutocomplete: {
      clearText: 'Limpiar',
      closeText: 'Cerrar',
      loadingText: 'Cargando…',
      noOptionsText: 'Sin opciones',
      openText: 'Abierto',
    },
  },
};

export const frFR = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Page précédente',
      labelRowsPerPage: 'Lignes par page :',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} sur ${count}`,
      nextIconButtonText: 'Page suivante',
    },
    MuiRating: {
      getLabelText: value => `${value} Etoile${value !== 1 ? 's' : ''}`,
    },
    MuiAutocomplete: {
      clearText: 'Vider',
      closeText: 'Fermer',
      loadingText: 'Chargement…',
      noOptionsText: 'Pas de résultats',
      openText: 'Ouvrir',
    },
  },
};

export const jaJP = {
  props: {
    MuiTablePagination: {
      backIconButtonText: '前のページ',
      labelRowsPerPage: 'ページごとの行:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} of ${count}`,
      nextIconButtonText: '次のページ',
    },
    MuiRating: {
      getLabelText: value => `${value} ${value !== 1 ? '出演者' : '星'}`,
    },
    MuiAutocomplete: {
      clearText: 'クリア',
      closeText: '閉じる',
      loadingText: '積み込み…',
      noOptionsText: '結果がありません',
      openText: '開いた',
    },
  },
};

export const ptBR = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Linhas por página:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`,
      nextIconButtonText: 'Próxima página',
    },
    MuiRating: {
      getLabelText: value => `${value} Estrela${value !== 1 ? 's' : ''}`,
    },
    MuiAutocomplete: {
      clearText: 'Limpar',
      closeText: 'Fechar',
      loadingText: 'Carregando…',
      noOptionsText: 'Sem opções',
      openText: 'Abrir',
    },
  },
};

export const ruRU = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Предыдущая страница',
      labelRowsPerPage: 'Строк на страницу:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} of ${count}`,
      nextIconButtonText: 'Следующая страница',
    },
    MuiRating: {
      getLabelText: value => `${value} ${value !== 1 ? 'Звезды' : 'звезда'}`,
    },
    MuiAutocomplete: {
      clearText: 'чистый',
      closeText: 'близко',
      loadingText: 'загрузка…',
      noOptionsText: 'Нет вариантов',
      openText: 'открыто',
    },
  },
};

export const zhCN = {
  props: {
    MuiTablePagination: {
      backIconButtonText: '上一页',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} 的 ${count}`,
      labelRowsPerPage: '每页行数:',
      nextIconButtonText: '下一页',
    },
    MuiRating: {
      getLabelText: value => `${value} 星${value !== 1 ? '星' : ''}`,
    },
    MuiAutocomplete: {
      clearText: '明确',
      closeText: '关',
      loadingText: '载入中…',
      noOptionsText: '没有选择',
      openText: '打开',
    },
  },
};

export const faIR = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'صفحهٔ قبل',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} از ${count}`,
      labelRowsPerPage: 'تعداد سطرهای هر صفحه:',
      nextIconButtonText: 'صفحهٔ بعد',
    },
    MuiRating: {
      getLabelText: value => `${value} ستاره`,
    },
    MuiAutocomplete: {
      clearText: 'پاک‌کردن',
      closeText: 'بستن',
      loadingText: 'در حال بارگذاری…',
      noOptionsText: 'بی‌نتیجه',
      openText: 'بازکردن',
    },
  },
};
