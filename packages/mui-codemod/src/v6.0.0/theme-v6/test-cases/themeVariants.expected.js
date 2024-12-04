export default function getCheckoutTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiStepIcon: {
        styleOverrides: {
          root: ({
            theme
          }) => ({
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
            ...theme.applyStyles("dark", {
              border: `1px solid ${gray[700]}`,
              '&.Mui-active': {
                border: 'none',
                color: theme.palette.primary.light,
              },
              '&.Mui-completed': {
                border: 'none',
                color: theme.palette.success.light,
              }
            }),
            variants: [{
              props: {
                size: 'large'
              },
              style: {
                width: 20,
                height: 20,
              }
            }, {
              props: {
                variant: 'shadow'
              },
              style: {
                ...theme.applyStyles("dark", {
                  boxShadow: theme.shadows[2],
                })
              }
            }, {
              props: { completed: true },
              style: ({
                width: 12,
                height: 12
              }),
            }]
          }),
        }
      },
    },
  };
}
