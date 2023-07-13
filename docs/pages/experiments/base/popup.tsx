import * as React from 'react';
import BasePopup, { popupClasses } from '@mui/base/Popup';
import { styled } from '@mui/system';

const StyledPopup = styled(BasePopup)`
  width: max-content;
  border: 1px solid black;
  padding: 8px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

  &:not(.${popupClasses.open}) {
    display: none;
  }
`;

export default function PopupPlayground() {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button ref={setAnchor} onClick={() => setOpen((o) => !o)} style={{ margin: '250px' }}>
        open
      </button>
      <StyledPopup
        anchor={anchor}
        open={open}
        placement="bottom"
        offset={20}
        disablePortal
        keepMounted
      >
        This is a popup
      </StyledPopup>
    </div>
  );
}
