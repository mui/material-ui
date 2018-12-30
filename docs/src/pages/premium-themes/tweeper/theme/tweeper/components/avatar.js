export default ({ attach, AVATAR }) => ({
  MuiAvatar: {
    // size: 26.25px, 41.25px, 49px, 137px,
    root: {
      width: 41.25,
      height: 41.25,
      backgroundColor: '#fafafa',
      '&:after': {
        border: '1px solid rgba(0,0,0,0.0975)',
        borderRadius: '50%',
        bottom: 0,
        content: '" "',
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
        width: 26.25,
        height: 26.25,
      },
      [attach(AVATAR.medium)]: {
        width: 49,
        height: 49,
      },
      [attach(AVATAR.ultraLarge)]: {
        width: 137,
        height: 137,
      },
      [attach(AVATAR.bordered)]: {
        boxShadow: '0 0 0 4px #ffffff',
      },
    },
  },
});
