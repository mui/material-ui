export default function getCheckoutTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiStepIcon: {
        variants: [
          {
            props: { completed: true },
            style: () => ({
              width: 12,
              height: 12,
            }),
          },
        ],
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            color: 'transparent',
            border: `1px solid ${gray[400]}`,
            width: 12,
            height: 12,
            borderRadius: '50%',
            '& text': {
              display: 'none',
            },
            '&.Mui-active': {
              border: 'none',
              color: theme.palette.primary.main,
            },
            '&.Mui-completed': {
              border: 'none',
              color: theme.palette.success.main,
            },
            ...(ownerState.size === 'large' && {
              width: 20,
              height: 20,
            }),
            ...(theme.palette.mode === 'dark' && {
              border: `1px solid ${gray[700]}`,
              '&.Mui-active': {
                border: 'none',
                color: theme.palette.primary.light,
              },
              '&.Mui-completed': {
                border: 'none',
                color: theme.palette.success.light,
              },
              ...(ownerState.variant === 'shadow' && {
                boxShadow: theme.shadows[2],
              }),
            }),
          }),
        },
      },
    },
  };
}
