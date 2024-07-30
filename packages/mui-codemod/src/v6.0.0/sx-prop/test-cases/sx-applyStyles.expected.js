<ButtonBase
  component="span"
  ref={ref}
  {...props}
  disabled={Boolean(disabled)}
  onClick={(event) => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'nearest' });
    }
    if (props.onClick) {
      props.onClick(event);
    }
  }}
  onFocusVisible={(event) => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'nearest' });
    }
    if (props.onFocusVisible) {
      props.onFocusVisible(event);
    }
  }}
  sx={[(theme) => ({
    justifyContent: 'flex-start',
    textAlign: 'left',
    alignItems: 'center',
    borderRadius: 1,
    height: '100%',
    border: '1px solid transparent',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    // color: 'primary.300',
    overflow: 'auto',
    ...theme.applyDarkStyles({
      color: 'primary.800'
    }),
    ...theme.applyStyles('light', {
      color: 'primary.500'
    }),
    '&.Mui-disabled': {
      opacity: 0.4,
    }
  }), (!disableBorder || selected) && {
    borderColor: 'grey.100',
  }, selected && (theme => ({
    bgcolor: `${alpha(theme.palette.primary[50], 0.5)}`,
    borderColor: 'primary.300',
    // color: 'primary.500',
    boxShadow: `0px 1px 4px ${theme.palette.primary[200]}, inset 0px 2px 4px ${alpha(
      theme.palette.primary[100],
      0.5,
    )}`
  })), !selected && {
    '&:hover, &:focus': {
      bgcolor: 'primary.50',
      borderColor: 'primary.100',
      '@media (hover: none)': {
        bgcolor: 'transparent',
      },
    },
  }, (!disableBorder || selected) && (theme => theme.applyDarkStyles({
    borderColor: `${alpha(theme.palette.primaryDark[600], 0.3)}`,
  })), !selected && (theme => theme.applyDarkStyles({
    '&:hover, &:focus': {
      bgcolor: `${alpha(theme.palette.primary[800], 0.1)}`,
      borderColor: `${alpha(theme.palette.primary[500], 0.3)}`,
      '@media (hover: none)': {
        bgcolor: 'transparent',
      },
    },
  })), selected && (theme => theme.applyDarkStyles({
    bgcolor: `${alpha(theme.palette.primary[800], 0.3)}`,
    borderColor: 'primary.700',
    // color: 'primary.300',
    boxShadow: `0px 1px 4px ${
      (theme.vars || theme).palette.primary[900]
    }, inset 0px 2px 4px ${(theme.vars || theme).palette.primaryDark[800]}`,
  })), (!disableBorder || selected) && (theme => theme.applyStyles('light', {
    borderColor: `${alpha(theme.palette.primary[300], 0.3)}`,
  })), ...(Array.isArray(sx) ? sx : [sx])]}
/>;
