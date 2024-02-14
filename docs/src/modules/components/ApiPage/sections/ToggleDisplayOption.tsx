import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

type ApiDisplayOptions = 'Collapsed' | 'Expanded' | 'Table';

const options: ApiDisplayOptions[] = ['Collapsed', 'Expanded', 'Table'];
const DEFAULT_LAYOUT: ApiDisplayOptions = 'Expanded';

export const API_LAYOUT_STORAGE_KEYS = {
  default: 'apiPage_default',
  slots: 'apiPage_slots',
  props: 'apiPage_props',
  css: 'apiPage_css',
  classes: 'apiPage_classes',
} as const;

// https://stackoverflow.com/a/20084661
function isBot() {
  return /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
}

function getRandomOption() {
  if (isBot()) {
    // When crawlers visit the page, they should not have to expand items
    return DEFAULT_LAYOUT;
  }
  // A default layout is saved in localstorage at first render to make sure all section start with the same layout.
  const savedDefaultOption = localStorage.getItem(
    API_LAYOUT_STORAGE_KEYS.default,
  ) as null | ApiDisplayOptions;

  if (savedDefaultOption !== null && options.includes(savedDefaultOption)) {
    return savedDefaultOption;
  }

  const randomOption = options[Math.floor(options.length * Math.random())];
  try {
    localStorage.setItem(API_LAYOUT_STORAGE_KEYS.default, randomOption);
  } catch (error) {
    // Do nothing
  }
  return randomOption;
}

let neverHydrated = true;

function getOption(storageKey: string) {
  if (neverHydrated) {
    return DEFAULT_LAYOUT;
  }
  try {
    const savedOption = localStorage.getItem(storageKey);

    if (savedOption !== null && options.includes(savedOption as ApiDisplayOptions)) {
      return savedOption as ApiDisplayOptions;
    }

    const randomOption = getRandomOption();

    return randomOption;
  } catch (error) {
    return DEFAULT_LAYOUT;
  }
}

export function useApiPageOption(
  storageKey: string,
): [ApiDisplayOptions, (newOption: ApiDisplayOptions) => void] {
  const [option, setOption] = React.useState(getOption(storageKey));

  useEnhancedEffect(() => {
    neverHydrated = false;
    const newOption = getOption(storageKey);
    setOption(newOption);
  }, [storageKey]);

  React.useEffect(() => {
    if (option !== DEFAULT_LAYOUT) {
      const id = document.location.hash.slice(1);
      const element = document.getElementById(id);
      element?.scrollIntoView();
    }
    return undefined;
  }, [option]);

  const updateOption = React.useCallback(
    (newOption: ApiDisplayOptions) => {
      try {
        localStorage.setItem(storageKey, newOption);
      } catch (error) {
        // Do nothing
      }
      setOption(newOption);
    },
    [storageKey],
  );

  return [option, updateOption];
}

export function getApiPageLayout() {
  const rep: { [key: string]: string } = {};

  Object.values(API_LAYOUT_STORAGE_KEYS).forEach((localStorageKey) => {
    try {
      const savedOption = localStorage.getItem(localStorageKey);
      rep[localStorageKey] = savedOption || 'none';
    } catch {
      rep[localStorageKey] = 'none';
    }
  });
  return rep;
}

interface ToggleDisplayOptionProps {
  displayOption: ApiDisplayOptions;
  setDisplayOption: (newValue: ApiDisplayOptions) => void;
}

export default function ToggleDisplayOption(props: ToggleDisplayOptionProps) {
  const { displayOption, setDisplayOption } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (newDisplayOption: ApiDisplayOptions) => {
    setDisplayOption(newDisplayOption);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false); // Close the menu
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        id="view-switching-button"
        aria-controls={open ? 'view-switching-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
        endIcon={<ArrowDropDownRoundedIcon />}
        sx={{ height: '1.75rem', p: '6px' }}
      >
        <Box component="span" sx={{ fontWeight: 'medium', mr: 0.5 }}>
          View:
        </Box>
        {displayOption}
      </Button>
      <Menu
        id="view-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 1, '.MuiMenuItem-root': { pl: 1 } }}
      >
        <MenuItem
          value="Table"
          onClick={() => handleMenuItemClick('Table')}
          selected={displayOption === 'Table'}
        >
          <CheckIcon
            sx={{ fontSize: '0.85rem', mr: 1, opacity: displayOption === 'Table' ? 1 : 0 }}
          />
          Table view
        </MenuItem>
        <MenuItem
          value="Expanded"
          onClick={() => handleMenuItemClick('Expanded')}
          selected={displayOption === 'Expanded'}
        >
          <CheckIcon
            sx={{ fontSize: '0.85rem', mr: 1, opacity: displayOption === 'Expanded' ? 1 : 0 }}
          />
          Expanded list view
        </MenuItem>
        <MenuItem
          value="Collapsed"
          onClick={() => handleMenuItemClick('Collapsed')}
          selected={displayOption === 'Collapsed'}
        >
          <CheckIcon
            sx={{ fontSize: '0.85rem', mr: 1, opacity: displayOption === 'Collapsed' ? 1 : 0 }}
          />
          Collapsed list view
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
