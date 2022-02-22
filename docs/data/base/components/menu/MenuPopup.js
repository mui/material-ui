import * as React from 'react';
import PropTypes from 'prop-types';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import { styled } from '@mui/system';
import { ClickAwayListener, PopperUnstyled } from '@mui/base';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledMenu = styled(MenuUnstyled)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:focus {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;

function MenuWrapper(props) {
  const { children, label } = props;

  const contentRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const close = () => setAnchorEl(null);

  React.useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      <TriggerButton type="button" onClick={handleButtonClick}>
        {label}
      </TriggerButton>
      <Popper
        placement="bottom-start"
        open={isOpen}
        anchorEl={anchorEl}
        keepMounted
        disablePortal
      >
        {isOpen && (
          <ClickAwayListener onClickAway={close}>
            {children?.(close, contentRef)}
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
}

MenuWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default function UnstyledMenuPopup() {
  return (
    <MenuWrapper label="Language">
      {(close, contentRef) => (
        <StyledMenu ref={contentRef}>
          <StyledMenuItem onClick={() => close()}>English</StyledMenuItem>
          <StyledMenuItem onClick={() => close()}>中文</StyledMenuItem>
          <StyledMenuItem onClick={() => close()}>Português</StyledMenuItem>
        </StyledMenu>
      )}
    </MenuWrapper>
  );
}
