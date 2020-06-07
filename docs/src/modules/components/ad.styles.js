import { fade } from '@material-ui/core/styles';
import { adPlacement, adShape } from 'docs/src/modules/components/AdManager';

const adBodyImageStyles = (theme) => ({
  root: {
    display: 'block',
    overflow: 'hidden',
    border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${
      theme.spacing(1.5) + 130
    }px`,
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
  },
});

const adBodyInlineStyles = (theme) => {
  const baseline = adBodyImageStyles(theme);

  return {
    ...baseline,
    root: {},
    imgWrapper: {
      display: 'none',
    },
    description: {
      ...baseline.description,
      marginLeft: 0,
      '&:before': {
        backgroundColor: '#4caf50',
        color: '#fff',
        marginRight: 4,
        padding: '2px 6px',
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
      marginLeft: 0,
    },
    link: {
      display: 'none',
    },
  };
};

const adTocsTopImageStyles = (theme) => ({
  root: {
    display: 'flex',
    borderBottom: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(1.5),
    flexDirection: 'column',
    width: 135,
  },
  imgWrapper: {
    display: 'block',
    width: 130,
    height: 100,
    marginBottom: theme.spacing(1),
  },
  img: {},
  a: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  description: {
    ...theme.typography.body1,
    fontSize: theme.typography.pxToRem(13),
    display: 'block',
  },
  poweredby: {
    ...theme.typography.caption,
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.text.secondary,
    display: 'block',
    marginTop: theme.spacing(0.5),
  },
});

const adTocsBottomImageStyles = (theme) => ({
  ...adTocsTopImageStyles(theme),
  root: {
    display: 'flex',
    borderTop: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1.5),
    flexDirection: 'column',
    width: 135,
  },
});

export default {
  'body-image': adBodyImageStyles,
  'body-inline': adBodyInlineStyles,
  'tocs-top-image': adTocsTopImageStyles,
  'tocs-bottom-image': adTocsBottomImageStyles,
}[`${adPlacement}-${adShape}`];
