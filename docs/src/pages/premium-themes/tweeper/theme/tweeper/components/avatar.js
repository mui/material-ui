export default ({ attach, AVATAR }) => ({
  MuiAvatar: {
    root: {
      width: 42,
      height: 42,
      backgroundColor: '#fafafa',
      '&:after': {
        border: '1px solid rgba(0,0,0,0.0975)',
        borderRadius: '50%',
        bottom: 0,
        content: '""',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
      },
      [attach(AVATAR.link)]: {
        cursor: 'pointer',
      },
      [attach(AVATAR.small)]: {
        width: 26,
        height: 26,
      },
      [attach(AVATAR.medium)]: {
        width: 50,
        height: 50,
      },
      [attach(AVATAR.ultraLarge)]: {
        width: 138,
        height: 138,
      },
      [attach(AVATAR.bordered)]: {
        boxShadow: '0 0 0 4px #fff',
      },
    },
  },
});
