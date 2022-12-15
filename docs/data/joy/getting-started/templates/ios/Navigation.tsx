import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import LayersIcon from '@mui/icons-material/Layers';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import TuneIcon from '@mui/icons-material/Tune';
import ViewDayIcon from '@mui/icons-material/ViewDay';

export type NavigationView =
  | 'bars'
  | 'controls'
  | 'views'
  | 'color'
  | 'text'
  | 'material';

export default function Navigation({
  value,
  onItemClick,
}: {
  value: NavigationView;
  onItemClick: (value: NavigationView) => void;
}) {
  return (
    <Sheet
      sx={(theme) => ({
        position: 'sticky',
        top: 'calc(var(--header-height) + 0.5rem)',
        gridArea: 'nav',
        m: '0.5rem',
        ml: 'calc(0.5rem + env(safe-area-inset-left))',
        maxHeight:
          'calc(100vh - var(--header-height) - 1rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        borderRadius: '10px',
        ...theme.materials.ultrathin,
      })}
    >
      <nav>
        <List>
          <ListItem>
            <Tooltip arrow title="UI Components — Bars" size="sm" placement="right">
              <IconButton
                variant={value === 'bars' ? 'soft' : 'plain'}
                color={value === 'bars' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('bars')}
              >
                <HorizontalSplitIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip
              arrow
              title="UI Components — Controls"
              size="sm"
              placement="right"
            >
              <IconButton
                variant={value === 'controls' ? 'soft' : 'plain'}
                color={value === 'controls' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('controls')}
              >
                <TuneIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip arrow title="UI Components — Views" size="sm" placement="right">
              <IconButton
                variant={value === 'views' ? 'soft' : 'plain'}
                color={value === 'views' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('views')}
              >
                <ViewDayIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListDivider />
          <ListItem>
            <Tooltip arrow title="Colors" size="sm" placement="right">
              <IconButton
                variant={value === 'color' ? 'soft' : 'plain'}
                color={value === 'color' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('color')}
              >
                <ColorLensIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip arrow title="Text styles" size="sm" placement="right">
              <IconButton
                variant={value === 'text' ? 'soft' : 'plain'}
                color={value === 'text' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('text')}
              >
                <TextFieldsIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip arrow title="Materials" size="sm" placement="right">
              <IconButton
                variant={value === 'material' ? 'soft' : 'plain'}
                color={value === 'material' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('material')}
              >
                <LayersIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </nav>
    </Sheet>
  );
}
