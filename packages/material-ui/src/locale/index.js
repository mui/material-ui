export const azAZ = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Əvvəlki səhifə',
      labelRowsPerPage: 'Səhifəyə düşən sətrlər:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} dən ${count}`,
      nextIconButtonText: 'Növbəti səhifə',
    },
    MuiRating: {
      getLabelText: (value) => {
        let pluralForm = 'Ulduz';
        const lastDigit = value % 10;

        if (lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'Ulduzlar';
        }

        return `${value} ${pluralForm}`;
      },
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Silmək',
      closeText: 'Bağlamaq',
      loadingText: 'Yüklənir…',
      noOptionsText: 'Seçimlər mövcud deyil',
      openText: 'Открыть',
    },
    MuiAlert: {
      closeText: 'Bağlamaq',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const bgBG = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Предишна страница',
      labelRowsPerPage: 'Редове на страница:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} от ${count}`,
      nextIconButtonText: 'Следваща страница',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Звезд${value !== 1 ? 'и' : 'а'}`,
      emptyLabelText: 'Изчисти',
    },
    MuiAutocomplete: {
      clearText: 'Изчисти',
      closeText: 'Затвори',
      loadingText: 'Зареждане…',
      noOptionsText: 'Няма налични опции',
      openText: 'Отвори',
    },
    MuiAlert: {
      closeText: 'Затвори',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const caES = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Pàgina anterior',
      labelRowsPerPage: 'Files per pàgina:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`,
      nextIconButtonText: 'Següent pàgina',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ${value !== 1 ? 'Estrelles' : 'Estrella'}`,
      emptyLabelText: 'Buit',
    },
    MuiAutocomplete: {
      clearText: 'Netejar',
      closeText: 'Tancar',
      loadingText: 'Carregant…',
      noOptionsText: 'Sense opcions',
      openText: 'Obert',
    },
    MuiAlert: {
      closeText: 'Tancat',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const csCZ = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Předchozí stránka',
      labelRowsPerPage: 'Řádků na stránce:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} z ${count}`,
      nextIconButtonText: 'Další stránka',
    },
    MuiRating: {
      getLabelText: (value) => {
        if (value === 1) {
          return `${value} hvězdička`;
        }
        if (value >= 2 && value <= 4) {
          return `${value} hvězdičky`;
        }
        return `${value} hvězdiček`;
      },
      emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Vymazat',
      closeText: 'Zavřít',
      loadingText: 'Načítání…',
      noOptionsText: 'Žádné možnosti',
      openText: 'Otevřít',
    },
    MuiAlert: {
      closeText: 'Zavřít',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const deDE = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Nächste Seite',
      labelRowsPerPage: 'Zeilen pro Seite:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} von ${count}`,
      nextIconButtonText: 'Nächste Seite',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ${value !== 1 ? 'Sterne' : 'Stern'}`,
      emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Leeren',
      closeText: 'Schließen',
      loadingText: 'Wird geladen…',
      noOptionsText: 'Keine Optionen',
      openText: 'Öffnen',
    },
    MuiAlert: {
      closeText: 'Schließen',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

// default
export const enUS = {
  /**
  props: {
    MuiBreadcrumbs: {
      expandText: 'Show path',
    },
    MuiTablePagination: {
      backIconButtonText: 'Previous page',
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} of ${count}`,
      nextIconButtonText: 'Next page',
    },
    MuiRating: {
      getLabelText: value => `${value} Star${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Clear',
      closeText: 'Close',
      loadingText: 'Loading…',
      noOptionsText: 'No options',
      openText: 'Open',
    },
    MuiAlert: {
      closeText: 'Close',
    },
    MuiPagination: {
      'aria-label': 'Pagination navigation',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Go to '}page ${page}`;
        }
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        if (type === 'previous') {
          return 'Go to previous page';
        }
        return undefined;
      },
    },
  },
*/
};

export const esES = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Filas por página:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`,
      nextIconButtonText: 'Siguiente página',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Estrella${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Limpiar',
      closeText: 'Cerrar',
      loadingText: 'Cargando…',
      noOptionsText: 'Sin opciones',
      openText: 'Abierto',
    },
    MuiAlert: {
      closeText: 'Cerrar',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const etEE = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Eelmine lehekülg',
      labelRowsPerPage: 'Ridu leheküljel:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} / ${count}`,
      nextIconButtonText: 'Järgmine lehekülg',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Tärn${value !== 1 ? 'i' : ''}`,
      emptyLabelText: 'Tühi',
    },
    MuiAutocomplete: {
      clearText: 'Tühjenda',
      closeText: 'Sulge',
      loadingText: 'Laen…',
      noOptionsText: 'Valikuid ei ole',
      openText: 'Ava',
    },
    MuiAlert: {
      closeText: 'Sulge',
    },
    MuiPagination: {
      'aria-label': 'Lehekülgede valik',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Vali '}lehekülg ${page}`;
        }
        if (type === 'first') {
          return 'Vali esimene lehekülg';
        }
        if (type === 'last') {
          return 'Vali viimane lehekülg';
        }
        if (type === 'next') {
          return 'Vali järgmine lehekülg';
        }
        if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        }
        return undefined;
      },
    },
  },
};

export const faIR = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiBreadcrumbs: {
      expandText: 'نمایش مسیر',
    },
    MuiTablePagination: {
      backIconButtonText: 'صفحهٔ قبل',
      labelRowsPerPage: 'تعداد سطرهای هر صفحه:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from.toLocaleString('fa-IR')}-${
          to === -1 ? count.toLocaleString('fa-IR') : to.toLocaleString('fa-IR')
        } از ${count.toLocaleString('fa-IR')}`,
      nextIconButtonText: 'صفحهٔ بعد',
    },
    MuiRating: {
      getLabelText: (value) => `${value.toLocaleString('fa-IR')} ستاره`,
      emptyLabelText: 'خالی',
    },
    MuiAutocomplete: {
      clearText: 'پاک‌کردن',
      closeText: 'بستن',
      loadingText: 'در حال بارگذاری…',
      noOptionsText: 'بی‌نتیجه',
      openText: 'بازکردن',
    },
    MuiAlert: {
      closeText: 'بستن',
    },
    MuiPagination: {
      'aria-label': 'ناوبری صفحه',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'رفتن به '}صفحهٔ ${page.toLocaleString('fa-IR')}`;
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
        if (type === 'previous') {
          return 'رفتن به صفحه‌ی قبلی';
        }
        return undefined;
      },
    },
  },
};

export const fiFI = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Edellinen sivu',
      labelRowsPerPage: 'Rivejä per sivu:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} / ${count}`,
      nextIconButtonText: 'Seuraava sivu',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Täht${value !== 1 ? 'eä' : 'i'}`,
      emptyLabelText: 'Tyhjä',
    },
    MuiAutocomplete: {
      clearText: 'Tyhjennä',
      closeText: 'Sulje',
      loadingText: 'Ladataan…',
      noOptionsText: 'Ei valintoja',
      openText: 'Avaa',
    },
    MuiAlert: {
      closeText: 'Sulje',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const frFR = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Montrer le chemin',
    },
    MuiTablePagination: {
      backIconButtonText: 'Page précédente',
      labelRowsPerPage: 'Lignes par page :',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} sur ${count}`,
      nextIconButtonText: 'Page suivante',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Etoile${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Vide',
    },
    MuiAutocomplete: {
      clearText: 'Vider',
      closeText: 'Fermer',
      loadingText: 'Chargement…',
      noOptionsText: 'Pas de résultats',
      openText: 'Ouvrir',
    },
    MuiAlert: {
      closeText: 'Fermer',
    },
    MuiPagination: {
      'aria-label': 'pagination navigation',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Aller à la '}page ${page}`;
        }
        if (type === 'first') {
          return 'Aller à la première page';
        }
        if (type === 'last') {
          return 'Aller à la dernière page';
        }
        if (type === 'next') {
          return 'Aller à la page suivante';
        }
        if (type === 'previous') {
          return 'Aller à la page précédente';
        }
        return undefined;
      },
    },
  },
};

export const heIL = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'העמוד הקודם',
      labelRowsPerPage: 'שורות בעמוד:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to === -1 ? count : to} מתוך ${count}`,
      nextIconButtonText: 'העמוד הבא',
    },
    MuiRating: {
      getLabelText: (value) => `${value} כוכב${value !== 1 ? 'ים' : ''}`,
      emptyLabelText: 'ריק',
    },
    MuiAutocomplete: {
      clearText: 'נקה',
      closeText: 'סגור',
      loadingText: 'טוען…',
      noOptionsText: 'אין אופציות',
      openText: 'פתח',
    },
    MuiAlert: {
      closeText: 'סגור',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const huHU = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Előző oldal',
      labelRowsPerPage: 'Sorok száma:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} / ${count}`,
      nextIconButtonText: 'Következő oldal',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Csillag`,
      emptyLabelText: 'Üres',
    },
    MuiAutocomplete: {
      clearText: 'Törlés',
      closeText: 'Bezárás',
      loadingText: 'Töltés…',
      noOptionsText: 'Nincs találat',
      openText: 'Megnyitás',
    },
    MuiAlert: {
      closeText: 'Bezárás',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const hyAM = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Նախորդը',
      labelRowsPerPage: 'Տողեր մեկ էջում`',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} / ${count}`,
      nextIconButtonText: 'Հաջորդը',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Աստղ`,
      emptyLabelText: 'Դատարկ',
    },
    MuiAutocomplete: {
      clearText: 'Մաքրել',
      closeText: 'Փակել',
      loadingText: 'Բեռնում…',
      noOptionsText: 'Տարբերակներ չկան',
      openText: 'Բացել',
    },
    MuiAlert: {
      closeText: 'Փակել',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const idID = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Halaman sebelumnya',
      labelRowsPerPage: 'Baris per halaman:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to === -1 ? count : to} dari ${count}`,
      nextIconButtonText: 'Halaman selanjutnya',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Bintang`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Hapus',
      closeText: 'Tutup',
      loadingText: 'Memuat…',
      noOptionsText: 'Tidak ada opsi',
      openText: 'Buka',
    },
    MuiAlert: {
      closeText: 'Tutup',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const isIS = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Fyrri síða',
      labelRowsPerPage: 'Raðir á síðu:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} af ${count}`,
      nextIconButtonText: 'Næsta síða',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ${value === 1 ? 'Stjarna' : 'Stjörnur'}`,
      emptyLabelText: 'Tómt',
    },
    MuiAutocomplete: {
      clearText: 'Hreinsa',
      closeText: 'Loka',
      loadingText: 'Hlaða…',
      noOptionsText: 'Engar niðurstöður',
      openText: 'Opna',
    },
    MuiAlert: {
      closeText: 'Loka',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const itIT = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Pagina precedente',
      labelRowsPerPage: 'Righe per pagina:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} di ${count}`,
      nextIconButtonText: 'Pagina successiva',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Stell${value !== 1 ? 'e' : 'a'}`,
      emptyLabelText: 'Vuoto',
    },
    MuiAutocomplete: {
      clearText: 'Svuota',
      closeText: 'Chiudi',
      loadingText: 'Caricamento in corso…',
      noOptionsText: 'Nessuna opzione',
      openText: 'Apri',
    },
    MuiAlert: {
      closeText: 'Chiudi',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const jaJP = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: '前のページ',
      labelRowsPerPage: 'ページごとの行:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} of ${count}`,
      nextIconButtonText: '次のページ',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ${value !== 1 ? '出演者' : '星'}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'クリア',
      closeText: '閉じる',
      loadingText: '積み込み…',
      noOptionsText: '結果がありません',
      openText: '開いた',
    },
    MuiAlert: {
      closeText: '閉じる',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const koKR = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: '이전 페이지',
      labelRowsPerPage: '페이지 당 행:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} / ${count}`,
      nextIconButtonText: '다음 페이지',
    },
    MuiRating: {
      getLabelText: (value) => `${value} 점`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: '지우기',
      closeText: '닫기',
      loadingText: '불러오는 중…',
      noOptionsText: '옵션 없음',
      openText: '열기',
    },
  },
};

export const nlNL = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Vorige pagina',
      labelRowsPerPage: 'Regels per pagina :',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} van ${count}`,
      nextIconButtonText: 'Volgende pagina',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Ster${value !== 1 ? 'ren' : ''}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Wissen',
      closeText: 'Sluiten',
      loadingText: 'Laden…',
      noOptionsText: 'Geen opties',
      openText: 'Openen',
    },
    MuiAlert: {
      closeText: 'Sluiten',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const plPL = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Poprzednia strona',
      labelRowsPerPage: 'Wierszy na stronę:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} z ${count}`,
      nextIconButtonText: 'Następna strona',
    },
    MuiRating: {
      getLabelText: (value) => {
        let pluralForm = 'gwiazdek';
        const lastDigit = value % 10;

        if ((value < 10 || value > 20) && lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'gwiazdki';
        } else if (value === 1) {
          pluralForm = 'gwiazdka';
        }

        return `${value} ${pluralForm}`;
      },
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Wyczyść',
      closeText: 'Zamknij',
      loadingText: 'Ładowanie…',
      noOptionsText: 'Brak opcji',
      openText: 'Otwórz',
    },
    MuiAlert: {
      closeText: 'Zamknij',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const ptBR = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Linhas por página:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`,
      nextIconButtonText: 'Próxima página',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Limpar',
      closeText: 'Fechar',
      loadingText: 'Carregando…',
      noOptionsText: 'Sem opções',
      openText: 'Abrir',
    },
    MuiAlert: {
      closeText: 'Fechar',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const ptPT = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Linhas por página:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`,
      nextIconButtonText: 'Próxima página',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Limpar',
      closeText: 'Fechar',
      loadingText: 'A carregar…',
      noOptionsText: 'Sem opções',
      openText: 'Abrir',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const roRO = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Pagina precedentă',
      labelRowsPerPage: 'Rânduri pe pagină:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} din ${count}`,
      nextIconButtonText: 'Pagina următoare',
    },
    MuiRating: {
      getLabelText: (value) => `${value} St${value !== 1 ? 'ele' : 'ea'}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Șterge',
      closeText: 'Închide',
      loadingText: 'Se încarcă…',
      noOptionsText: 'Nicio opțiune',
      openText: 'Deschide',
    },
    MuiAlert: {
      closeText: 'Închide',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const ruRU = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Предыдущая страница',
      labelRowsPerPage: 'Строк на странице:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} из ${count}`,
      nextIconButtonText: 'Следующая страница',
    },
    MuiRating: {
      getLabelText: (value) => {
        let pluralForm = 'Звёзд';
        const lastDigit = value % 10;

        if (lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'Звезды';
        } else if (lastDigit === 1) {
          pluralForm = 'Звезда';
        }

        return `${value} ${pluralForm}`;
      },
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Очистить',
      closeText: 'Закрыть',
      loadingText: 'Загрузка…',
      noOptionsText: 'Нет доступных вариантов',
      openText: 'Открыть',
    },
    MuiAlert: {
      closeText: 'Закрыть',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const skSK = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Predchádzajúca stránka',
      labelRowsPerPage: 'Riadkov na stránke:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} z ${count}`,
      nextIconButtonText: 'Ďalšia stránka',
    },
    MuiRating: {
      getLabelText: (value) => {
        if (value === 1) {
          return `${value} hviezdička`;
        }
        if (value >= 2 && value <= 4) {
          return `${value} hviezdičky`;
        }
        return `${value} hviezdičiek`;
      },
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Vymazať',
      closeText: 'Zavrieť',
      loadingText: 'Načítanie…',
      noOptionsText: 'Žiadne možnosti',
      openText: 'Otvoriť',
    },
    MuiAlert: {
      closeText: 'Zavrieť',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const svSE = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Föregående sida',
      labelRowsPerPage: 'Rader per sida:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} av ${count}`,
      nextIconButtonText: 'Nästa sida',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ${value !== 1 ? 'Stjärnor' : 'Stjärna'}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Rensa',
      closeText: 'Stäng',
      loadingText: 'Laddar…',
      noOptionsText: 'Inga alternativ',
      openText: 'Öppen',
    },
    MuiAlert: {
      closeText: 'Stäng',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const trTR = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Önceki sayfa',
      labelRowsPerPage: 'Sayfa başına satır:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${count} tanesinden ${from}-${to === -1 ? count : to}`,
      nextIconButtonText: 'Sonraki sayfa',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Yıldız`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Temizle',
      closeText: 'Kapat',
      loadingText: 'Yükleniyor…',
      noOptionsText: 'Seçenek yok',
      openText: 'Aç',
    },
    MuiAlert: {
      closeText: 'Kapat',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const ukUA = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Попередня сторінка',
      labelRowsPerPage: 'Рядків на сторінці:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} з ${count}`,
      nextIconButtonText: 'Наступна сторінка',
    },
    MuiRating: {
      getLabelText: (value) => {
        let pluralForm = 'Зірок';
        const lastDigit = value % 10;

        if (lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'Зірки';
        } else if (lastDigit === 1) {
          pluralForm = 'Зірка';
        }

        return `${value} ${pluralForm}`;
      },
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: 'Очистити',
      closeText: 'Згорнути',
      loadingText: 'Завантаження…',
      noOptionsText: 'Немає варіантів',
      openText: 'Розгорнути',
    },
    MuiAlert: {
      closeText: 'Згорнути',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const viVN = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Trang trước',
      labelRowsPerPage: 'Số hàng mỗi trang:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to === -1 ? count : to} trong ${count}`,
      nextIconButtonText: 'Trang sau',
    },
    MuiRating: {
      getLabelText: (value) => `${value} sao`,
      emptyLabelText: 'Trống',
    },
    MuiAutocomplete: {
      clearText: 'Xóa',
      closeText: 'Đóng',
      loadingText: 'Đang tải…',
      noOptionsText: 'Không có lựa chọn',
      openText: 'Mở',
    },
    MuiAlert: {
      closeText: 'Đóng',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};

export const zhCN = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: '上一页',
      labelRowsPerPage: '每页行数:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} 的 ${count}`,
      nextIconButtonText: '下一页',
    },
    MuiRating: {
      getLabelText: (value) => `${value} 星${value !== 1 ? '星' : ''}`,
      // emptyLabelText: 'Empty',
    },
    MuiAutocomplete: {
      clearText: '明确',
      closeText: '关',
      loadingText: '载入中…',
      noOptionsText: '没有选择',
      openText: '打开',
    },
    MuiAlert: {
      closeText: '关',
    },
    // MuiPagination: {
    //   'aria-label': 'Pagination navigation',
    //   getItemAriaLabel: (type, page, selected) => {
    //     if (type === 'page') {
    //       return `${selected ? '' : 'Go to '}page ${page}`;
    //     }
    //     if (type === 'first') {
    //       return 'Go to first page';
    //     }
    //     if (type === 'last') {
    //       return 'Go to last page';
    //     }
    //     if (type === 'next') {
    //       return 'Go to next page';
    //     }
    //     if (type === 'previous') {
    //       return 'Go to previous page';
    //     }
    //     return undefined;
    //   },
    // },
  },
};
