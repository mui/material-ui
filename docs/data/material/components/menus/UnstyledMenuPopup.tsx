import * as React from 'react';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import { styled } from '@mui/system';
import { ClickAwayListener, PopperUnstyled } from '@mui/base';

const StyledMenu = styled(MenuUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  min-width: 200px;
  max-width: 300px;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
  margin-top: 10px;

  .mode-dark & {
    border-color: #333;
    background-color: #0a1929;
  }
`;

const StyledMenuItem = styled(MenuItemUnstyled)`
  padding: 6px 20px;
  margin: 0;
  cursor: default;
  display: flex;
  gap: 10px;
  align-items: center;

  &:hover:not(.${menuItemUnstyledClasses.disabled}),
  &:focus-visible {
    background-color: #16d;
    color: #fff;
    outline: none;
  }

  &:active:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: #05e;
  }

  &.${menuItemUnstyledClasses.disabled} {
    opacity: 0.5;
  }

  > svg {
    opacity: 0.6;
  }
`;

const TriggerButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #000;
  font-size: 1rem;

  .mode-dark & {
    color: #fff;
    border-color: #333;
    background-color: #0a1929;
  }
}`;

const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;

interface MenuWrapperProps {
  contentRef: React.RefObject<HTMLElement>;
  children: (close: () => void) => JSX.Element;
  label?: string;
}

function MenuWrapper(props: MenuWrapperProps) {
  const { children, contentRef, label } = props;

  const [isOpen, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  React.useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen, contentRef]);

  return (
    <React.Fragment>
      <TriggerButton type="button" ref={buttonRef} onClick={() => setOpen(!isOpen)}>
        {label}
      </TriggerButton>
      <Popper
        placement="bottom-start"
        open={isOpen && buttonRef.current != null}
        anchorEl={buttonRef.current}
        keepMounted
        disablePortal
      >
        {isOpen && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            {children?.(close)}
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default function UnstyledMenuPopup() {
  const contentRef = React.useRef<HTMLElement>(null);

  return (
    <MenuWrapper contentRef={contentRef} label="Language">
      {(close) => (
        <StyledMenu ref={contentRef}>
          <StyledMenuItem onClick={() => close()}>English</StyledMenuItem>
          <StyledMenuItem onClick={() => close()}>中文</StyledMenuItem>
          <StyledMenuItem onClick={() => close()}>Português</StyledMenuItem>
        </StyledMenu>
      )}
    </MenuWrapper>
  );
}
