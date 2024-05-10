const IconRoot = styled('span')(({
  theme
}) => ({
  userSelect: 'none',
  width: '1em',
  height: '1em',
  // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
  // To remove at some point.
  overflow: 'hidden',
  // allow overflow hidden to take action
  display: 'inline-block',
  // support non-square icon
  textAlign: 'center',
  flexShrink: 0,
  variants: [{
    props: {
      fontSize: "inherit"
    },
    style: {
      fontSize: 'inherit'
    }
  }, {
    props: {
      fontSize: "small"
    },
    style: {
      fontSize: theme.typography.pxToRem(20)
    }
  }, {
    props: {
      fontSize: "medium"
    },
    style: {
      fontSize: theme.typography.pxToRem(24)
    }
  }, {
    props: {
      fontSize: "large"
    },
    style: {
      fontSize: theme.typography.pxToRem(36)
    }
  }, {
    props: {
      color: "primary"
    },
    style: {
      color: (theme.vars || theme).palette.primary.main
    }
  }, {
    props: {
      color: "secondary"
    },
    style: {
      color: (theme.vars || theme).palette.secondary.main
    }
  }, {
    props: {
      color: "info"
    },
    style: {
      color: (theme.vars || theme).palette.info.main
    }
  }, {
    props: {
      color: "success"
    },
    style: {
      color: (theme.vars || theme).palette.success.main
    }
  }, {
    props: {
      color: "warning"
    },
    style: {
      color: (theme.vars || theme).palette.warning.main
    }
  }, {
    props: {
      color: "action"
    },
    style: {
      color: (theme.vars || theme).palette.action.active
    }
  }, {
    props: {
      color: "error"
    },
    style: {
      color: (theme.vars || theme).palette.error.main
    }
  }, {
    props: {
      color: "disabled"
    },
    style: {
      color: (theme.vars || theme).palette.action.disabled
    }
  }, {
    props: {
      color: "inherit"
    },
    style: {
      color: undefined
    }
  }]
}));
