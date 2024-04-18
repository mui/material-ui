const FormHelperTextRoot = styled('p')(({ theme, ownerState, disabled }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.caption,
  textAlign: 'left',
  [`&.${formHelperTextClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
  },
  ...(ownerState.size === 'small' && {
    marginTop: 4,
  }),
  ...(ownerState.size === 'small' &&
    ownerState.variant === 'contained' && {
      marginTop: 6,
    }),
  ...(ownerState.size === 'small' &&
    ownerState.variant === 'contained' &&
    disabled && {
      marginTop: 6,
    }),
  ...(ownerState.size !== 'small' && {
    marginBottom: 4,
  }),
  ...(ownerState.size !== 'small' &&
    ownerState.variant !== 'contained' &&
    !disabled && {
      marginBottom: 6,
    }),
  ...(ownerState.contained && {
    marginLeft: 14,
    marginRight: 14,
  }),
  ...(!ownerState.contained && {
    marginTop: 14,
    marginBottom: 14,
  }),
  ...(!!ownerState.disabled && {
    opacity: 0.5,
  }),
}));

const Component = styled.div(({ theme, ownerState }) => ({
  ...theme.typography.caption,
  ...(ownerState.size === 'small' && {
    marginTop: (theme.vars || theme).spacing(1),
  }),
}));

const ImageListRoot = styled('ul')(({ ownerState }) => {
  return {
    display: 'grid',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
    ...(ownerState.variant === 'masonry' && {
      display: 'block',
    }),
  };
});

const ImageListItemRoot = styled('li')(({ ownerState }) => ({
  display: 'block',
  position: 'relative',
  [`& .${imageListItemClasses.img}`]: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    display: 'block',
    ...(ownerState.variant === 'standard' && {
      height: 'auto',
      flexGrow: 1,
    }),
    '&:hover': {
      '&[data-shape="circular"]': {
        borderRadius: '50%',
        ...(ownerState.variant === 'unique' && {
          height: 'auto',
          flexGrow: 1,
        }),
      },
    },
  },
}));
