<Toolbar
  variant="regular"
  sx={(theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: '999px',
    bgcolor: 'hsla(220, 0%, 0%, 0.7)',
    backdropFilter: 'blur(24px)',
    maxHeight: 40,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow:
      '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
    ...theme.applyStyles("light", {
      bgcolor: 'hsla(220, 60%, 99%, 0.6)',
      boxShadow: '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
    })
  })}
></Toolbar>;
