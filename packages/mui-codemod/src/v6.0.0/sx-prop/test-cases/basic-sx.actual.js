<Toolbar
  variant="regular"
  sx={(theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: '999px',
    bgcolor: theme.palette.mode === 'light' ? 'hsla(220, 60%, 99%, 0.6)' : 'hsla(220, 0%, 0%, 0.7)',
    backdropFilter: 'blur(24px)',
    maxHeight: 40,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
        : '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
  })}
></Toolbar>;

<Box
  component="main"
  sx={{
    backgroundColor: (theme) =>
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }}
></Box>;

<Box
  sx={{
    borderBottom: (theme) =>
      `1px solid ${theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 280,
  }}
/>;
