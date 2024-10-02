import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteListbox from '@mui/joy/AutocompleteListbox';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import colors from '@mui/joy/colors';

const Listbox = React.forwardRef<HTMLUListElement, any>((props, ref) => (
  <AutocompleteListbox
    ref={ref}
    {...props}
    variant="plain"
    size="sm"
    sx={{
      '--List-padding': '0px',
      '--List-radius': '0px',
      '--ListItem-paddingX': '8px',
      '--ListItem-paddingY': '8px',
      minWidth: '100%',
    }}
  />
));

export default function GitHubLabel() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<LabelType[]>([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
          level="body-xs"
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
            '--List-gap': '3px',
            '--ListItem-minHeight': '20px',
            '--ListItem-paddingX': '4px',
            '--ListItem-paddingY': '0.15em',
            '--ListItem-radius': '2px',
            fontSize: '13px',
          }}
        >
          {value.map((label) => (
            <ListItem
              key={label.name}
              sx={{ fontWeight: 600, backgroundColor: label.color, color: '#fff' }}
            >
              {label.name}
            </ListItem>
          ))}
        </List>
      </Box>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <Sheet
            variant="outlined"
            sx={(theme) => ({
              width: 300,
              boxShadow: 'md',
              borderRadius: '6px',
              overflow: 'hidden',
              '--joy-palette-neutral-plainBg': '#fff',
              '--joy-palette-background-surface': '#fff',
              [theme.getColorSchemeSelector('dark')]: {
                '--joy-palette-neutral-plainBg': '#000',
                '--joy-palette-background-surface': '#000',
              },
            })}
          >
            <Typography
              sx={{
                fontSize: 'sm',
                fontWeight: 600,
                padding: '8px 10px',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              Apply labels to this pull request
            </Typography>
            <Autocomplete
              open
              autoFocus
              multiple
              size="sm"
              placeholder="Filter labels"
              slots={{ listbox: Listbox }}
              onClose={(event, reason) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  ((event as React.KeyboardEvent).key === 'Backspace' ||
                    (event as React.KeyboardEvent).key === 'Delete') &&
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
              renderOption={(props, option, { selected }) => (
                <AutocompleteOption
                  {...props}
                  color="neutral"
                  sx={(theme) => ({
                    alignItems: 'flex-start',
                    border: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '--joy-palette-neutral-plainHoverBg': 'rgba(0, 0, 0, 0.03)',
                    '--joy-palette-neutral-plainActiveBg': 'rgba(0, 0, 0, 0.03)',
                    [theme.getColorSchemeSelector('dark')]: {
                      '--joy-palette-neutral-plainHoverBg': colors.grey[800],
                      '--joy-palette-neutral-plainActiveBg': colors.grey[800],
                    },
                    '&[aria-selected="true"]': {
                      fontWeight: 'normal',
                    },
                    '&:first-of-type': {
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    },
                  })}
                >
                  <DoneIcon
                    sx={[
                      selected
                        ? { visibility: 'visible' }
                        : { visibility: 'hidden' },
                    ]}
                  />
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
                    <Typography level="title-sm">{option.name}</Typography>
                    <Typography level="body-xs">{option.description}</Typography>
                  </Box>
                  <CloseIcon
                    sx={[
                      selected
                        ? {
                            visibility: 'visible',
                          }
                        : {
                            visibility: 'hidden',
                          },
                    ]}
                  />
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
                p: '4px 2px',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '--Input-radius': '4px',
                m: '0.75rem 0.5rem',
              }}
            />
          </Sheet>
        </ClickAwayListener>
      </Popper>
    </React.Fragment>
  );
}

interface LabelType {
  name: string;
  color: string;
  description?: string;
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
