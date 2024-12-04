const FormHelperTextRoot = styled('p')(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.caption,
  textAlign: 'left',
  [`&.${formHelperTextClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
  },
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginTop: 4,
    }
  }, {
    props: {
      variant: 'contained',
      size: 'small'
    },
    style: {
        marginTop: 6,
      }
  }, {
    props: (
      {
        disabled,
        ownerState
      }
    ) => ownerState.size === 'small' &&
      ownerState.variant === 'contained' &&
      disabled,
    style: {
        marginTop: 6,
      }
  }, {
    props: (
      {
        ownerState
      }
    ) => ownerState.size !== 'small',
    style: {
      marginBottom: 4,
    }
  }, {
    props: (
      {
        disabled,
        ownerState
      }
    ) => ownerState.size !== 'small' &&
      ownerState.variant !== 'contained' &&
      !disabled,
    style: {
        marginBottom: 6,
      }
  }, {
    props: (
      {
        ownerState
      }
    ) => ownerState.contained,
    style: {
      marginLeft: 14,
      marginRight: 14,
    }
  }, {
    props: (
      {
        ownerState
      }
    ) => !ownerState.contained,
    style: {
      marginTop: 14,
      marginBottom: 14,
    }
  }, {
    props: (
      {
        ownerState
      }
    ) => !!ownerState.disabled,
    style: {
      opacity: 0.5,
    }
  }]
}));

const Component = styled.div(({
  theme
}) => ({
  ...theme.typography.caption,
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginTop: (theme.vars || theme).spacing(1),
    }
  }]
}));

const ImageListRoot = styled('ul')({
  display: 'grid',
  overflowY: 'auto',
  listStyle: 'none',
  padding: 0,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  variants: [{
    props: {
      variant: 'masonry'
    },
    style: {
      display: 'block',
    }
  }]
});

const ImageListItemRoot = styled('li')(({
  display: 'block',
  position: 'relative',
  [`& .${imageListItemClasses.img}`]: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    display: 'block',
    '&:hover': {
      '&[data-shape="circular"]': {
        borderRadius: '50%'
      },
    }
  },
  variants: [{
    props: {
      variant: 'standard'
    },
    style: {
      [`& .${imageListItemClasses.img}`]: {
        height: 'auto',
        flexGrow: 1,
      }
    }
  }, {
    props: {
      variant: 'unique'
    },
    style: {
      [`& .${imageListItemClasses.img}`]: {
        '&:hover': {
          '&[data-shape="circular"]': {
            height: 'auto',
            flexGrow: 1,
          }
        }
      }
    }
  }]
}));
