import { alpha, Theme } from '@mui/material/styles';

export const adBodyImageStyles = (theme: Theme) => ({
  root: {
    display: 'block',
    overflow: 'hidden',
    border: '1px dashed',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: '8px 8px 8px calc(8px + 130px)',
    [theme.breakpoints.up('sm')]: {
      padding: '12px 12px 12px calc(12px + 130px)',
    },
  },
  imgWrapper: {
    float: 'left',
    marginLeft: -130,
    width: 130,
    height: 100,
  },
  img: {
    verticalAlign: 'middle',
  },
  a: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  description: {
    ...theme.typography.body2,
    [theme.breakpoints.up('sm')]: {
      ...theme.typography.body1,
    },
    display: 'block',
    marginLeft: theme.spacing(1.5),
  },
  poweredby: {
    ...theme.typography.caption,
    marginLeft: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    display: 'block',
    marginTop: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export const adBodyInlineStyles = (theme: Theme) => {
  const baseline = adBodyImageStyles(theme);

  return {
    ...baseline,
    root: {
      display: 'block',
      paddingTop: 8,
    },
    imgWrapper: {
      display: 'none',
    },
    description: {
      ...baseline.description,
      marginLeft: 0,
      '&::before': {
        border: '1px solid #3e8e41',
        color: '#3e8e41',
        marginRight: 6,
        padding: '1px 5px',
        borderRadius: 3,
        content: '"Ad"',
        fontSize: theme.typography.pxToRem(14),
      },
      '&::after': {
        // Link
        marginLeft: 4,
        content: '"Get started"',
        // Style taken from the Link component & MarkdownElement.
        color: theme.palette.primary[600],
        textDecoration: 'underline',
        textDecorationColor: alpha(theme.palette.primary.main, 0.4),
        ...theme.applyStyles('dark', {
          color: theme.palette.primary[300],
        }),
      },
    },
    poweredby: {
      ...baseline.poweredby,
      marginTop: 2,
      marginLeft: 0,
    },
    link: {
      display: 'none',
    },
  };
};
