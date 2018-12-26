export default ({ red }) => ({
  MuiBadge: {
    root: {
      '&.badge--dotted': {
        '& .MuiBadge-badge': {
          width: 8,
          height: 8,
          backgroundColor: red.main,
          top: 3,
          right: 2,
        },
      },
    },
  },
});
