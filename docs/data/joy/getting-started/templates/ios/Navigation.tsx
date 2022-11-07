import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import LayersIcon from '@mui/icons-material/Layers';

export type NavigationView = 'iphone' | 'ipad' | 'color' | 'text' | 'material';

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
            <Tooltip title="UI Components — iPhone" size="sm" placement="right">
              <IconButton
                variant={value === 'iphone' ? 'soft' : 'plain'}
                color={value === 'iphone' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('iphone')}
              >
                <PhoneIphoneIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <Tooltip
              title="UI Components — iPad"
              size="sm"
              placement="right"
              describeChild
            >
              <IconButton
                disabled
                variant={value === 'ipad' ? 'soft' : 'plain'}
                color={value === 'ipad' ? 'primary' : 'neutral'}
                onClick={() => onItemClick('ipad')}
              >
                <TabletMacIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListDivider />
          <ListItem>
            <Tooltip title="Colors" size="sm" placement="right">
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
            <Tooltip title="Text styles" size="sm" placement="right">
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
            <Tooltip title="Materials" size="sm" placement="right">
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
