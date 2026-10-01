import Menu, { MenuProps } from '@mui/material/Menu';

// slotProps.transition should reject unknown props
<Menu
  open
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
/>;

<Menu
  open
  slotProps={{
    root: {
      // passed to Modal
      disablePortal: true,
      className: 'flex',
    },
    paper: {
      // passed to Paper
      elevation: 0,
      className: 'flex',
    },
    list: {
      // passed to MenuList
      disablePadding: true,
      className: 'flex',
    },
    backdrop: {
      // passed to Backdrop
      invisible: true,
      className: 'flex',
    },
    transition: {
      // passed to Transition
      timeout: 200,
    },
  }}
/>;

<Menu
  open
  slots={{
    root: 'div',
    paper: 'div',
    list: 'div',
    backdrop: 'div',
    transition: 'div',
  }}
/>;

<Menu open slotProps={{ list: { variant: 'menu', className: 'x' } }} />;
<Menu open slotProps={{ list: (ownerState) => ({ variant: ownerState.variant }) }} />;
// @ts-expect-error
<Menu open slotProps={{ list: { nonExistentProp: true } }} />;

function Custom(props: MenuProps) {
  const { slotProps, ...dialogProps } = props;
  return (
    <Menu
      slotProps={{
        ...slotProps,
        transition: (ownerState) => {
          const transitionProps =
            typeof slotProps?.transition === 'function'
              ? slotProps.transition(ownerState)
              : slotProps?.transition;
          return {
            ...transitionProps,
            onExited: (node) => {
              transitionProps?.onExited?.(node);
            },
          };
        },
      }}
      {...dialogProps}
    >
      test
    </Menu>
  );
}
