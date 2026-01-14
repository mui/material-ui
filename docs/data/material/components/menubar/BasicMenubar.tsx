import * as React from 'react';
import { Menu } from '@base-ui/react/menu';
import { Menubar } from '@base-ui/react/menubar';
import { styled } from '@mui/material/styles';

const MenubarRoot = styled(Menubar)(({ theme }) => ({
  display: 'flex',
  gap: 1,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.25),
}));

const MenuTrigger = styled(Menu.Trigger)(({ theme }) => ({
  boxSizing: 'border-box',
  background: 'none',
  padding: theme.spacing(0.75, 1.5),
  margin: 0,
  outline: 0,
  border: 0,
  color: theme.palette.text.secondary,
  borderRadius: Number(theme.shape.borderRadius) / 2,
  userSelect: 'none',
  height: 32,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -1,
  },
  '&:active, &[data-pressed], &:focus': {
    backgroundColor: theme.palette.action.hover,
  },
  '&[data-popup-open]': {
    backgroundColor: theme.palette.action.selected,
  },
  '&[data-disabled]': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

const MenuPositioner = styled(Menu.Positioner)({
  outline: 0,
  zIndex: 1300,
});

const MenuPopup = styled(Menu.Popup)(({ theme }) => ({
  boxSizing: 'border-box',
  paddingBlock: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[8],
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 160,
  transformOrigin: 'var(--transform-origin)',
  transition: 'transform 150ms, opacity 150ms',
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
}));

const MenuItem = styled(Menu.Item)(({ theme }) => ({
  outline: 0,
  cursor: 'pointer',
  userSelect: 'none',
  paddingBlock: theme.spacing(0.75),
  paddingInline: theme.spacing(2),
  display: 'flex',
  fontSize: theme.typography.pxToRem(14),
  lineHeight: 1.5,
  '&[data-highlighted]': {
    backgroundColor: theme.palette.action.hover,
  },
  '&[data-disabled]': {
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
}));

const MenuSeparator = styled(Menu.Separator)(({ theme }) => ({
  margin: theme.spacing(0.5, 2),
  height: 1,
  backgroundColor: theme.palette.divider,
}));

const SubmenuTrigger = styled(Menu.SubmenuTrigger)(({ theme }) => ({
  outline: 0,
  cursor: 'pointer',
  userSelect: 'none',
  paddingBlock: theme.spacing(0.75),
  paddingInline: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  fontSize: theme.typography.pxToRem(14),
  lineHeight: 1.5,
  '&[data-highlighted]': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function ChevronRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function BasicMenubar() {
  return (
    <MenubarRoot>
      <Menu.Root>
        <MenuTrigger>File</MenuTrigger>
        <Menu.Portal>
          <MenuPositioner side="bottom" align="start" sideOffset={4}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save</MenuItem>
              <MenuItem>Save as...</MenuItem>
              <MenuSeparator />
              <Menu.SubmenuRoot>
                <SubmenuTrigger>
                  Share
                  <ChevronRightIcon />
                </SubmenuTrigger>
                <Menu.Portal>
                  <MenuPositioner sideOffset={8}>
                    <MenuPopup>
                      <MenuItem>Email link</MenuItem>
                      <MenuItem>Copy link</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>
              <MenuSeparator />
              <MenuItem>Close</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <MenuTrigger>Edit</MenuTrigger>
        <Menu.Portal>
          <MenuPositioner side="bottom" align="start" sideOffset={4}>
            <MenuPopup>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
              <MenuSeparator />
              <MenuItem>Cut</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
              <MenuSeparator />
              <Menu.SubmenuRoot>
                <SubmenuTrigger>
                  Find
                  <ChevronRightIcon />
                </SubmenuTrigger>
                <Menu.Portal>
                  <MenuPositioner sideOffset={8}>
                    <MenuPopup>
                      <MenuItem>Find...</MenuItem>
                      <MenuItem>Find next</MenuItem>
                      <MenuItem>Find previous</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>
            </MenuPopup>
          </MenuPositioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <MenuTrigger>View</MenuTrigger>
        <Menu.Portal>
          <MenuPositioner side="bottom" align="start" sideOffset={4}>
            <MenuPopup>
              <MenuItem>Zoom in</MenuItem>
              <MenuItem>Zoom out</MenuItem>
              <MenuSeparator />
              <MenuItem>Full screen</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <MenuTrigger>Help</MenuTrigger>
        <Menu.Portal>
          <MenuPositioner side="bottom" align="start" sideOffset={4}>
            <MenuPopup>
              <MenuItem>Documentation</MenuItem>
              <MenuItem>Release notes</MenuItem>
              <MenuSeparator />
              <MenuItem>About</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </Menu.Portal>
      </Menu.Root>
    </MenubarRoot>
  );
}
