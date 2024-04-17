const Test = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
  ...theme.applyStyles("dark", {
    color: theme.palette.primary.light,
    background: `linear-gradient(45deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[200]} 90%})`
  })
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${'#30363d'}`,
  boxShadow: `0 8px 24px ${
    'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: '#c9d1d9',
  backgroundColor: '#1c2128',
  ...theme.applyStyles("light", {
    border: `1px solid ${'#e1e4e8'}`,
    boxShadow: `0 8px 24px ${'rgba(149, 157, 165, 0.2)'}`,
    color: '#24292e',
    backgroundColor: '#fff'
  })
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles("dark", {
          backgroundColor: '#177ddc'
        })
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles("dark", {
      backgroundColor: 'rgba(255,255,255,.35)'
    })
  },
}));
