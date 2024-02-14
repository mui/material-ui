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
  // const { displayOption, setDisplayOption } = props;
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newDisplayOption: ApiDisplayOptions | null,
  // ) => {
  //   if (newDisplayOption === null) {
  //     return;
  //   }
  //   setDisplayOption(newDisplayOption);
  // };

  // const open = Boolean(anchorEl);
  // const handleMenuItemClick = (newDisplayOption) => {
  //   setDisplayOption(newDisplayOption);
  //   handleClose();
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

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
    // <ToggleButtonGroup
    //   size="small"
    //   value={displayOption}
    //   exclusive
    //   onChange={handleAlignment}
    //   aria-label="API display option"
    //   sx={{
    //     '& .MuiSvgIcon-root': {
    //       height: '18px',
    //       width: '18px',
    //     },
    //     '&.MuiToggleButtonGroup-root .MuiToggleButton-root': {
    //       padding: '4px 6px',
    //       borderRadius: '6px',
    //       '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
    //         borderTopRightRadius: 0,
    //         borderBottomRightRadius: 0,
    //       },
    //       '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    //         borderTopLeftRadius: 0,
    //         borderBottomLeftRadius: 0,
    //       },
    //     },
    //   }}
    // >
    //   <TooltipToggleButton value="collapsed" aria-label="colapsed list" title="Collapse list view">
    //     <ReorderRoundedIcon size="small" />
    //   </TooltipToggleButton>
    //   <TooltipToggleButton value="expanded" aria-label="expanded list" title="Expand list view">
    //     <CalendarViewDayRoundedIcon />
    //   </TooltipToggleButton>
    //   <TooltipToggleButton value="table" aria-label="table" title="Table view">
    //     <TableChartRoundedIcon />
    //   </TooltipToggleButton>
    // </ToggleButtonGroup>
    <React.Fragment>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
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
        id="basic-menu"
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
