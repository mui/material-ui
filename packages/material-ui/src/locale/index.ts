import * as React from 'react';
import type { ComponentsPropsList } from '../styles/props';

export interface Localization {
  props?: {
    MuiBreadcrumbs?: Pick<ComponentsPropsList['MuiBreadcrumbs'], 'expandText'>;
    MuiTablePagination?: Pick<
      ComponentsPropsList['MuiTablePagination'],
      'backIconButtonText' | 'labelRowsPerPage' | 'labelDisplayedRows' | 'nextIconButtonText'
    >;
    // The core package has no dependencies on the @material-ui/lab components.
    // We can't use ComponentsPropsList, we have to duplicate and inline the definitions.
    MuiRating?: {
      emptyLabelText?: string;
      getLabelText?: (value: number) => string;
    };
    MuiAutocomplete?: {
      clearText?: string;
      closeText?: string;
      loadingText?: React.ReactNode;
      noOptionsText?: React.ReactNode;
      openText?: string;
    };
    MuiAlert?: {
      closeText?: string;
    };
    MuiPagination?: {
      'aria-label'?: string;
      getItemAriaLabel?: (type: string, page: number, selected: boolean) => string | undefined;
    };
  };
}

export const azAZ: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Yolu göstər',
    },
    MuiTablePagination: {
      backIconButtonText: 'Əvvəlki səhifə',
      labelRowsPerPage: 'Səhifəyə düşən sətrlər:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} dən ${count !== -1 ? count : `more than ${to}`}`,
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
      emptyLabelText: 'Boş',
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
    MuiPagination: {
      'aria-label': 'Səhifənin naviqasiyası',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${page} ${selected ? 'səhifə' : 'səhifəyə keç'}`;
        }
        if (type === 'first') {
          return 'Birinci səhifəyə keç';
        }
        if (type === 'last') {
          return 'Sonuncu səhifəyə keç';
        }
        if (type === 'next') {
          return 'Növbəti səhifəyə keç';
        }
        if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        }
        return undefined;
      },
    },
  },
};

export const bgBG: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Показване на пътя',
    },
    MuiTablePagination: {
      backIconButtonText: 'Предишна страница',
      labelRowsPerPage: 'Редове на страница:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} от ${count !== -1 ? count : `more than ${to}`}`,
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
    MuiPagination: {
      'aria-label': 'Пагинация',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Към '}страница ${page}`;
        }
        if (type === 'first') {
          return 'Отиди на първата страница';
        }
        if (type === 'last') {
          return 'Отиди на последната страница';
        }
        if (type === 'next') {
          return 'Отиди на следващата страница';
        }
        if (type === 'previous') {
          return 'Отиди на предишната страница';
        }
        return undefined;
      },
    },
  },
};

export const caES: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Pàgina anterior',
      labelRowsPerPage: 'Files per pàgina:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`,
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

export const csCZ: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Ukázat cestu',
    },
    MuiTablePagination: {
      backIconButtonText: 'Předchozí stránka',
      labelRowsPerPage: 'Řádků na stránce:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} z ${count !== -1 ? count : `more than ${to}`}`,
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
      emptyLabelText: 'Prázdné',
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
    MuiPagination: {
      'aria-label': 'Navigace stránkováním',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Jít na '}${page} stránku`;
        }
        if (type === 'first') {
          return 'Jít na první stránku';
        }
        if (type === 'last') {
          return 'Jít na poslední stránku';
        }
        if (type === 'next') {
          return 'Jít na další stránku';
        }
        if (type === 'previous') {
          return 'Jít na předchozí stránku';
        }
        return undefined;
      },
    },
  },
};

export const deDE: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Pfad anzeigen',
    },
    MuiTablePagination: {
      backIconButtonText: 'Nächste Seite',
      labelRowsPerPage: 'Zeilen pro Seite:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} von ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'Nächste Seite',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ${value !== 1 ? 'Sterne' : 'Stern'}`,
      emptyLabelText: 'Keine Wertung',
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
    MuiPagination: {
      'aria-label': 'Navigation via Seitennummerierung',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Gehe zu '}Seite ${page}`;
        }
        if (type === 'first') {
          return 'Zur ersten Seite';
        }
        if (type === 'last') {
          return 'Zur letzten Seite';
        }
        if (type === 'next') {
          return 'Zur nächsten Seite';
        }
        if (type === 'previous') {
          return 'Zur vorherigen Seite';
        }
        return undefined;
      },
    },
  },
};

// default
export const enUS: Localization = {
  /*
  props: {
    MuiBreadcrumbs: {
      expandText: 'Show path',
    },
    MuiTablePagination: {
      backIconButtonText: 'Previous page',
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) =>
  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
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

export const esES: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Mostrar ruta',
    },
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Filas por página:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'Siguiente página',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Estrella${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Vacío',
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
    MuiPagination: {
      'aria-label': 'Paginador',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Ir a la '}página ${page}`;
        }
        if (type === 'first') {
          return 'Ir a la primera página';
        }
        if (type === 'last') {
          return 'Ir a la última página';
        }
        if (type === 'next') {
          return 'Ir a la página siguiente';
        }
        if (type === 'previous') {
          return 'Ir a la página anterior';
        }
        return undefined;
      },
    },
  },
};

export const etEE: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Näita teed',
    },
    MuiTablePagination: {
      backIconButtonText: 'Eelmine lehekülg',
      labelRowsPerPage: 'Ridu leheküljel:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
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

export const faIR: Localization = {
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
        `${from}-${to} از ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'صفحهٔ بعد',
    },
    MuiRating: {
      getLabelText: (value) => `${value} ستاره`,
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
        if (type === 'previous') {
          return 'رفتن به صفحه‌ی قبلی';
        }
        return undefined;
      },
    },
  },
};

export const fiFI: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Näytä reitti',
    },
    MuiTablePagination: {
      backIconButtonText: 'Edellinen sivu',
      labelRowsPerPage: 'Rivejä per sivu:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
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
    MuiPagination: {
      'aria-label': 'Sivutus navigaatio',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? 'sivu' : 'Mene sivulle'} ${page}`;
        }
        if (type === 'first') {
          return 'Mene ensimmäiselle sivulle';
        }
        if (type === 'last') {
          return 'Mene viimeiselle sivulle';
        }
        if (type === 'next') {
          return 'Mene seuraavalle sivulle';
        }
        if (type === 'previous') {
          return 'Mene edelliselle sivulle';
        }
        return undefined;
      },
    },
  },
};

export const frFR: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Montrer le chemin',
    },
    MuiTablePagination: {
      backIconButtonText: 'Page précédente',
      labelRowsPerPage: 'Lignes par page :',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} sur ${count !== -1 ? count : `plus que ${to}`}`,
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
      'aria-label': 'navigation de pagination',
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

export const heIL: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'העמוד הקודם',
      labelRowsPerPage: 'שורות בעמוד:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} מתוך ${count !== -1 ? count : `more than ${to}`}`,
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

export const hiIN: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'रास्ता दिखायें',
    },
    MuiTablePagination: {
      backIconButtonText: 'पिछला पृष्ठ',
      labelRowsPerPage: 'पंक्तियाँ प्रति पृष्ठ:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to === -1 ? count : to} कुल ${count} में`,
      nextIconButtonText: 'अगला पृष्ठ',
    },
    MuiRating: {
      getLabelText: (value) => `${value} तार${value !== 1 ? 'े' : 'ा'}`,
      emptyLabelText: 'रिक्त',
    },
    MuiAutocomplete: {
      clearText: 'हटायें',
      closeText: 'बंद करें',
      loadingText: 'लोड हो रहा है…',
      noOptionsText: 'कोई विकल्प नहीं',
      openText: 'खोलें',
    },
    MuiAlert: {
      closeText: 'बंद करें',
    },
    MuiPagination: {
      'aria-label': 'पृस्ठानुसार संचालन',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `पृष्ठ ${page} ${selected ? '' : ' पर जाएँ'}`;
        }
        if (type === 'first') {
          return 'पहले पृष्ठ पर जाएँ';
        }
        if (type === 'last') {
          return 'अंतिम पृष्ठ पर जाएँ';
        }
        if (type === 'next') {
          return 'अगले पृष्ठ पर जाएँ';
        }
        if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        }
        return undefined;
      },
    },
  },
};

export const huHU: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Útvonal',
    },
    MuiTablePagination: {
      backIconButtonText: 'Előző oldal',
      labelRowsPerPage: 'Sorok száma:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
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
    MuiPagination: {
      'aria-label': 'Lapozás',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${page}. oldal${selected ? '' : 'ra'}`;
        }
        if (type === 'first') {
          return 'Első oldalra';
        }
        if (type === 'last') {
          return 'Utolsó oldalra';
        }
        if (type === 'next') {
          return 'Következő oldalra';
        }
        if (type === 'previous') {
          return 'Előző oldalra';
        }
        return undefined;
      },
    },
  },
};

export const hyAM: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Նախորդը',
      labelRowsPerPage: 'Տողեր մեկ էջում`',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
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

export const idID: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Halaman sebelumnya',
      labelRowsPerPage: 'Baris per halaman:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} dari ${count !== -1 ? count : `more than ${to}`}`,
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

export const isIS: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Fyrri síða',
      labelRowsPerPage: 'Raðir á síðu:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} af ${count !== -1 ? count : `more than ${to}`}`,
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

export const itIT: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Visualizza percorso',
    },
    MuiTablePagination: {
      backIconButtonText: 'Pagina precedente',
      labelRowsPerPage: 'Righe per pagina:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} di ${count !== -1 ? count : `more than ${to}`}`,
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
    MuiPagination: {
      'aria-label': 'Navigazione impaginata',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Vai alla '}pagina ${page}`;
        }
        if (type === 'first') {
          return 'Vai alla prima pagina';
        }
        if (type === 'last') {
          return "Vai all'ultima pagina";
        }
        if (type === 'next') {
          return 'Vai alla pagina successiva';
        }
        if (type === 'previous') {
          return 'Vai alla pagina precedente';
        }
        return undefined;
      },
    },
  },
};

export const jaJP: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: '前のページ',
      labelRowsPerPage: 'ページごとの行:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
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

export const koKR: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: '이전 페이지',
      labelRowsPerPage: '페이지 당 행:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
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

export const nlNL: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Vorige pagina',
      labelRowsPerPage: 'Regels per pagina :',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} van ${count !== -1 ? count : `more than ${to}`}`,
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

export const plPL: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Pokaż ścieżkę',
    },
    MuiTablePagination: {
      backIconButtonText: 'Poprzednia strona',
      labelRowsPerPage: 'Wierszy na stronę:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} z ${count !== -1 ? count : `more than ${to}`}`,
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
      emptyLabelText: 'Brak gwiazdek',
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
    MuiPagination: {
      'aria-label': 'Nawigacja podziału na strony',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return selected ? `${page}. strona` : `Przejdź do ${page}. strony`;
        }
        if (type === 'first') {
          return 'Przejdź do pierwszej strony';
        }
        if (type === 'last') {
          return 'Przejdź do ostatniej strony';
        }
        if (type === 'next') {
          return 'Przejdź do następnej strony';
        }
        if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        }
        return undefined;
      },
    },
  },
};

export const ptBR: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Mostrar caminho',
    },
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Linhas por página:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'Próxima página',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Vazio',
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
    MuiPagination: {
      'aria-label': 'Navegar pela paginação',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Ir para a '}página ${page}`;
        }
        if (type === 'first') {
          return 'Ir para a primeira página';
        }
        if (type === 'last') {
          return 'Ir para a última página';
        }
        if (type === 'next') {
          return 'Ir para a próxima página';
        }
        if (type === 'previous') {
          return 'Ir para a página anterior';
        }
        return undefined;
      },
    },
  },
};

export const ptPT: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Mostrar caminho',
    },
    MuiTablePagination: {
      backIconButtonText: 'Página anterior',
      labelRowsPerPage: 'Linhas por página:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'Próxima página',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Vazio',
    },
    MuiAutocomplete: {
      clearText: 'Limpar',
      closeText: 'Fechar',
      loadingText: 'A carregar…',
      noOptionsText: 'Sem opções',
      openText: 'Abrir',
    },
    MuiAlert: {
      closeText: 'Fechar',
    },
    MuiPagination: {
      'aria-label': 'Navegar por páginas',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Ir para a '}página ${page}`;
        }
        if (type === 'first') {
          return 'Primeira página';
        }
        if (type === 'last') {
          return 'Última página';
        }
        if (type === 'next') {
          return 'Próxima página';
        }
        if (type === 'previous') {
          return 'Página anterior';
        }
        return undefined;
      },
    },
  },
};

export const roRO: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Arată calea',
    },
    MuiTablePagination: {
      backIconButtonText: 'Pagina precedentă',
      labelRowsPerPage: 'Rânduri pe pagină:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} din ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'Pagina următoare',
    },
    MuiRating: {
      getLabelText: (value) => `${value} St${value !== 1 ? 'ele' : 'ea'}`,
      emptyLabelText: 'Gol',
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
    MuiPagination: {
      'aria-label': 'Navigare prin paginare',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Mergi la '}pagina ${page}`;
        }
        if (type === 'first') {
          return 'Mergi la prima pagină';
        }
        if (type === 'last') {
          return 'Mergi la ultima pagină';
        }
        if (type === 'next') {
          return 'Mergi la pagina următoare';
        }
        if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        }
        return undefined;
      },
    },
  },
};

export const ruRU: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Предыдущая страница',
      labelRowsPerPage: 'Строк на странице:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`,
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

export const skSK: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Predchádzajúca stránka',
      labelRowsPerPage: 'Riadkov na stránke:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} z ${count !== -1 ? count : `more than ${to}`}`,
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

export const svSE: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Föregående sida',
      labelRowsPerPage: 'Rader per sida:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} av ${count !== -1 ? count : `more than ${to}`}`,
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

export const trTR: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Yolu göster',
    },
    MuiTablePagination: {
      backIconButtonText: 'Önceki sayfa',
      labelRowsPerPage: 'Sayfa başına satır:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} tanesinden ${count !== -1 ? count : `more than ${to}`}`,
      nextIconButtonText: 'Sonraki sayfa',
    },
    MuiRating: {
      getLabelText: (value) => `${value} Yıldız`,
      emptyLabelText: 'Boş',
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
    MuiPagination: {
      'aria-label': 'Sayfa navigasyonu',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${page}. ${selected ? 'sayfa' : 'sayfaya git'}`;
        }
        if (type === 'first') {
          return 'İlk sayfaya git';
        }
        if (type === 'last') {
          return 'Son sayfaya git';
        }
        if (type === 'next') {
          return 'Sonraki sayfaya git';
        }
        if (type === 'previous') {
          return 'Önceki sayfaya git';
        }
        return undefined;
      },
    },
  },
};

export const ukUA: Localization = {
  props: {
    MuiBreadcrumbs: {
      expandText: 'Показати шлях сторінок',
    },
    MuiTablePagination: {
      backIconButtonText: 'Попередня сторінка',
      labelRowsPerPage: 'Рядків на сторінці:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} з ${count !== -1 ? count : `понад ${to}`}`,
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
      emptyLabelText: 'Рейтинг відсутній',
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
    MuiPagination: {
      'aria-label': 'Навігація сторінками',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Перейти на '}сторінку ${page}`;
        }
        if (type === 'first') {
          return 'Перейти на першу сторінку';
        }
        if (type === 'last') {
          return 'Перейти на останню сторінку';
        }
        if (type === 'next') {
          return 'Перейти на наступну сторінку';
        }
        if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        }
        return undefined;
      },
    },
  },
};

export const viVN: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: 'Trang trước',
      labelRowsPerPage: 'Số hàng mỗi trang:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`,
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

export const zhCN: Localization = {
  props: {
    // MuiBreadcrumbs: {
    //   expandText: 'Show path',
    // },
    MuiTablePagination: {
      backIconButtonText: '上一页',
      labelRowsPerPage: '每页行数:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} 的 ${count !== -1 ? count : `超过 ${to}`}`,
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
