const LinearProgressBar1 = styled('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.bar,
      styles[`barColor${capitalize(ownerState.color)}`],
      (ownerState.variant === 'indeterminate' || ownerState.variant === 'query') &&
        styles.bar1Indeterminate,
      ownerState.variant === 'determinate' && styles.bar1Determinate,
      ownerState.variant === 'buffer' && styles.bar1Buffer,
    ];
  },
})(({ ownerState, theme }) => ({
  ...(ownerState.variant === 'buffer' && {
    backgroundColor:
      ownerState.color !== 'normal'
        ? 'currentColor'
        : (theme.vars || theme).palette[ownerState.color].light,
    '&:hover': {
      ...(ownerState.color !== 'inherit'
        ? {
            backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
          }
        : {
            backgroundColor: 'currentColor',
          }),
    },
  }),
  ...(ownerState.variant !== 'buffer' && {
    backgroundColor:
      ownerState.color === 'inherit'
        ? 'currentColor'
        : (theme.vars || theme).palette[ownerState.color].main,
  }),
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => ({
  minHeight: '100vh',
  display: 'grid',
  width: '100%',
  ...(disableToc
    ? {
        [theme.breakpoints.up('md')]: {
          marginRight: TOC_WIDTH / 2,
        },
      }
    : {
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: `1fr ${TOC_WIDTH}px`,
        },
      }),
  '& .markdown-body .comment-link': {
    display: 'flex',
  },
}));

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableAd' && prop !== 'hasTabs' && prop !== 'disableToc',
})(({ disableAd, hasTabs, disableToc, theme }) => {
  return {
    position: 'relative',
    // By default, a grid item cannot be smaller than the size of its content.
    // https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
    minWidth: 0,
    ...(disableToc
      ? {
          // 105ch ≈ 930px
          maxWidth: `calc(105ch + ${TOC_WIDTH / 2}px)`,
        }
      : {
          // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
          fontFamily: 'Arial',
          // 105ch ≈ 930px
          maxWidth: '105ch',
        }),
    ...(!disableAd && {
      ...(hasTabs
        ? {
            '&& .component-tabs .MuiTabs-root': {
              // 40px matches MarkdownElement h2 margin-top.
              marginBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT_MOBILE}px + 40px)`,
              [theme.breakpoints.up('sm')]: {
                marginBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT}px + 40px)`,
              },
            },
            '&& .component-tabs.ad .MuiTabs-root': {
              marginBottom: 0,
            },
          }
        : {
            '&& .description': {
              marginBottom: theme.spacing(AD_MARGIN_BOTTOM),
              paddingBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT_MOBILE}px)`,
              [theme.breakpoints.up('sm')]: {
                paddingBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT}px)`,
              },
            },
            '&& .description.ad': {
              paddingBottom: 0,
              marginBottom: 0,
            },
          }),
    }),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '60px',
      paddingRight: '60px',
    },
  };
});

const DialogContentRoot = styled('div', {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.dividers && styles.dividers];
  },
})(({ theme, ownerState }) => ({
  flex: '1 1 auto',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  overflowY: 'auto',
  padding: '20px 24px',
  ...(ownerState.dividers
    ? {
        padding: '16px 24px',
        borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      }
    : {
        [`.${dialogTitleClasses.root} + &`]: {
          paddingTop: 0,
        },
      }),
}));
