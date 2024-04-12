const Test = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
  '& input': {
    borderRadius: 4,
    backgroundColor: '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${'#30363d'}`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${'rgb(12, 45, 107)'}`,
      borderColor: '#388bfd',
    },
  },
  variants: [
    {
      props: {},
      style: theme.applyStyles('light', {
        '& input': {
          backgroundColor: '#fff',
          border: `1px solid ${'#eaecef'}`,
          '&:focus': {
            boxShadow: `0px 0px 0px 3px ${'rgba(3, 102, 214, 0.3)'}`,
            borderColor: '#0366d6',
          },
        },
      }),
    },
  ],
}));
