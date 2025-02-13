import { ComponentsPropsList } from '../styles/props';

export interface Localization {
  components?: {
    MuiAlert?: {
      defaultProps: Pick<ComponentsPropsList['MuiAlert'], 'closeText'>;
    };
    MuiBreadcrumbs?: { defaultProps: Pick<ComponentsPropsList['MuiBreadcrumbs'], 'expandText'> };
    MuiTablePagination?: {
      defaultProps: Pick<
        ComponentsPropsList['MuiTablePagination'],
        'labelRowsPerPage' | 'labelDisplayedRows' | 'getItemAriaLabel'
      >;
    };
    MuiRating?: {
      defaultProps: Pick<ComponentsPropsList['MuiRating'], 'emptyLabelText' | 'getLabelText'>;
    };
    MuiAutocomplete?: {
      defaultProps: Pick<
        ComponentsPropsList['MuiAutocomplete'],
        'clearText' | 'closeText' | 'loadingText' | 'noOptionsText' | 'openText'
      >;
    };
    // The core package has no dependencies on the @mui/lab components.
    // We can't use ComponentsPropsList, we have to duplicate and inline the definitions.
    MuiPagination?: {
      defaultProps: Pick<ComponentsPropsList['MuiPagination'], 'aria-label' | 'getItemAriaLabel'>;
    };
  };
}
export const amET: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'መንገድ አሳይ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ወደ መጀመሪያው ገጽ ይሂዱ';
          }
          if (type === 'last') {
            return 'ወደ መጨረሻው ገጽ ይሂዱ';
          }
          if (type === 'next') {
            return 'ወደ ቀጣዩ ገጽ ይሂዱ';
          }
          // if (type === 'previous') {
          return 'ወደ ቀዳሚው ገጽ ይሂዱ';
        },
        labelRowsPerPage: 'ረድፎች በአንድ ገጽ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} ከ ${count !== -1 ? count : `${to} በላይ`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ኮከ${value !== 1 ? 'ቦች' : 'ብ'}`,
        emptyLabelText: 'ባዶ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'አጽዳ',
        closeText: 'ዝጋ',
        loadingText: 'በመጫን ላይ…',
        noOptionsText: 'አማራጮች የሉም',
        openText: 'ክፈት',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ዝጋ',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'የገጽ አሰሳ',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ወደ '}ገጽ ${page}${selected ? '' : ' ሂድ'}`;
          }
          if (type === 'first') {
            return 'ወደ መጀመሪያው ገጽ ይሂዱ';
          }
          if (type === 'last') {
            return 'ወደ መጨረሻው ገጽ ይሂዱ';
          }
          if (type === 'next') {
            return 'ወደ ቀጣዩ ገጽ ይሂዱ';
          }
          // if (type === 'previous') {
          return 'ወደ ቀዳሚው ገጽ ይሂዱ';
        },
      },
    },
  },
};

export const arEG: Localization = {
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
            return 'انتقل إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'انتقل إلى الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'انتقل إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'انتقل إلى الصفحة السابقة';
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
        noOptionsText: 'لا يوجد خيارات',
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
            return `${selected ? '' : 'انتقل إلى '} صفحة ${page}`;
          }
          if (type === 'first') {
            return 'انتقل إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'انتقل إلى الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'انتقل إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'انتقل إلى الصفحة السابقة';
        },
      },
    },
  },
};

export const arSA: Localization = {
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

export const arSD: Localization = {
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
            return 'انتقل إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'انتقل إلى الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'انتقل إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'انتقل إلى الصفحة السابقة';
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
        noOptionsText: 'لا يوجد خيارات',
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
            return `${selected ? '' : 'انتقل إلى '} صفحة ${page}`;
          }
          if (type === 'first') {
            return 'انتقل إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'انتقل الي الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'انتقل إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'انتقل إلى الصفحة السابقة';
        },
      },
    },
  },
};

export const azAZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göstər',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }
          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }
          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          }
          // if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        },
        labelRowsPerPage: 'Səhifəyə düşən sətrlər:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} dən ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
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
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Silmək',
        closeText: 'Bağlamaq',
        loadingText: 'Yüklənir…',
        noOptionsText: 'Seçimlər mövcud deyil',
        openText: 'Открыть',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bağlamaq',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        },
      },
    },
  },
};

export const bnBD: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'পথ দেখান',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }
          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }
          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          }
          // if (type === 'previous') {
          return 'আগের পৃষ্ঠায় যান';
        },
        labelRowsPerPage: 'প্রতি পৃষ্ঠায় সারি:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} / ${count !== -1 ? count : `${to} থেকে বেশি`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} স্টার`,
        emptyLabelText: 'খালি',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'পরিষ্কার করুন',
        closeText: 'বন্ধ করুন',
        loadingText: 'লোড হচ্ছে…',
        noOptionsText: 'কোন অপশন নেই',
        openText: 'ওপেন করুন',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'বন্ধ করুন',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'পেজিনেশন নেভিগেশন',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'যান '}পৃষ্ঠা ${page}-এ`;
          }
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }
          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }
          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          }
          // if (type === 'previous') {
          return 'আগের পৃষ্ঠায় যান';
        },
      },
    },
  },
};

export const beBY: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Паказаць шлях',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перайсці на першую старонку';
          }
          if (type === 'last') {
            return 'Перайсці на апошнюю старонку';
          }
          if (type === 'next') {
            return 'Перайсці на наступную старонку';
          }
          // if (type === 'previous') {
          return 'Перайсці на папярэднюю старонку';
        },
        labelRowsPerPage: 'Радкоў на старонцы:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} з ${count !== -1 ? count : `больш чым ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Зорак';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5 && (value < 10 || value > 20)) {
            pluralForm = 'Зоркі';
          } else if (lastDigit === 1 && value % 100 !== 11) {
            pluralForm = 'Зорка';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Рэйтынг адсутнічае',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Ачысціць',
        closeText: 'Закрыць',
        loadingText: 'Загрузка…',
        noOptionsText: 'Няма варыянтаў',
        openText: 'Адкрыць',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Закрыць',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навігацыя па старонкам',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) {
              return `${page} старонка`;
            }
            return `Перайсці на ${page} старонку`;
          }
          if (type === 'first') {
            return 'Перайсці на першую старонку';
          }
          if (type === 'last') {
            return 'Перайсці на апошнюю старонку';
          }
          if (type === 'next') {
            return 'Перайсці на наступную старонку';
          }
          // if (type === 'previous') {
          return 'Перайсці на папярэднюю старонку';
        },
      },
    },
  },
};

export const bgBG: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показване на пътя',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Отиди на първата страница';
          }
          if (type === 'last') {
            return 'Отиди на последната страница';
          }
          if (type === 'next') {
            return 'Отиди на следващата страница';
          }
          // if (type === 'previous') {
          return 'Отиди на предишната страница';
        },
        labelRowsPerPage: 'Редове на страница:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} от ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Звезд${value !== 1 ? 'и' : 'а'}`,
        emptyLabelText: 'Изчисти',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Изчисти',
        closeText: 'Затвори',
        loadingText: 'Зареждане…',
        noOptionsText: 'Няма налични опции',
        openText: 'Отвори',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Затвори',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Отиди на предишната страница';
        },
      },
    },
  },
};

export const caES: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //    expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Files per pàgina:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Estrelles' : 'Estrella'}`,
        emptyLabelText: 'Buit',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Netejar',
        closeText: 'Tancar',
        loadingText: 'Carregant…',
        noOptionsText: 'Sense opcions',
        openText: 'Obert',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tancat',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const csCZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázat cestu',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Jít na první stránku';
          }
          if (type === 'last') {
            return 'Jít na poslední stránku';
          }
          if (type === 'next') {
            return 'Jít na další stránku';
          }
          // if (type === 'previous') {
          return 'Jít na předchozí stránku';
        },
        labelRowsPerPage: 'Řádků na stránce:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} z ${count !== -1 ? count : `více než ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
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
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazat',
        closeText: 'Zavřít',
        loadingText: 'Načítání…',
        noOptionsText: 'Žádné možnosti',
        openText: 'Otevřít',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavřít',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigace stránkováním',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Jít na '}${page}. stránku`;
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
          // if (type === 'previous') {
          return 'Jít na předchozí stránku';
        },
      },
    },
  },
};

export const daDK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Vis sti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå til den første side';
          }
          if (type === 'last') {
            return 'Gå til den sidste side';
          }
          if (type === 'next') {
            return 'Gå til den næste side';
          }
          // if (type === 'previous') {
          return 'Gå til den forrige side';
        },
        labelRowsPerPage: 'Rækker pr side:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} af ${count !== -1 ? count : `mere end ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stjern${value !== 1 ? 'er' : ''}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Slet',
        closeText: 'Luk',
        loadingText: 'Indlæser…',
        noOptionsText: 'Ingen muligheder',
        openText: 'Åben',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Luk',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sideinddelings navigation',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Go to '}page ${page}`;
          }
          if (type === 'first') {
            return 'Gå til den første side';
          }
          if (type === 'last') {
            return 'Gå til den sidste side';
          }
          if (type === 'next') {
            return 'Gå til den næste side';
          }
          // if (type === 'previous') {
          return 'Gå til den forrige side';
        },
      },
    },
  },
};

export const deDE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pfad anzeigen',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Zur ersten Seite';
          }
          if (type === 'last') {
            return 'Zur letzten Seite';
          }
          if (type === 'next') {
            return 'Zur nächsten Seite';
          }
          // if (type === 'previous') {
          return 'Zur vorherigen Seite';
        },
        labelRowsPerPage: 'Zeilen pro Seite:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} von ${count !== -1 ? count : `mehr als ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Sterne' : 'Stern'}`,
        emptyLabelText: 'Keine Wertung',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Leeren',
        closeText: 'Schließen',
        loadingText: 'Wird geladen…',
        noOptionsText: 'Keine Optionen',
        openText: 'Öffnen',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Schließen',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Zur vorherigen Seite';
        },
      },
    },
  },
};

export const elGR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Εμφάνιση διαδρομής',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }
          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }
          if (type === 'next') {
            return 'Επόμενη σελίδα';
          }

          // if (type === "previous") {
          return 'Προηγούμενη σελίδα';
        },
        labelRowsPerPage: 'Γραμμές ανα σελίδα:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} από ${count !== -1 ? count : `πάνω από ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Αστέρι${value !== 1 ? 'α' : ''}`,
        emptyLabelText: 'Χωρίς βαθμολόγηση',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Καθαρισμός',
        closeText: 'Κλείσιμο',
        loadingText: 'Φόρτωση…',
        noOptionsText: 'Δεν υπάρχουν επιλογές',
        openText: 'Άνοιγμα',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Κλείσιμο',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Πλοήγηση σε σελίδες',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Μετάβαση '}σελίδα ${page}`;
          }
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }
          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }
          if (type === 'next') {
            return 'Επόμενη σελίδα';
          }

          // if (type === "previous") {
          return 'Προηγούμενη σελίδα';
        },
      },
    },
  },
};

// default
export const enUS: Localization = {
  /*
  components: {
    MuiBreadcrumbs: { defaultProps: {
      expandText: 'Show path',
    }},
    MuiTablePagination: { defaultProps: {
      getItemAriaLabel: (type) => {
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) =>
  `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`, 
    }},
    MuiRating: { defaultProps: {
      getLabelText: value => `${value} Star${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Empty',
    }},
    MuiAutocomplete: { defaultProps: {
      clearText: 'Clear',
      closeText: 'Close',
      loadingText: 'Loading…',
      noOptionsText: 'No options',
      openText: 'Open',
    }},
    MuiAlert: { defaultProps: {
      closeText: 'Close',
    }},
    MuiPagination: {  defaultProps: {
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
        // if (type === 'previous') {
        return 'Go to previous page';
      },
    }},
  },
*/
};

export const esES: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar ruta',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ir a la primera página';
          }
          if (type === 'last') {
            return 'Ir a la última página';
          }
          if (type === 'next') {
            return 'Ir a la página siguiente';
          }
          // if (type === 'previous') {
          return 'Ir a la página anterior';
        },
        labelRowsPerPage: 'Filas por página:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Estrella${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vacío',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpiar',
        closeText: 'Cerrar',
        loadingText: 'Cargando…',
        noOptionsText: 'Sin opciones',
        openText: 'Abierto',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Cerrar',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Ir a la página anterior';
        },
      },
    },
  },
};

export const etEE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näita teed',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }
          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }
          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          }
          // if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        },
        labelRowsPerPage: 'Ridu leheküljel:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} / ${count !== -1 ? count : `rohkem kui ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Tärn${value !== 1 ? 'i' : ''}`,
        emptyLabelText: 'Tühi',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tühjenda',
        closeText: 'Sulge',
        loadingText: 'Laen…',
        noOptionsText: 'Valikuid ei ole',
        openText: 'Ava',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulge',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        },
      },
    },
  },
};

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

export const fiFI: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näytä reitti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Mene ensimmäiselle sivulle';
          }
          if (type === 'last') {
            return 'Mene viimeiselle sivulle';
          }
          if (type === 'next') {
            return 'Mene seuraavalle sivulle';
          }
          // if (type === 'previous') {
          return 'Mene edelliselle sivulle';
        },
        labelRowsPerPage: 'Rivejä per sivu:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} / ${count !== -1 ? count : `enemmän kuin ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Täht${value !== 1 ? 'eä' : 'i'}`,
        emptyLabelText: 'Tyhjä',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tyhjennä',
        closeText: 'Sulje',
        loadingText: 'Ladataan…',
        noOptionsText: 'Ei valintoja',
        openText: 'Avaa',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulje',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Mene edelliselle sivulle';
        },
      },
    },
  },
};

export const frFR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Montrer le chemin',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Aller à la première page';
          }
          if (type === 'last') {
            return 'Aller à la dernière page';
          }
          if (type === 'next') {
            return 'Aller à la page suivante';
          }
          // if (type === 'previous') {
          return 'Aller à la page précédente';
        },
        labelRowsPerPage: 'Lignes par page :',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} sur ${count !== -1 ? count : `plus que ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Etoile${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vide',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vider',
        closeText: 'Fermer',
        loadingText: 'Chargement…',
        noOptionsText: 'Pas de résultats',
        openText: 'Ouvrir',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fermer',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Aller à la page précédente';
        },
      },
    },
  },
};

export const heIL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'הצג נתיב',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'לעמוד הראשון';
          }
          if (type === 'last') {
            return 'לעמוד האחרון';
          }
          if (type === 'next') {
            return 'לעמוד הבא';
          }
          // if (type === 'previous') {
          return 'לעמוד הקודם';
        },
        labelRowsPerPage: 'שורות בעמוד:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} כוכב${value !== 1 ? 'ים' : ''}`,
        emptyLabelText: 'ריק',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'נקה',
        closeText: 'סגור',
        loadingText: 'טוען…',
        noOptionsText: 'אין אופציות',
        openText: 'פתח',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'סגור',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ניווט בעמודים',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ל '}עמוד ${page}`;
          }
          if (type === 'first') {
            return 'לעמוד הראשון';
          }
          if (type === 'last') {
            return 'לעמוד האחרון';
          }
          if (type === 'next') {
            return 'לעמוד הבא';
          }
          // if (type === 'previous') {
          return 'לעמוד הקודם';
        },
      },
    },
  },
};

export const hiIN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'रास्ता दिखायें',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }
          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }
          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          }
          // if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        },
        labelRowsPerPage: 'पंक्तियाँ प्रति पृष्ठ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to === -1 ? count : to} कुल ${count} में`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} तार${value !== 1 ? 'े' : 'ा'}`,
        emptyLabelText: 'रिक्त',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'हटायें',
        closeText: 'बंद करें',
        loadingText: 'लोड हो रहा है…',
        noOptionsText: 'कोई विकल्प नहीं',
        openText: 'खोलें',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'बंद करें',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        },
      },
    },
  },
};

// Croatian - Hrvatski
export const hrHR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaži putanju',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Idi na prvu stranicu';
          }
          if (type === 'last') {
            return 'Idi na posljednju stranicu';
          }
          if (type === 'next') {
            return 'Idi na sljedeću stranicu';
          }
          // if (type === 'previous') {
          return 'Idi na prethodnu stranicu';
        },
        labelRowsPerPage: 'Redova po stranici:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} od ${count !== -1 ? count : `više nego ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          const lastTwoDigits = value % 100;
          if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
            return 'Zvijezde';
          }
          return 'Zvijezda';
        },
        emptyLabelText: 'Prazno',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Briši',
        closeText: 'Zatvori',
        loadingText: 'Učitavanje…',
        noOptionsText: 'Nema opcija',
        openText: 'Otvori',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zatvori',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigacija po stranicama',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Idi na '}stranicu ${page}`;
          }
          if (type === 'first') {
            return 'Idi na prvu stranicu';
          }
          if (type === 'last') {
            return 'Idi na zadnju stranicu';
          }
          if (type === 'next') {
            return 'Idi na sljedeću stranicu';
          }
          // if (type === 'previous') {
          return 'Idi na prethodnu stranicu';
        },
      },
    },
  },
};

export const huHU: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Útvonal',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Első oldalra';
          }
          if (type === 'last') {
            return 'Utolsó oldalra';
          }
          if (type === 'next') {
            return 'Következő oldalra';
          }
          // if (type === 'previous') {
          return 'Előző oldalra';
        },
        labelRowsPerPage: 'Sorok száma:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Csillag`,
        emptyLabelText: 'Üres',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Törlés',
        closeText: 'Bezárás',
        loadingText: 'Töltés…',
        noOptionsText: 'Nincs találat',
        openText: 'Megnyitás',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bezárás',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Előző oldalra';
        },
      },
    },
  },
};

export const hyAM: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Տողեր մեկ էջում`',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Աստղ`,
        emptyLabelText: 'Դատարկ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Մաքրել',
        closeText: 'Փակել',
        loadingText: 'Բեռնում…',
        noOptionsText: 'Տարբերակներ չկան',
        openText: 'Բացել',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Փակել',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const idID: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Baris per halaman:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} dari ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Bintang`,
        // emptyLabelText: 'Empty',
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
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const isIS: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Sýna slóð',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Fara á fyrstu síðu';
          }
          if (type === 'last') {
            return 'Fara á síðustu síðu';
          }
          if (type === 'next') {
            return 'Fara á næstu síðu';
          }
          // if (type === 'previous') {
          return 'Fara á fyrri síðu';
        },
        labelRowsPerPage: 'Raðir á síðu:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} af ${count !== -1 ? count : `fleiri en ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value === 1 ? 'stjarna' : 'stjörnur'}`,
        emptyLabelText: 'Tómt',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hreinsa',
        closeText: 'Loka',
        loadingText: 'Hlaða…',
        noOptionsText: 'Engar niðurstöður',
        openText: 'Opna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Loka',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Síðuflakk',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? 'Síða' : 'Fara á síðu'} ${page}`;
          }
          if (type === 'first') {
            return 'Fara á fyrstu síðu';
          }
          if (type === 'last') {
            return 'Fara á síðustu síðu';
          }
          if (type === 'next') {
            return 'Fara á næstu síðu';
          }
          // if (type === 'previous') {
          return 'Fara á fyrri síðu';
        },
      },
    },
  },
};

export const itIT: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visualizza percorso',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Vai alla prima pagina';
          }
          if (type === 'last') {
            return "Vai all'ultima pagina";
          }
          if (type === 'next') {
            return 'Vai alla pagina successiva';
          }
          // if (type === 'previous') {
          return 'Vai alla pagina precedente';
        },
        labelRowsPerPage: 'Righe per pagina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} di ${count !== -1 ? count : `più di ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stell${value !== 1 ? 'e' : 'a'}`,
        emptyLabelText: 'Vuoto',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Svuota',
        closeText: 'Chiudi',
        loadingText: 'Caricamento in corso…',
        noOptionsText: 'Nessuna opzione',
        openText: 'Apri',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Chiudi',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Vai alla pagina precedente';
        },
      },
    },
  },
};

export const jaJP: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'すべて表示',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '最初のページへ';
          }
          if (type === 'last') {
            return '最後のページへ';
          }
          if (type === 'next') {
            return '次のページへ';
          }
          // if (type === 'previous') {
          return '前のページへ';
        },
        labelRowsPerPage: 'ページあたりの行数:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}～${to} / ${count !== -1 ? count : `${to}以上`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `星${value}`,
        emptyLabelText: '星なし',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'クリア',
        closeText: '閉じる',
        loadingText: '読み込み中…',
        noOptionsText: 'データがありません',
        openText: '開く',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '閉じる',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ページ選択',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `ページ${page}${selected ? '' : 'へ'}`;
          }
          if (type === 'first') {
            return '最初のページへ';
          }
          if (type === 'last') {
            return '最後のページへ';
          }
          if (type === 'next') {
            return '次のページへ';
          }
          // if (type === 'previous') {
          return '前のページへ';
        },
      },
    },
  },
};

export const khKH: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'បង្ហាញផ្លូវ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ទៅទំព័រដំបូង';
          }
          if (type === 'last') {
            return 'ទៅទំព័រចុងក្រោយ';
          }
          if (type === 'next') {
            return 'ទៅទំព័របន្ទាប់';
          }
          // if (type === 'previous') {
          return 'ទៅទំព័រមុន';
        },
        labelRowsPerPage: 'ចំនួនជួរដេកក្នុងមួយទំព័រ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from} - ${to} នៃ ${count !== -1 ? count : `ច្រើនជាង ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ផ្កាយ${value !== 1 ? '' : ''}`,
        emptyLabelText: 'ទទេ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'លុបចោល',
        closeText: 'បិទ',
        loadingText: 'កំពុងលោត…',
        noOptionsText: 'គ្មានជម្រើស',
        openText: 'បើក',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'បិទ',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'រុករកទំព័រ',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ទៅ '}ទំព័រ ${page}`;
          }
          if (type === 'first') {
            return 'ទៅទំព័រដំបូង';
          }
          if (type === 'last') {
            return 'ទៅទំព័រចុងក្រោយ';
          }
          if (type === 'next') {
            return 'ទៅទំព័របន្ទាប់';
          }
          // if (type === 'previous') {
          return 'ទៅទំព័រមុន';
        },
      },
    },
  },
};

export const koKR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '경로 보기',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }
          if (type === 'last') {
            return '마지막 페이지로 이동';
          }
          if (type === 'next') {
            return '다음 페이지로 이동';
          }
          // if (type === 'previous') {
          return '이전 페이지로 이동';
        },
        labelRowsPerPage: '페이지 당 행:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} / ${count !== -1 ? count : `${to}개 이상`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 점`,
        emptyLabelText: '빈 텍스트',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '지우기',
        closeText: '닫기',
        loadingText: '불러오는 중…',
        noOptionsText: '옵션 없음',
        openText: '열기',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '닫기',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '페이지네이션 네비게이션',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page} 번째 페이지${selected ? '' : '로 이동'}`;
          }
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }
          if (type === 'last') {
            return '마지막 페이지로 이동';
          }
          if (type === 'next') {
            return '다음 페이지로 이동';
          }
          // if (type === 'previous') {
          return '이전 페이지로 이동';
        },
      },
    },
  },
};

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

export const kuLatn: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Rê nîşan bide',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Biçe rûpela yekem';
          }
          if (type === 'last') {
            return 'Biçe rûpela dawî';
          }
          if (type === 'next') {
            return 'Biçe rûpela din';
          }
          // if (type === 'previous') {
          return 'Biçe rûpela berê';
        },
        labelRowsPerPage: 'Rêz li ser rûpelê:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} of ${count !== -1 ? count : `zêdetir ji ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stêrk`,
        emptyLabelText: 'Vala',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Paqij bike',
        closeText: 'Bigre',
        loadingText: 'Tê barkirin…',
        noOptionsText: 'Vebijêrk tune',
        openText: 'Veke',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bigre',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navîgasyona rûpelan',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Biçe '}rûpel ${page}`;
          }
          if (type === 'first') {
            return 'Biçe rûpela yekem';
          }
          if (type === 'last') {
            return 'Biçe rûpela dawî';
          }
          if (type === 'next') {
            return 'Biçe rûpela din';
          }
          // if (type === 'previous') {
          return 'Biçe rûpela berê';
        },
      },
    },
  },
};

export const kkKZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Толық жолды көрсету',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }
          if (type === 'last') {
            return 'Соңғы бетке өту';
          }
          if (type === 'next') {
            return 'Келесі бетке өту';
          }
          // if (type === 'previous') {
          return 'Алдыңғы бетке өту';
        },
        labelRowsPerPage: 'Беттегі қатарлар:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? count : `+${to}`} қатардың ішінен ${from}–${to}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} жұлдыз`,
        emptyLabelText: 'Рейтинг жоқ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Тазарту',
        closeText: 'Жабу',
        loadingText: 'Жүктелуде…',
        noOptionsText: 'Қол жетімді нұсқалар жоқ',
        openText: 'Ашу',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Жабу',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Беттерді шарлау',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) {
              return `${page} — бет`;
            }
            return `${page} — бетке өту`;
          }
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }
          if (type === 'last') {
            return 'Соңғы бетке өту';
          }
          if (type === 'next') {
            return 'Келесі бетке өту';
          }
          // if (type === 'previous') {
          return 'Алдыңғы бетке өту';
        },
      },
    },
  },
};

// Macedonian - Македонски
export const mkMK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Прикажи патека',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Оди на прва страница';
          }
          if (type === 'last') {
            return 'Оди на последна страница';
          }
          if (type === 'next') {
            return 'Оди на следна страница';
          }
          // if (type === 'previous') {
          return 'Оди на предходна страница';
        },
        labelRowsPerPage: 'Редови по страница:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} од ${count !== -1 ? count : `повеќе од ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          return `${value} Ѕвезд${lastDigit === 1 ? 'а' : 'и'}`;
        },
        emptyLabelText: 'Празно',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Избриши',
        closeText: 'Затвори',
        loadingText: 'Се презема',
        noOptionsText: 'Нема опција',
        openText: 'Отвори',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Затвори',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навигација низ страници',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Оди на '}страница ${page}`;
          }
          if (type === 'first') {
            return 'Оди на прва страница';
          }
          if (type === 'last') {
            return 'Оди на последна страница';
          }
          if (type === 'next') {
            return 'Оди на следна страница';
          }
          // if (type === 'previous') {
          return 'Оди на предходна страница';
        },
      },
    },
  },
};

// Myanmar - မြန်မာ
export const myMY: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'လမ်းကြောင်းပြပါ။',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ပထမစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'last') {
            return 'နောက်ဆုံးစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'next') {
            return 'နောက်စာမျက်နှာသို့သွားပါ။';
          }
          // if (type === 'previous') {
          return 'ယခင်စာမျက်နှာသို့သွားပါ။';
        },
        labelRowsPerPage: 'စာမျက်နှာအလိုက် အတန်းများ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} ၏ ${count !== -1 ? count : `ထက်ပိုပြီး ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          return `${value} ကြယ်ပွင့်${lastDigit === 1 ? '၎' : ''}`;
        },
        emptyLabelText: 'ဗလာ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'ရှင်းလင်းသော',
        closeText: 'ပိတ်လိုက်',
        loadingText: 'ဖွင့်နေသည်…',
        noOptionsText: 'ရွေးချယ်ခွင့်မရှိပါ။',
        openText: 'ဖွင့်သည်။',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ပိတ်လိုက်',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Pagination အညွှန်း',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'သွားပါ။ '}စာမျက်နှာ ${page}`;
          }
          if (type === 'first') {
            return 'ပထမစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'last') {
            return 'နောက်ဆုံးစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'next') {
            return 'နောက်စာမျက်နှာသို့သွားပါ။';
          }
          // if (type === 'previous') {
          return 'ယခင်စာမျက်နှာသို့သွားပါ။';
        },
      },
    },
  },
};

// Malay-Melayu
export const msMS: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Tunjukkan laluan',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Pergi ke halaman pertama';
          }
          if (type === 'last') {
            return 'Pergi ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Pergi ke halaman seterusnya';
          }
          // if (type === 'previous') {
          return 'Pergi ke halaman sebelumnya';
        },
        labelRowsPerPage: 'Baris setiap halaman:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} daripada ${count !== -1 ? count : `lebih daripada ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          return `${value} Bintang${lastDigit === 1 ? 's' : ''}`;
        },
        emptyLabelText: 'kosong',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Jelas',
        closeText: 'tutup',
        loadingText: 'Memuatkan…',
        noOptionsText: 'Tiada pilihan',
        openText: 'Buka',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'tutup',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigasi penomboran',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Pergi ke '}muka surat ${page}`;
          }
          if (type === 'first') {
            return 'Pergi ke halaman pertama';
          }
          if (type === 'last') {
            return 'Pergi ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Pergi ke halaman seterusnya';
          }
          // if (type === 'previous') {
          return 'Pergi ke halaman sebelumnya';
        },
      },
    },
  },
};

// Nepali-नेपाली
export const neNP: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'बाटो देखाउनुहोस्',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'पहिलो पृष्ठमा जानुहोस्';
          }
          if (type === 'last') {
            return 'अन्तिम पृष्ठमा जानुहोस्';
          }
          if (type === 'next') {
            return 'अर्को पृष्ठमा जानुहोस्';
          }
          // if (type === 'previous') {
          return 'अघिल्लो पृष्ठमा जानुहोस्';
        },
        labelRowsPerPage: 'प्रति पृष्ठ पङ्क्तिहरू:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} को ${count !== -1 ? count : `धेरै ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          return `${value} तारा${lastDigit === 1 ? 'स' : ''}`;
        },
        emptyLabelText: 'खाली',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'खाली गर्नुहोस्',
        closeText: 'बन्द गर्नुहोस्',
        loadingText: 'लोड हुँदै...',
        noOptionsText: 'कुनै विकल्प छैन',
        openText: 'खोल्नुहोस्',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'बन्द गर्नुहोस्',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'पृष्ठांकन नेभिगेसन',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'जाऊ त्यहाँ '}पृष्ठ ${page}`;
          }
          if (type === 'first') {
            return 'पहिलो पृष्ठमा जानुहोस्';
          }
          if (type === 'last') {
            return 'अन्तिम पृष्ठमा जानुहोस्';
          }
          if (type === 'next') {
            return 'अर्को पृष्ठमा जानुहोस्';
          }
          // if (type === 'previous') {
          return 'अघिल्लो पृष्ठमा जानुहोस्';
        },
      },
    },
  },
};

export const nbNO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Vis sti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til forrige side';
        },
        labelRowsPerPage: 'Rader per side:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} av ${count !== -1 ? count : `mer enn ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stjerne${value !== 1 ? 'r' : ''}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tøm',
        closeText: 'Lukk',
        loadingText: 'Laster inn…',
        noOptionsText: 'Ingen alternativer',
        openText: 'Åpne',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Lukk',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Paginering navigasjon',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå til '}side ${page}`;
          }
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til forrige side';
        },
      },
    },
  },
};

export const nnNO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Vis sti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til førre side';
        },
        labelRowsPerPage: 'Rader per side:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} av ${count !== -1 ? count : `fleire enn ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} stjerne${value !== 1 ? 'r' : ''}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tøm',
        closeText: 'Lukk',
        loadingText: 'Lastar inn…',
        noOptionsText: 'Ingen alternativ',
        openText: 'Opna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Lukk',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigasjon for paginering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå til '}side ${page}`;
          }
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til førre side';
        },
      },
    },
  },
};

export const nlNL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pad tonen',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ga naar eerste pagina';
          }
          if (type === 'last') {
            return 'Ga naar laatste pagina';
          }
          if (type === 'next') {
            return 'Ga naar volgende pagina';
          }
          // if (type === 'previous') {
          return 'Ga naar vorige pagina';
        },
        labelRowsPerPage: 'Regels per pagina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} van ${count !== -1 ? count : `meer dan ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Ster${value !== 1 ? 'ren' : ''}`,
        emptyLabelText: 'Leeg',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wissen',
        closeText: 'Sluiten',
        loadingText: 'Laden…',
        noOptionsText: 'Geen opties',
        openText: 'Openen',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sluiten',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigatie via paginering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ga naar '}pagina ${page}`;
          }
          if (type === 'first') {
            return 'Ga naar eerste pagina';
          }
          if (type === 'last') {
            return 'Ga naar laatste pagina';
          }
          if (type === 'next') {
            return 'Ga naar volgende pagina';
          }
          // if (type === 'previous') {
          return 'Ga naar vorige pagina';
        },
      },
    },
  },
};

export const plPL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaż ścieżkę',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }
          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }
          if (type === 'next') {
            return 'Przejdź do następnej strony';
          }
          // if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        },
        labelRowsPerPage: 'Wierszy na stronę:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} z ${count !== -1 ? count : `ponad ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
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
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wyczyść',
        closeText: 'Zamknij',
        loadingText: 'Ładowanie…',
        noOptionsText: 'Brak opcji',
        openText: 'Otwórz',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zamknij',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        },
      },
    },
  },
};

export const psAF: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'لاره ښکاره کړه',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'لومړۍ پاڼې ته لاړ شه';
          }
          if (type === 'last') {
            return 'ورستۍ پاڼې ته لاړ شه';
          }
          if (type === 'next') {
            return 'بلی پاڼې ته لاړ شه';
          }
          // if (type === 'previous') {
          return 'مخکینۍ پاڼې ته لاړ شه';
        },
        labelRowsPerPage: 'په پاڼه کی د کرښو شمیر',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? count : `${to} زیات له`} ${to}- ${from} د`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستوری`,
        emptyLabelText: 'خالی',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'پاک کول',
        closeText: 'تړل',
        loadingText: '... لوډ کیږی',
        noOptionsText: 'بی پایلی',
        openText: 'خلاصول',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'تړل',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'د پاڼو ترتیب',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : ' ته لاړ شه'}پاڼې ${page}`;
          }
          if (type === 'first') {
            return 'لومړۍ پاڼی ته لاړ شه';
          }
          if (type === 'last') {
            return 'وروستۍ پاڼې ته لاړه شه';
          }
          if (type === 'next') {
            return 'بلې پاڼې ته لاړ شه';
          }
          // if (type === 'previous') {
          return 'مخکنۍ پاڼې ته لاړ شه';
        },
      },
    },
  },
};

export const ptBR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar caminho',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ir para a primeira página';
          }
          if (type === 'last') {
            return 'Ir para a última página';
          }
          if (type === 'next') {
            return 'Ir para a próxima página';
          }
          // if (type === 'previous') {
          return 'Ir para a página anterior';
        },
        labelRowsPerPage: 'Linhas por página:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vazio',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpar',
        closeText: 'Fechar',
        loadingText: 'Carregando…',
        noOptionsText: 'Sem opções',
        openText: 'Abrir',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fechar',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Ir para a página anterior';
        },
      },
    },
  },
};

export const ptPT: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar caminho',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Primeira página';
          }
          if (type === 'last') {
            return 'Última página';
          }
          if (type === 'next') {
            return 'Próxima página';
          }
          // if (type === 'previous') {
          return 'Página anterior';
        },
        labelRowsPerPage: 'Linhas por página:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vazio',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpar',
        closeText: 'Fechar',
        loadingText: 'A carregar…',
        noOptionsText: 'Sem opções',
        openText: 'Abrir',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fechar',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Página anterior';
        },
      },
    },
  },
};

export const roRO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Arată calea',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Mergi la prima pagină';
          }
          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }
          if (type === 'next') {
            return 'Mergi la pagina următoare';
          }
          // if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        },
        labelRowsPerPage: 'Rânduri pe pagină:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} din ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} St${value !== 1 ? 'ele' : 'ea'}`,
        emptyLabelText: 'Gol',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Șterge',
        closeText: 'Închide',
        loadingText: 'Se încarcă…',
        noOptionsText: 'Nicio opțiune',
        openText: 'Deschide',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Închide',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        },
      },
    },
  },
};

// Serbian - Srpski
export const srRS: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaži putanju',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Idi na prvu stranicu';
          }
          if (type === 'last') {
            return 'Idi na poslednju stranicu';
          }
          if (type === 'next') {
            return 'Idi na sledeću stranicu';
          }
          // if (type === 'previous') {
          return 'Idi na prethodnu stranicu';
        },
        labelRowsPerPage: 'Redova po stranici:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} od ${count !== -1 ? count : `više nego ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          const lastTwoDigits = value % 100;
          if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
            return 'Zvezde';
          }
          return 'Zvezda';
        },
        emptyLabelText: 'Prazno',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Briši',
        closeText: 'Zatvori',
        loadingText: 'Učitavanje…',
        noOptionsText: 'Nema opcija',
        openText: 'Otvori',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zatvori',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigacija po stranicama',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Idi na '}stranicu ${page}`;
          }
          if (type === 'first') {
            return 'Idi na prvu stranicu';
          }
          if (type === 'last') {
            return 'Idi na zadnju stranicu';
          }
          if (type === 'next') {
            return 'Idi na sledeću stranicu';
          }
          // if (type === 'previous') {
          return 'Idi na prethodnu stranicu';
        },
      },
    },
  },
};

export const ruRU: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показать полный путь',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }
          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }
          if (type === 'next') {
            return 'Перейти на следующую страницу';
          }
          // if (type === 'previous') {
          return 'Перейти на предыдущую страницу';
        },
        labelRowsPerPage: 'Строк на странице:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
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
        emptyLabelText: 'Рейтинг отсутствует',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистить',
        closeText: 'Закрыть',
        loadingText: 'Загрузка…',
        noOptionsText: 'Нет доступных вариантов',
        openText: 'Открыть',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Закрыть',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навигация по страницам',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) {
              return `${page} страница`;
            }
            return `Перейти на ${page} страницу`;
          }
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }
          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }
          if (type === 'next') {
            return 'Перейти на следующую страницу';
          }
          // if (type === 'previous') {
          return 'Перейти на предыдущую страницу';
        },
      },
    },
  },
};

export const siLK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'ගමන් මඟ පෙන්වන්න',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }
          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }
          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          }
          // if (type === 'previous') {
          return 'පෙර පිටුවට යන්න';
        },
        labelRowsPerPage: 'පිටුවක පේළි:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} දක්වා ${count !== -1 ? count : `${to} ට වැඩි ප්‍රමාණයකින්`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `තරු ${value}`,
        emptyLabelText: 'හිස්',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'මකන්න',
        closeText: 'වසන්න',
        loadingText: 'නැංවෙමින්…',
        noOptionsText: 'විකල්ප නැත',
        openText: 'විවෘත කරන්න',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'වසන්න',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'පිටු අතර සංචරණය',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `පිටුව ${page} ${selected ? '' : 'ට යන්න'}`;
          }
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }
          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }
          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          }
          // if (type === 'previous') {
          return 'පෙර පිටුවට යන්න';
        },
      },
    },
  },
};

export const skSK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázať cestu ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }
          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }
          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          }
          // if (type === 'previous') {
          return 'Ísť na predchádzajúcu stránku';
        },
        labelRowsPerPage: 'Riadkov na stránke:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} z ${count !== -1 ? count : `viac ako ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          if (value === 1) {
            return `${value} hviezdička`;
          }
          if (value >= 2 && value <= 4) {
            return `${value} hviezdičky`;
          }
          return `${value} hviezdičiek`;
        },
        emptyLabelText: 'Prázdne',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazať',
        closeText: 'Zavrieť',
        loadingText: 'Načítanie…',
        noOptionsText: 'Žiadne možnosti',
        openText: 'Otvoriť',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavrieť',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigácia stránkovanim',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ísť na '}stránku ${page}`;
          }
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }
          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }
          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          }
          // if (type === 'previous') {
          return 'Ísť na predchádzajúcu stránku';
        },
      },
    },
  },
};

export const svSE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visa sökväg',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå till första sidan';
          }
          if (type === 'last') {
            return 'Gå till sista sidan';
          }
          if (type === 'next') {
            return 'Gå till nästa sida';
          }
          // if (type === 'previous') {
          return 'Gå till föregående sida';
        },
        labelRowsPerPage: 'Rader per sida:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} av ${count !== -1 ? count : `fler än ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Stjärnor' : 'Stjärna'}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Rensa',
        closeText: 'Stäng',
        loadingText: 'Laddar…',
        noOptionsText: 'Inga alternativ',
        openText: 'Öppna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Stäng',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sidnavigering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå till '}sida ${page}`;
          }
          if (type === 'first') {
            return 'Gå till första sidan';
          }
          if (type === 'last') {
            return 'Gå till sista sidan';
          }
          if (type === 'next') {
            return 'Gå till nästa sida';
          }
          // if (type === 'previous') {
          return 'Gå till föregående sida';
        },
      },
    },
  },
};

export const thTH: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'แสดงเส้นทาง',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ไปที่หน้าแรก';
          }
          if (type === 'last') {
            return 'ไปที่หน้าสุดท้าย';
          }
          if (type === 'next') {
            return 'ไปที่หน้าถัดไป';
          }
          // if (type === 'previous') {
          return 'ไปที่หน้าก่อน';
        },
        labelRowsPerPage: 'จำนวนแถวต่อหน้า:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ดาว`,
        emptyLabelText: 'ว่างเปล่า',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'เคลียร์',
        closeText: 'ปิด',
        loadingText: 'กำลังโหลด…',
        noOptionsText: 'ไม่มีตัวเลือก',
        openText: 'เปิด',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ปิด',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ไปที่'}หน้า ${page}`;
          }
          if (type === 'first') {
            return 'ไปที่หน้าแรก';
          }
          if (type === 'last') {
            return 'ไปที่หน้าสุดท้าย';
          }
          if (type === 'next') {
            return 'ไปที่หน้าถัดไป';
          }
          // if (type === 'previous') {
          return 'ไปที่หน้าก่อน';
        },
      },
    },
  },
};

export const trTR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göster',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'İlk sayfaya git';
          }
          if (type === 'last') {
            return 'Son sayfaya git';
          }
          if (type === 'next') {
            return 'Sonraki sayfaya git';
          }
          // if (type === 'previous') {
          return 'Önceki sayfaya git';
        },
        labelRowsPerPage: 'Sayfa başına satır:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} / ${count !== -1 ? count : `${to}'den fazla`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Yıldız`,
        emptyLabelText: 'Boş',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Temizle',
        closeText: 'Kapat',
        loadingText: 'Yükleniyor…',
        noOptionsText: 'Seçenek yok',
        openText: 'Aç',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Kapat',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Önceki sayfaya git';
        },
      },
    },
  },
};

// Tagalog-Tagalog
export const tlTL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ipakita ang landas',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Pumunta sa unang pahina';
          }
          if (type === 'last') {
            return 'Pumunta sa huling pahina';
          }
          if (type === 'next') {
            return 'Pumunta sa susunod na pahina';
          }
          // if (type === 'previous') {
          return 'Pumunta sa nakaraang pahina';
        },
        labelRowsPerPage: 'Mga hilera bawat pahina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} ng ${count !== -1 ? count : `higit sa ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Bituin${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Walang laman',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Maaliwalas',
        closeText: 'Isara',
        loadingText: 'Naglo-load…',
        noOptionsText: 'Walang mga pagpipilian',
        openText: 'Bukas',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Isara',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sayfa navigasyonu',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Pumunta sa'}pahina ${page}`;
          }
          if (type === 'first') {
            return 'Pumunta sa unang pahina';
          }
          if (type === 'last') {
            return 'Pumunta sa huling pahina';
          }
          if (type === 'next') {
            return 'Pumunta sa susunod na pahina';
          }
          // if (type === 'previous') {
          return 'Pumunta sa nakaraang pahina';
        },
      },
    },
  },
};

export const ukUA: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показати шлях сторінок',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }
          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }
          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          }
          // if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        },
        labelRowsPerPage: 'Рядків на сторінці:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} з ${count !== -1 ? count : `понад ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
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
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистити',
        closeText: 'Згорнути',
        loadingText: 'Завантаження…',
        noOptionsText: 'Немає варіантів',
        openText: 'Розгорнути',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Згорнути',
      },
    },
    MuiPagination: {
      defaultProps: {
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
          // if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        },
      },
    },
  },
};

export const urPK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'راستہ دکھائیں',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'پہلے صفحے پر جائیں';
          }
          if (type === 'last') {
            return 'آخری صفحے پر جائیں';
          }
          if (type === 'next') {
            return 'اگلے صفحے پر جائیں';
          }
          // if (type === 'previous') {
          return 'پچھلے صفحے پر جائیں';
        },
        labelRowsPerPage: 'ایک صفحے پر قطاریں:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? `${count} میں سے` : `${to} سے ذیادہ میں سے`} ${from} سے ${to} قطاریں`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستار${value !== 1 ? 'ے' : 'ہ'}`,
        emptyLabelText: 'خالی',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'کلئیر',
        closeText: 'بند کریں',
        loadingText: 'لوڈ ہو رہا ہے۔۔۔',
        noOptionsText: 'کوئی آپشن نہیں',
        openText: 'کھولیں',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'بند کریں',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'صفحات کی ترتیب',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `صفحہ نمبر ${page}${selected ? '' : ' پر جائیں'}`;
          }
          if (type === 'first') {
            return 'پہلے صفحے پر جائیں';
          }
          if (type === 'last') {
            return 'آخری صفحے پر جائیں';
          }
          if (type === 'next') {
            return 'اگلے صفحے پر جائیں';
          }
          // if (type === 'previous') {
          return 'پچھلے صفحے پر جائیں';
        },
      },
    },
  },
};

export const viVN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mở ra',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Tới trang đầu tiên';
          }
          if (type === 'last') {
            return 'Tới trang cuối cùng';
          }
          if (type === 'next') {
            return 'Tới trang tiếp theo';
          }
          // if (type === 'previous') {
          return 'Về trang trước đó';
        },
        labelRowsPerPage: 'Số hàng mỗi trang:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} sao`,
        emptyLabelText: 'Không có dữ liệu',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Xóa',
        closeText: 'Đóng',
        loadingText: 'Đang tải…',
        noOptionsText: 'Không có lựa chọn nào',
        openText: 'Mở',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Đóng',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Thanh điều khiển trang',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Tới '}trang ${page}`;
          }
          if (type === 'first') {
            return 'Tới trang đầu tiên';
          }
          if (type === 'last') {
            return 'Tới trang cuối cùng';
          }
          if (type === 'next') {
            return 'Tới trang tiếp theo';
          }
          // if (type === 'previous') {
          return 'Về trang trước đó';
        },
      },
    },
  },
};

export const zhCN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展开',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '第一页';
          }
          if (type === 'last') {
            return '最后一页';
          }
          if (type === 'next') {
            return '下一页';
          }
          return '上一页';
        },
        labelRowsPerPage: '每页行数:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${from} 条到第 ${to} 条，${count !== -1 ? `共 ${count} 条` : `至少 ${to} 条`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 颗星`,
        emptyLabelText: '无标签',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '关闭',
        loadingText: '加载中……',
        noOptionsText: '没有可用选项',
        openText: '打开',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '关闭',
      },
    },
  },
};

export const zhHK: Localization = {
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
        labelRowsPerPage: '每頁行數:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${from} 項至第 ${to} 項，${count !== -1 ? `共 ${count} 項` : `超過 ${to} 項`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 粒星`,
        emptyLabelText: '無標籤',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清除',
        closeText: '關閉',
        loadingText: '載入中……',
        noOptionsText: '沒有可用選項',
        openText: '開啟',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉',
      },
    },
  },
};

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
