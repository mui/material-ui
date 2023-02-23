import { alpha } from '@mui/material/styles';
import { adShape } from 'docs/src/modules/components/AdManager';

const adBodyImageStyles = (theme) => ({
  root: {
    display: 'block',
    overflow: 'hidden',
    border: `1px solid ${alpha(theme.palette.action.active, 0.12)}`,
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(
      1.5,
    )} calc(${theme.spacing(1.5)} + 130px)`,
    borderRadius: theme.shape.borderRadius,
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
    ...theme.typography.body1,
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

const adBodyInlineStyles = (theme) => {
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
      '&:before': {
        border: '1px solid #3e8e41',
        color: '#3e8e41',
        marginRight: 6,
        padding: '1px 5px',
        borderRadius: 3,
        content: '"Ad"',
        fontSize: theme.typography.pxToRem(14),
      },
      '&:after': {
        marginLeft: 4,
        content: '"Get started"',
        // Style taken from the Link component
        color: theme.palette.secondary.main,
        '&:hover': {
          textDecoration: 'underline',
        },
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

export const adStylesObject = {
  'body-image': adBodyImageStyles,
  'body-inline': adBodyInlineStyles,
};

export default adStylesObject[`body-${adShape}`];
