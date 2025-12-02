import type { Localization } from './utils/LocaleTextApi';

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
