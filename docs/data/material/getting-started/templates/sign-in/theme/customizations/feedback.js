import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations = {
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};
