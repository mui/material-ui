import * as React from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteListbox from '@mui/joy/AutocompleteListbox';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import Box from '@mui/joy/Box';
import Input, { inputClasses } from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const Listbox = React.forwardRef((props, ref) => (
  <AutocompleteListbox
    ref={ref}
    {...props}
    variant="plain"
    size="sm"
    sx={{
      '--List-radius': '0px',
      '--List-item-paddingX': '8px',
      '--List-item-paddingY': '8px',
    }}
  />
));

export default function GitHubLabel() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = React.useState([]);

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <React.Fragment>
      <Box sx={{ width: 221 }}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          color="neutral"
          component="button"
          underline="none"
          level="body3"
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontWeight: 'lg',
            color: 'text.secondary',
            py: 1,
            '&:hover': {
              color: 'primary.plainColor',
            },
          }}
        >
          <span>Labels</span>
          <SettingsIcon />
        </Link>
        <List
          size="sm"
          sx={{
            '--List-radius': '0px',
            '--List-gap': '3px',
            '--List-item-minHeight': '20px',
            '--List-item-paddingX': '4px',
            '--List-item-paddingY': '0.15em',
            '--List-item-radius': '2px',
            '--List-item-fontSize': '13px',
          }}
        >
          {value.map((label) => (
            <ListItem
              key={label.name}
              sx={{
                fontWeight: 600,
                backgroundColor: label.color,
                color: '#fff',
              }}
            >
              {label.name}
            </ListItem>
          ))}
        </List>
      </Box>
      <PopperUnstyled
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Sheet
            variant="outlined"
            sx={{ width: 300, boxShadow: 'md', borderRadius: '6px' }}
          >
            <Typography
              fontSize="sm"
              fontWeight={600}
              sx={{
                padding: '8px 10px',
              }}
            >
              Apply labels to this pull request
            </Typography>
            <Autocomplete
              open
              multiple
              components={{ listbox: Listbox }}
              onClose={(event, reason) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  event.key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableClearable
              disableCloseOnSelect
              forcePopupIcon={false}
              renderTags={() => null}
              noOptionsText="No labels"
              renderInput={(params) => (
                <Input
                  {...params}
                  size="sm"
                  autoFocus
                  placeholder="Filter labels"
                  sx={{
                    '--Input-radius': '4px',
                    '--Input-focusedThickness': '1px',
                    [`&.${inputClasses.focused}`]: {
                      boxShadow: (theme) =>
                        `0 0 0 3px ${theme.vars.palette.focusVisible}`,
                    },
                  }}
                />
              )}
              renderOption={(props, option, { selected }) => (
                <AutocompleteOption
                  {...props}
                  color="neutral"
                  sx={{
                    alignItems: 'flex-start',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&[aria-selected="true"]': {
                      fontWeight: 'normal',
                    },
                  }}
                >
                  <DoneIcon sx={{ visibility: selected ? 'visible' : 'hidden' }} />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: '3px',
                      mr: 1,
                      ml: '5px',
                      mt: '4px',
                      backgroundColor: option.color,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography fontSize="sm">{option.name}</Typography>
                    <Typography level="body3" textColor="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                  <CloseIcon sx={{ visibility: selected ? 'visible' : 'hidden' }} />
                </AutocompleteOption>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              sx={{
                p: '10px',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
          </Sheet>
        </ClickAwayListener>
      </PopperUnstyled>
    </React.Fragment>
  );
}

// From https://github.com/abdonrd/github-labels
const labels = [
  {
    name: 'good first issue',
    color: '#7057ff',
    description: 'Good for newcomers',
  },
  {
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed',
  },
  {
    name: 'priority: critical',
    color: '#b60205',
    description: '',
  },
  {
    name: 'priority: high',
    color: '#d93f0b',
    description: '',
  },
  {
    name: 'priority: low',
    color: '#0e8a16',
    description: '',
  },
  {
    name: 'priority: medium',
    color: '#fbca04',
    description: '',
  },
  {
    name: "status: can't reproduce",
    color: '#fec1c1',
    description: '',
  },
  {
    name: 'status: confirmed',
    color: '#215cea',
    description: '',
  },
  {
    name: 'status: duplicate',
    color: '#cfd3d7',
    description: 'This issue or pull request already exists',
  },
  {
    name: 'status: needs information',
    color: '#fef2c0',
    description: '',
  },
  {
    name: 'status: wont do/fix',
    color: '#eeeeee',
    description: 'This will not be worked on',
  },
  {
    name: 'type: bug',
    color: '#d73a4a',
    description: "Something isn't working",
  },
  {
    name: 'type: discussion',
    color: '#d4c5f9',
    description: '',
  },
  {
    name: 'type: documentation',
    color: '#006b75',
    description: '',
  },
  {
    name: 'type: enhancement',
    color: '#84b6eb',
    description: '',
  },
  {
    name: 'type: epic',
    color: '#3e4b9e',
    description: 'A theme of work that contain sub-tasks',
  },
  {
    name: 'type: feature request',
    color: '#fbca04',
    description: 'New feature or request',
  },
  {
    name: 'type: question',
    color: '#d876e3',
    description: 'Further information is requested',
  },
];
