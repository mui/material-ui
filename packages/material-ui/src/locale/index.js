export const azAZ = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Əvvəlki səhifə',
      labelRowsPerPage: 'Səhifəyə düşən sətrlər:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} dən ${count}`,
      nextIconButtonText: 'Növbəti səhifə',
    },
    MuiRating: {
      getLabelText: value => {
        let pluralForm = 'Ulduz';
        const lastDigit = value % 10;

        if (lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'Ulduzlar';
        }

        return `${value} ${pluralForm}`;
      },
    },
    MuiAutocomplete: {
      clearText: 'Silmək',
      closeText: 'Bağlamaq',
      loadingText: 'Yüklənir…',
      noOptionsText: 'Seçimlər mövcud deyil',
      openText: 'Открыть',
    },
  },
};

export const csCZ = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Předchozí stránka',
      labelRowsPerPage: 'Řádků na stránce:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} z ${count}`,
      nextIconButtonText: 'Další stránka',
    },
    MuiRating: {
      getLabelText: value => {
        if (value === 1) {
          return `${value} hvězdička`;
        }
        if (value >= 2 && value <= 4) {
          return `${value} hvězdičky`;
        }
        return `${value} hvězdiček`;
      },
    },
    MuiAutocomplete: {
      clearText: 'Vymazat',
      closeText: 'Zavřít',
      loadingText: 'Načítání…',
      noOptionsText: 'Žádné možnosti',
      openText: 'Otevřít',
    },
  },
};

export const deDE = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Nächste Seite',
      labelRowsPerPage: 'Zeilen pro Seite:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} von ${count}`,
      nextIconButtonText: 'Nächste Seite',
    },
    MuiRating: {
      getLabelText: value => `${value} ${value !== 1 ? 'Sterne' : 'Stern'}`,
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

export const faIR = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'صفحهٔ قبل',
      labelRowsPerPage: 'تعداد سطرهای هر صفحه:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} از ${count}`,
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

export const idID = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Halaman sebelumnya',
      labelRowsPerPage: 'Baris per halaman:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to === -1 ? count : to} dari ${count}`,
      nextIconButtonText: 'Halaman selanjutnya',
    },
    MuiRating: {
      getLabelText: value => `${value} Bintang`,
    },
    MuiAutocomplete: {
      clearText: 'Hapus',
      closeText: 'Tutup',
      loadingText: 'Memuat…',
      noOptionsText: 'Tidak ada opsi',
      openText: 'Buka',
    },
  },
};

export const itIT = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Pagina precedente',
      labelRowsPerPage: 'Righe per pagina:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} di ${count}`,
      nextIconButtonText: 'Pagina successiva',
    },
    MuiRating: {
      getLabelText: value => `${value} Stell${value !== 1 ? 'a' : 'e'}`,
    },
    MuiAutocomplete: {
      clearText: 'Svuota',
      closeText: 'Chiudi',
      loadingText: 'Caricamento in corso…',
      noOptionsText: 'Nessuna opzione',
      openText: 'Apri',
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

export const koKR = {
  props: {
    MuiTablePagination: {
      backIconButtonText: '이전 페이지',
      labelRowsPerPage: '페이지 당 행:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} / ${count}`,
      nextIconButtonText: '다음 페이지',
    },
    MuiRating: {
      getLabelText: value => `${value} 점`,
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
    MuiTablePagination: {
      backIconButtonText: 'Vorige pagina',
      labelRowsPerPage: 'Regels per pagina :',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} van ${count}`,
      nextIconButtonText: 'Volgende pagina',
    },
    MuiRating: {
      getLabelText: value => `${value} Ster${value !== 1 ? 'ren' : ''}`,
    },
    MuiAutocomplete: {
      clearText: 'Wissen',
      closeText: 'Sluiten',
      loadingText: 'Laden…',
      noOptionsText: 'Geen opties',
      openText: 'Openen',
    },
  },
};

export const plPL = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Poprzednia strona',
      labelRowsPerPage: 'Wierszy na stronę:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} z ${count}`,
      nextIconButtonText: 'Następna strona',
    },
    MuiRating: {
      getLabelText: value => {
        let pluralForm = 'gwiazdek';
        const lastDigit = value % 10;

        if ((value < 10 || value > 20) && lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'gwiazdki';
        } else if (value === 1) {
          pluralForm = 'gwiazdka';
        }

        return `${value} ${pluralForm}`;
      },
    },
    MuiAutocomplete: {
      clearText: 'Wyczyść',
      closeText: 'Zamknij',
      loadingText: 'Ładowanie…',
      noOptionsText: 'Brak opcji',
      openText: 'Otwórz',
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

export const roRO = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Pagina precedentă',
      labelRowsPerPage: 'Rânduri pe pagină:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} din ${count}`,
      nextIconButtonText: 'Pagina următoare',
    },
    MuiRating: {
      getLabelText: value => `${value} St${value !== 1 ? 'ele' : 'ea'}`,
    },
    MuiAutocomplete: {
      clearText: 'Șterge',
      closeText: 'Închide',
      loadingText: 'Se încarcă…',
      noOptionsText: 'Nicio opțiune',
      openText: 'Deschide',
    },
  },
};

export const ruRU = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Предыдущая страница',
      labelRowsPerPage: 'Строк на странице:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} из ${count}`,
      nextIconButtonText: 'Следующая страница',
    },
    MuiRating: {
      getLabelText: value => {
        let pluralForm = 'Звёзд';
        const lastDigit = value % 10;

        if (lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'Звезды';
        } else if (lastDigit === 1) {
          pluralForm = 'Звезда';
        }

        return `${value} ${pluralForm}`;
      },
    },
    MuiAutocomplete: {
      clearText: 'Очистить',
      closeText: 'Закрыть',
      loadingText: 'Загрузка…',
      noOptionsText: 'Нет доступных вариантов',
      openText: 'Открыть',
    },
  },
};

export const skSK = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Predchádzajúca stránka',
      labelRowsPerPage: 'Riadkov na stránke:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} z ${count}`,
      nextIconButtonText: 'Ďalšia stránka',
    },
    MuiRating: {
      getLabelText: value => {
        if (value === 1) {
          return `${value} hviezdička`;
        }
        if (value >= 2 && value <= 4) {
          return `${value} hviezdičky`;
        }
        return `${value} hviezdičiek`;
      },
    },
    MuiAutocomplete: {
      clearText: 'Vymazať',
      closeText: 'Zavrieť',
      loadingText: 'Načítanie…',
      noOptionsText: 'Žiadne možnosti',
      openText: 'Otvoriť',
    },
  },
};

export const svSE = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Föregående sida',
      labelRowsPerPage: 'Rader per sida:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} av ${count}`,
      nextIconButtonText: 'Nästa sida',
    },
    MuiRating: {
      getLabelText: value => `${value} ${value !== 1 ? 'Stjärnor' : 'Stjärna'}`,
    },
    MuiAutocomplete: {
      clearText: 'Rensa',
      closeText: 'Stäng',
      loadingText: 'Laddar…',
      noOptionsText: 'Inga alternativ',
      openText: 'Öppen',
    },
  },
};

export const trTR = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Önceki sayfa',
      labelRowsPerPage: 'Sayfa başına satır:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${count} tanesinden ${from}-${to === -1 ? count : to}`,
      nextIconButtonText: 'Sonraki sayfa',
    },
    MuiRating: {
      getLabelText: value => `${value} Yıldız`,
    },
    MuiAutocomplete: {
      clearText: 'Temizle',
      closeText: 'Kapat',
      loadingText: 'Yükleniyor…',
      noOptionsText: 'Seçenek yok',
      openText: 'Aç',
    },
  },
};

export const ukUA = {
  props: {
    MuiTablePagination: {
      backIconButtonText: 'Попередня сторінка',
      labelRowsPerPage: 'Рядків на сторінці:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} з ${count}`,
      nextIconButtonText: 'Наступна сторінка',
    },
    MuiRating: {
      getLabelText: value => {
        let pluralForm = 'Зірок';
        const lastDigit = value % 10;

        if (lastDigit > 1 && lastDigit < 5) {
          pluralForm = 'Зірки';
        } else if (lastDigit === 1) {
          pluralForm = 'Зірка';
        }

        return `${value} ${pluralForm}`;
      },
    },
    MuiAutocomplete: {
      clearText: 'Очистити',
      closeText: 'Згорнути',
      loadingText: 'Завантаження…',
      noOptionsText: 'Немає варіантів',
      openText: 'Розгорнути',
    },
  },
};

export const zhCN = {
  props: {
    MuiTablePagination: {
      backIconButtonText: '上一页',
      labelRowsPerPage: '每页行数:',
      labelDisplayedRows: ({ from, to, count }) => `${from}-${to === -1 ? count : to} 的 ${count}`,
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
