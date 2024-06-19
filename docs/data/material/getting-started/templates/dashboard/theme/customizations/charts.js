import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations = {
  MuiChartsAxis: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiChartsAxis-line': {
          stroke: gray[300],
        },
        '& .MuiChartsAxis-tick': {
          stroke: gray[300],
        },
        '& .MuiChartsAxis-tickLabel': {
          fill: gray[500],
          fontWeight: 500,
        },
        ...theme.applyStyles('dark', {
          '& .MuiChartsAxis-line': {
            stroke: gray[700],
          },
          '& .MuiChartsAxis-tick': {
            stroke: gray[700],
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: gray[300],
            fontWeight: 500,
          },
        }),
      }),
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      mark: ({ theme }) => ({
        ry: 6,
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`,
      }),
      table: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        background: 'hsl(0, 0%, 100%)',
        ...theme.applyStyles('dark', {
          background: gray[900],
        }),
      }),
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        '& .MuiChartsLegend-mark': {
          ry: 6,
        },
      },
    },
  },
  MuiChartsGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiChartsGrid-line': {
          stroke: gray[200],
          strokeDasharray: '4 2',
          strokeWidth: 0.8,
        },
        ...theme.applyStyles('dark', {
          '& .MuiChartsGrid-line': {
            stroke: gray[700],
            strokeDasharray: '4 2',
            strokeWidth: 0.8,
          },
        }),
      }),
    },
  },
};
