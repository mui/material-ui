import * as React from 'react';
import Stack from '@mui/system/Stack';
import Box from '@mui/system/Box';
import styled from '@mui/system/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { Transition } from 'react-transition-group';
import { Badge } from '@mui/base/Badge';
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { Popper } from '@mui/base/Popper';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Select, SelectRootSlotProps } from '@mui/base/Select';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { Option } from '@mui/base/Option';
import { Slider } from '@mui/base/Slider';
import { Snackbar } from '@mui/base/Snackbar';
// TODO: re-export from the @mui/base/Snackbar, if developer only uses the component
// it is not intuitive to import types from a different module
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Switch } from '@mui/base/Switch';
import { TablePagination } from '@mui/base/TablePagination';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

// Snackbar demo
const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

const SelectButton = React.forwardRef(function SelectButton<
  TValue extends {},
  Multiple extends boolean,
>(props: SelectRootSlotProps<TValue, Multiple>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const hslPickerLinearGradient = [...new Array(36)]
  .map((_, i) => `hsl(${i * 10}, 68%, 38%)`)
  .join(',');

const ColorPickerSlider = styled(Slider)({
  width: '100%',
  background: `-webkit-linear-gradient(left, ${hslPickerLinearGradient})`,
  margin: '16px 0',
  height: '6px',
  '& .MuiSlider-thumb': {
    position: 'absolute',
    width: '16px',
    height: '16px',
    marginLeft: '-6px',
    marginTop: '-6px',
    borderRadius: '50%',
    border: '1px solid black',
    backgroundColor: 'white',
  },
});

const CopyButton = styled(Button)({
  float: 'right',
});

const SettingsButton = styled(Button)({
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  float: 'right',
  padding: '6px !important',
});

const SettingsPopup = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
});

export default function ComponentsGallery() {
  // Popper demo
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  // Popup demo
  const [popupAnchor, setPopupAnchor] = React.useState<null | HTMLElement>(null);

  const popupButtonHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopupAnchor(popupAnchor ? null : event.currentTarget);
  };

  const popupOpen = Boolean(popupAnchor);
  const popupId = popupOpen ? 'simple-popup' : undefined;

  // Snackbar demo
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarButtonClick = () => {
    setSnackbarOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  // switch demo
  const label = { 'aria-label': 'Demo switch' };

  // table pagination demo
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Copy button logic
  const [copySnackbarOpen, setCopySnackbarOpen] = React.useState(false);
  const [copySnackbarExited, setCopySnackbarExited] = React.useState(true);
  const [rootStyles, setRootStyles] = React.useState('');
  const copyNodeRef = React.useRef(null);

  async function copyTheme() {
    const response = await fetch('/static/components-gallery/base-theme.css');
    let css = await response.text();

    // Replace the CSS variables declarations with the ones from the overrides
    rootStyles
      .split('\n')
      .map((str) => str.trim())
      .filter((rowString) => {
        return rowString.startsWith('--') && rowString.endsWith(';');
      })
      .forEach((cssVarDeclaration) => {
        const cssVar = cssVarDeclaration.split(':')[0].trim();
        css = css.replace(new RegExp(`${cssVar}:.*;`), cssVarDeclaration);
      });

    // Copy the text inside the text field
    navigator.clipboard.writeText(css);
    setCopySnackbarOpen(true);
  }

  const handleCopyClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCopySnackbarOpen(false);
  };

  const handleCopyOnEnter = () => {
    setCopySnackbarExited(false);
  };

  const handleCopyOnExited = () => {
    setCopySnackbarExited(true);
  };

  const [settingsAnchor, setSettingsAnchor] = React.useState<null | HTMLElement>(null);

  const settingsButtonHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchor(settingsAnchor ? null : event.currentTarget);
  };

  const settingsOpen = Boolean(settingsAnchor);
  const settingsId = settingsOpen ? 'settings-popup' : undefined;

  const colorPickerSliderChangeHandler = (e: Event, value: number | number[]) => {
    setRootStyles(`
:root {
  --primary-50: hsl(${value}, 76%, 95%);
  --primary-100: hsl(${value}, 70%, 86%);
  --primary-200: hsl(${value}, 59%, 75%);
  --primary-300: hsl(${value}, 49%, 60%);
  --primary-400: hsl(${value}, 68%, 38%);
  --primary-500: hsl(${value}, 76%, 21%);
  --primary-600: hsl(${value}, 80%, 18%);
  --primary-700: hsl(${value}, 84%, 15%);
  --primary-800: hsl(${value}, 86%, 12%);
  --primary-900: hsl(${value}, 90%, 8%);
}
    `);

    const styleTag =
      document.getElementById('gallery-overrides') ?? document.createElement('style');
    styleTag.id = 'gallery-overrides';
    styleTag.innerHTML = rootStyles;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
  };

  return (
    <Stack gap={2} sx={{ padding: 1 }}>
      {/* Copy theme button */}
      <Box sx={{ position: 'absolute', right: '10px' }}>
        <CopyButton className="GalleryButton" style={{ float: 'right' }} onClick={copyTheme}>
          Export theme
        </CopyButton>
        <Snackbar
          autoHideDuration={2000}
          open={copySnackbarOpen}
          onClose={handleCopyClose}
          exited={copySnackbarExited}
          className="GallerySnackbar"
        >
          <Transition
            timeout={{ enter: 400, exit: 400 }}
            in={copySnackbarOpen}
            appear
            unmountOnExit
            onEnter={handleCopyOnEnter}
            onExited={handleCopyOnExited}
            nodeRef={copyNodeRef}
          >
            {(status) => (
              <div
                className="GallerySnackbar-content"
                style={{
                  transform: positioningStyles[status],
                  transition: 'transform 300ms ease',
                }}
                ref={copyNodeRef}
              >
                <CheckRoundedIcon
                  sx={{
                    color: 'success.main',
                    flexShrink: 0,
                    width: '1.25rem',
                    height: '1.5rem',
                  }}
                />
                <div className="snackbar-message">
                  <p className="snackbar-title">Done!</p>
                  <p className="snackbar-description">
                    The theme stylesheet has been copied to clipboard!
                  </p>
                </div>
                <CloseIcon onClick={handleCopyClose} className="snackbar-close-icon" />
              </div>
            )}
          </Transition>
        </Snackbar>
        <br />
        <SettingsButton
          aria-describedby={settingsId}
          className="GalleryButton"
          onClick={settingsButtonHandleClick}
        >
          <SettingsIcon />
        </SettingsButton>
        <Popper id={settingsId} open={settingsOpen} anchorEl={settingsAnchor}>
          <SettingsPopup className="GalleryPopup">
            <h3>Primary color</h3>
            <ColorPickerSlider
              defaultValue={189}
              min={0}
              max={360}
              onChange={colorPickerSliderChangeHandler}
            />
          </SettingsPopup>
        </Popper>
      </Box>
      <div>
        <Badge
          slotProps={{
            root: { className: 'GalleryBadge' },
            badge: { className: 'GalleryBadge-badge' },
          }}
          badgeContent={5}
        >
          <span className="GalleryBadge-content" />
        </Badge>
      </div>
      <div>
        <Button className="GalleryButton">Button</Button>
        <Button className="GalleryButton" disabled>
          Disabled
        </Button>
      </div>
      <div>
        <Input placeholder="Write your name here" className="GalleryInput" />
      </div>
      <div>
        <Dropdown>
          <MenuButton className="GalleryButton">My account</MenuButton>
          <Menu
            className="GalleryMenu"
            slotProps={{
              listbox: { className: 'GalleryMenu-listbox' },
            }}
          >
            <MenuItem className="GalleryMenu-item">Profile</MenuItem>
            <MenuItem className="GalleryMenu-item">Language settings</MenuItem>
            <MenuItem className="GalleryMenu-item">Log out</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div style={{ maxWidth: '350px' }}>
        <NumberInput
          slotProps={{
            root: { className: 'GalleryNumberInput' },
            input: { className: 'input' },
            decrementButton: { className: 'btn decrement', children: '▾' },
            incrementButton: { className: 'btn increment', children: '▴' },
          }}
          aria-label="Demo number input"
          placeholder="Type a number…"
        />
      </div>
      <div>
        <button type="button" aria-describedby={id} className="GalleryButton" onClick={handleClick}>
          Toggle Popper
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="GalleryPopper">The content of the Popper.</div>
        </Popper>
      </div>
      <div>
        <button
          type="button"
          aria-describedby={id}
          className="GalleryButton"
          onClick={popupButtonHandleClick}
        >
          Toggle Popup
        </button>
        <Popup id={popupId} open={popupOpen} anchor={popupAnchor}>
          <div className="GalleryPopup">The content of the Popup.</div>
        </Popup>
      </div>
      <div>
        <Select
          className="GallerySelect"
          slots={{
            root: SelectButton,
          }}
          slotProps={{
            listbox: { className: 'GallerySelect-listbox' },
            popper: { className: 'GallerySelect-popper' },
          }}
          defaultValue={10}
        >
          <Option className="GallerySelect-option" value={10}>
            Documentation
          </Option>
          <Option className="GallerySelect-option" value={20}>
            Components
          </Option>
          <Option className="GallerySelect-option" value={30}>
            Features
          </Option>
        </Select>
      </div>
      <div style={{ width: 320 }}>
        <Slider
          slotProps={{
            root: { className: 'GallerySlider' },
            rail: { className: 'GallerySlider-rail' },
            track: { className: 'GallerySlider-track' },
            thumb: { className: 'GallerySlider-thumb', tabIndex: 0 },
          }}
          defaultValue={50}
        />
        <Slider
          slotProps={{
            root: { className: 'GallerySlider' },
            rail: { className: 'GallerySlider-rail' },
            track: { className: 'GallerySlider-track' },
            thumb: { className: 'GallerySlider-thumb' },
          }}
          defaultValue={10}
          disabled
        />
      </div>
      <div>
        <button className="GalleryButton" type="button" onClick={handleSnackbarButtonClick}>
          Open snackbar
        </button>
        <Snackbar
          autoHideDuration={5000}
          open={snackbarOpen}
          onClose={handleClose}
          exited={exited}
          className="GallerySnackbar"
        >
          <Transition
            timeout={{ enter: 400, exit: 400 }}
            in={snackbarOpen}
            appear
            unmountOnExit
            onEnter={handleOnEnter}
            onExited={handleOnExited}
            nodeRef={nodeRef}
          >
            {(status) => (
              <div
                className="GallerySnackbar-content"
                style={{
                  transform: positioningStyles[status],
                  transition: 'transform 300ms ease',
                }}
                ref={nodeRef}
              >
                <CheckRoundedIcon
                  sx={{
                    color: 'success.main',
                    flexShrink: 0,
                    width: '1.25rem',
                    height: '1.5rem',
                  }}
                />
                <div className="snackbar-message">
                  <p className="snackbar-title">Notifications sent</p>
                  <p className="snackbar-description">
                    Everything was sent to the desired address.
                  </p>
                </div>
                <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
              </div>
            )}
          </Transition>
        </Snackbar>
      </div>
      <div>
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
          defaultChecked
        />
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
        />
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
          defaultChecked
          disabled
        />
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
          disabled
        />
      </div>
      <div className="TablePaginationDemo">
        <table aria-label="custom pagination table">
          <tfoot>
            <tr>
              <TablePagination
                className="GalleryTablePagination"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={13}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </div>
      <div style={{ maxWidth: '550px' }}>
        <Tabs defaultValue={0}>
          <TabsList className="GalleryTabsList">
            <Tab className="GalleryTab" value={0}>
              My account
            </Tab>
            <Tab className="GalleryTab" value={1}>
              Profile
            </Tab>
            <Tab className="GalleryTab" value={2}>
              Language
            </Tab>
          </TabsList>
          <TabPanel className="GalleryTabPanel" value={0}>
            My account page
          </TabPanel>
          <TabPanel className="GalleryTabPanel" value={1}>
            Profile page
          </TabPanel>
          <TabPanel className="GalleryTabPanel" value={2}>
            Language page
          </TabPanel>
        </Tabs>
      </div>
      <div>
        <TextareaAutosize
          className="GalleryTextarea"
          aria-label="empty textarea"
          placeholder="Empty"
        />
      </div>
    </Stack>
  );
}
